import ReactPaginateModule from "react-paginate";
import type { ComponentType } from "react";
import type { ReactPaginateProps } from "react-paginate";

const ReactPaginate = (
  ReactPaginateModule as unknown as {
    default: ComponentType<ReactPaginateProps>;
  }
).default;

interface PaginationProps {
  page: number;
  totalPages: number;
  onChange: (page: number) => void;
}

export default function Pagination({
  page,
  totalPages,
  onChange,
}: PaginationProps) {
  return (
    <ReactPaginate
      pageCount={totalPages}
      forcePage={page - 1}
      onPageChange={({ selected }) => onChange(selected + 1)}
    />
  );
}