interface PaginationProps {
  page: number;
  setPage: (page: number) => void;
  pageCount: number;
}

export default function Pagination({
  page,
  setPage,
  pageCount,
}: PaginationProps) {
  if (pageCount <= 1) return null;

  return (
    <div>
      <button onClick={() => setPage(page - 1)} disabled={page === 1}>
        Prev
      </button>

      <span>{page}</span>

      <button
        onClick={() => setPage(page + 1)}
        disabled={page === pageCount}
      >
        Next
      </button>
    </div>
  );
}