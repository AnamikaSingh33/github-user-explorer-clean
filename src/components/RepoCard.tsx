import { useState, useEffect } from "react";
import { Star } from "lucide-react"; // install if not done: npm install lucide-react

interface RepoCardProps {
  repo: any;
  viewMode?: "grid" | "list";
}

export default function RepoCard({ repo, viewMode = "grid" }: RepoCardProps) {
  const [isFavorite, setIsFavorite] = useState(false);

  //  Check localStorage on mount to see if repo is already a favorite
  useEffect(() => {
    const storedFavorites = JSON.parse(localStorage.getItem("favorites") || "[]");
    setIsFavorite(storedFavorites.some((fav: any) => fav.id === repo.id));
  }, [repo.id]);

  //  Toggle favorite state (and save/remove in localStorage)
  const toggleFavorite = () => {
    const storedFavorites = JSON.parse(localStorage.getItem("favorites") || "[]");
    let updatedFavorites;

    if (isFavorite) {
      // Remove from favorites
      updatedFavorites = storedFavorites.filter((fav: any) => fav.id !== repo.id);
    } else {
      // Add to favorites
      updatedFavorites = [...storedFavorites, repo];
    }

    localStorage.setItem("favorites", JSON.stringify(updatedFavorites));
    setIsFavorite(!isFavorite);
  };

  return (
    <div
      className={`relative ${
        viewMode === "grid"
          ? "p-4 border rounded-lg bg-gray-900 text-white shadow hover:shadow-lg transition"
          : "p-3 border-b border-gray-700 flex flex-col sm:flex-row sm:items-center justify-between bg-gray-900 text-white rounded-md"
      }`}
    >
      {/* Favorite Button */}
      <button
        onClick={toggleFavorite}
        className="absolute top-3 right-3 text-yellow-400 hover:scale-110 transition-transform"
        title={isFavorite ? "Remove from favorites" : "Add to favorites"}
      >
        <Star
          size={20}
          className={isFavorite ? "fill-yellow-400 text-yellow-400" : "text-gray-500"}
        />
      </button>

      {/* Repo Details */}
      <div className="pr-6">
        <h3 className="font-semibold text-lg text-blue-400 hover:underline">
          <a href={repo.html_url} target="_blank" rel="noopener noreferrer">
            {repo.name}
          </a>
        </h3>
        {repo.description && (
          <p className="text-gray-400 text-sm mt-1">{repo.description}</p>
        )}
        <div className="flex flex-wrap gap-4 text-sm mt-2 text-gray-500">
          {repo.language && (
            <span className="flex items-center gap-1">
              <span className="w-2.5 h-2.5 rounded-full bg-green-500"></span>
              {repo.language}
            </span>
          )}
          <span> {repo.stargazers_count}</span>
          <span> {repo.forks_count}</span>
        </div>
      </div>

      <span className="text-xs text-gray-500 mt-2 sm:mt-0">
        Updated {new Date(repo.updated_at).toLocaleDateString()}
      </span>
    </div>
  );
}
