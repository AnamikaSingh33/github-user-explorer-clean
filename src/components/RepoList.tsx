import { useState, useEffect } from "react";
import RepoCard from "./RepoCard";

interface RepoListProps {
  repos: any[];
}

export default function RepoList({ repos }: RepoListProps) {
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");

  //  Load user preference from localStorage
  useEffect(() => {
    const saved = localStorage.getItem("viewMode");
    if (saved === "grid" || saved === "list") setViewMode(saved);
  }, []);

  //  Persist user preference
  useEffect(() => {
    localStorage.setItem("viewMode", viewMode);
  }, [viewMode]);

  if (!repos || repos.length === 0) {
    return <p className="text-center text-gray-300 mt-6">No repositories found.</p>;
  }

  return (
    <div className="mt-8 px-4 md:px-8">
      {/*  Toggle Buttons */}
      <div className="flex justify-end mb-4">
        <div className="inline-flex rounded-md shadow-sm border border-gray-600 overflow-hidden">
          <button
            onClick={() => setViewMode("grid")}
            className={`px-3 py-1 text-sm font-medium ${
              viewMode === "grid"
                ? "bg-blue-600 text-white"
                : "bg-gray-800 text-gray-300 hover:bg-gray-700"
            }`}
          >
            Grid
          </button>
          <button
            onClick={() => setViewMode("list")}
            className={`px-3 py-1 text-sm font-medium ${
              viewMode === "list"
                ? "bg-blue-600 text-white"
                : "bg-gray-800 text-gray-300 hover:bg-gray-700"
            }`}
          >
            List
          </button>
        </div>
      </div>

      {/*  Repos Container */}
      <div
        className={
          viewMode === "grid"
            ? "grid gap-4 md:grid-cols-2 lg:grid-cols-3"
            : "flex flex-col gap-3"
        }
      >
        {repos.map((repo) => (
          <RepoCard key={repo.id} repo={repo} viewMode={viewMode} />
        ))}
      </div>
    </div>
  );
}
