interface FilterBarProps {
  languages: string[];
  selectedLanguage: string;
  onLanguageChange: (lang: string) => void;
  minStars: number;
  onStarsChange: (stars: number) => void;
  sortBy: string;
  onSortChange: (sort: string) => void;
}

export default function FilterBar({
  languages,
  selectedLanguage,
  onLanguageChange,
  minStars,
  onStarsChange,
  sortBy,
  onSortChange,
}: FilterBarProps) {
  return (
    <div className="flex flex-col md:flex-row items-center justify-center gap-4 bg-white/10 p-4 mt-6 rounded-xl backdrop-blur-sm">
      {/* Language Filter */}
      <select
        value={selectedLanguage}
        onChange={(e) => onLanguageChange(e.target.value)}
        className="p-2 rounded-md bg-white/90 text-gray-800 focus:ring-2 focus:ring-indigo-400"
      >
        <option value="">All Languages</option>
        {languages.map((lang) => (
          <option key={lang} value={lang}>
            {lang}
          </option>
        ))}
      </select>

      {/* Minimum Stars */}
      <div className="flex items-center gap-2">
        <label className="text-sm">Min</label>
        <input
          type="number"
          value={minStars}
          onChange={(e) => onStarsChange(Number(e.target.value))}
          className="w-20 p-2 rounded-md bg-white/90 text-gray-800 focus:ring-2 focus:ring-indigo-400"
        />
      </div>

      {/* Sort */}
      <select
        value={sortBy}
        onChange={(e) => onSortChange(e.target.value)}
        className="p-2 rounded-md bg-white/90 text-gray-800 focus:ring-2 focus:ring-indigo-400"
      >
        <option value="updated">Sort: Updated</option>
        <option value="stars">Sort: Stars</option>
        <option value="forks">Sort: Forks</option>
        <option value="name">Sort: Name (A–Z)</option>
      </select>
    </div>
  );
}
