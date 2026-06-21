interface SearchBoxProps {
  onSearch: (value: string) => void;
}

export default function SearchBox({ onSearch }: SearchBoxProps) {
  return (
    <input
      type="text"
      placeholder="Search notes"
      onChange={(e) => onSearch(e.target.value)}
    />
  );
}