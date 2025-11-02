import { useState, useEffect, useRef } from "react";
import axios from "axios";
import SearchBar from "./components/SearchBar";
import UserCard from "./components/UserCard";
import RepoList from "./components/RepoList";
import FilterBar from "./components/FilterBar";

function App() {
  const [user, setUser] = useState<any>(null);
  const [repos, setRepos] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // pagination
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(false);

  // filters
  const [selectedLanguage, setSelectedLanguage] = useState("");
  const [minStars, setMinStars] = useState(0);
  const [sortBy, setSortBy] = useState("updated");

  const observerRef = useRef<HTMLDivElement | null>(null);
  const currentUsername = useRef<string>("");

  // ✅ Fetch GitHub User (with Authorization header)
  const fetchUser = async (username: string) => {
    try {
      setLoading(true);
      setError("");
      setUser(null);
      setRepos([]);
      setPage(1);

      console.log(
        "Token Loaded:",
        import.meta.env.VITE_GITHUB_TOKEN ? "✅ Loaded" : "❌ Not Loaded"
      );

      const res = await axios.get(`https://api.github.com/users/${username}`, {
        headers: {
          Accept: "application/vnd.github+json",
          Authorization: `Bearer ${import.meta.env.VITE_GITHUB_TOKEN}`,
        },
      });

      setUser(res.data);
      currentUsername.current = username;

      // fetch first page of repos
      await fetchRepos(username, 1, true);
    } catch (err: any) {
      console.error("GitHub API Error (User):", err.response?.status, err.response?.data);

      if (err.response?.status === 403) {
        setError("GitHub API rate limit exceeded or invalid token.");
      } else if (err.response?.status === 404) {
        setError("User not found.");
      } else {
        setError("Failed to load user.");
      }
    } finally {
      setLoading(false);
    }
  };

  // ✅ Fetch Repositories (authenticated)
  const fetchRepos = async (username: string, pageNum: number, replace = false) => {
    try {
      const res = await axios.get(
        `https://api.github.com/users/${username}/repos?sort=updated&per_page=10&page=${pageNum}`,
        {
          headers: {
            Accept: "application/vnd.github+json",
            Authorization: `Bearer ${import.meta.env.VITE_GITHUB_TOKEN}`,
          },
        }
      );

      if (res.data.length > 0) {
        setRepos((prev) => (replace ? res.data : [...prev, ...res.data]));
        setHasMore(res.data.length === 10); // if 10 results, more likely exist
      } else {
        setHasMore(false);
      }
    } catch (err: any) {
      console.error("GitHub API Error (Repos):", err.response?.status, err.response?.data);

      if (err.response?.status === 403) {
        setError("GitHub API rate limit exceeded or invalid token.");
      } else {
        setError("Failed to load repositories.");
      }
    }
  };

  // ✅ Infinite Scroll Observer
  useEffect(() => {
    if (!hasMore || loading) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          const nextPage = page + 1;
          setPage(nextPage);
          fetchRepos(currentUsername.current, nextPage);
        }
      },
      { threshold: 1.0 }
    );

    if (observerRef.current) observer.observe(observerRef.current);
    return () => observer.disconnect();
  }, [hasMore, loading, page]);

  // ✅ Filtered Repositories
  const filteredRepos = repos
    .filter((r) => (selectedLanguage ? r.language === selectedLanguage : true))
    .filter((r) => r.stargazers_count >= minStars)
    .sort((a, b) => {
      switch (sortBy) {
        case "stars":
          return b.stargazers_count - a.stargazers_count;
        case "forks":
          return b.forks_count - a.forks_count;
        case "name":
          return a.name.localeCompare(b.name);
        default:
          return new Date(b.updated_at).getTime() - new Date(a.updated_at).getTime();
      }
    });

  const languages = Array.from(
    new Set(repos.map((r) => r.language).filter(Boolean))
  );

  return (
    <div className="min-h-screen bg-gradient-to-r from-sky-500 to-indigo-500 text-white">
      <h1 className="text-4xl font-bold text-center pt-8">GitHub User Explorer</h1>
      <SearchBar onSearch={fetchUser} />

      {loading && <p className="text-center mt-6">Loading...</p>}
      {error && <p className="text-center mt-6 text-red-300">{error}</p>}

      <UserCard user={user} />

      {user && repos.length > 0 && (
        <>
          <FilterBar
            languages={languages}
            selectedLanguage={selectedLanguage}
            onLanguageChange={setSelectedLanguage}
            minStars={minStars}
            onStarsChange={setMinStars}
            sortBy={sortBy}
            onSortChange={setSortBy}
          />
          <RepoList repos={filteredRepos} />

          {/* Infinite Scroll Loader Target */}
          <div ref={observerRef} className="text-center py-6">
            {hasMore ? (
              <p className="animate-pulse text-gray-200">Loading more repos…</p>
            ) : (
              <p className="text-gray-300">No more repositories to load</p>
            )}
          </div>
        </>
      )}
    </div>
  );
}

export default App;
