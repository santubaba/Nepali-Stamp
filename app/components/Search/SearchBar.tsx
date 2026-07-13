import { IconSearch } from "@tabler/icons-react";

interface Query {
  query: string;
  setQuery: React.Dispatch<React.SetStateAction<string>>;
}

export default function SearchBar({ query, setQuery }: Query) {
  return (
    <div className="w-full max-w-md">
      <form className="flex h-11 items-center gap-3 rounded-lg border border-brand-border bg-brand-surface px-4 shadow-sm">
        <IconSearch size={18} className="text-brand-muted shrink-0" />

        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search stamps..."
          className="flex-1 bg-transparent text-sm text-brand-text placeholder:text-brand-muted outline-none"
        />
      </form>
    </div>
  );
}
