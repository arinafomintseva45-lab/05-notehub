import { useState } from "react";
import { useDebouncedCallback } from "use-debounce";
import { useQuery } from "@tanstack/react-query";

import SearchBox from "../SearchBox/SearchBox";
import NoteList from "../NoteList/NoteList";
import Pagination from "../Pagination/Pagination";
import Modal from "../Modal/Modal";
import NoteForm from "../NoteForm/NoteForm";

import { fetchNotes } from "../../services/noteService";

import css from "./App.module.css";

export default function App() {
  const [page, setPage] = useState<number>(1);
  const [search, setSearch] = useState<string>("");
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  // ✅ debounce (REQUIRED)
  const debouncedSearch = useDebouncedCallback((value: string) => {
    setSearch(value);
    setPage(1); // IMPORTANT: reset page on search
  }, 500);

  // ✅ TanStack Query (REQUIRED)
  const { data, isLoading, isError } = useQuery({
    queryKey: ["notes", page, search],
    queryFn: () => fetchNotes({ page, search }),
    placeholderData: (prev) => prev,
  });

  // ✅ safe data handling (FIX TS ERROR)
  const notes = data?.notes ?? [];
  const totalPages = data?.totalPages ?? 0;

  return (
    <div className={css.app}>
      <header className={css.toolbar}>
        {/* SEARCH */}
        <SearchBox onSearch={debouncedSearch} />

        {/* PAGINATION (only if >1 page) */}
        {totalPages > 1 && (
          <Pagination
            page={page}
            totalPages={totalPages}
            onChange={setPage}
          />
        )}

        {/* CREATE BUTTON */}
        <button onClick={() => setIsModalOpen(true)}>
          Create note +
        </button>
      </header>

      {/* LOADING / ERROR (good practice, sometimes required) */}
      {isLoading && <p>Loading...</p>}
      {isError && <p>Error loading notes</p>}

      {/* NOTE LIST (ONLY IF NOTES EXIST) */}
      {notes.length > 0 && <NoteList notes={notes} />}

      {/* MODAL */}
      {isModalOpen && (
        <Modal onClose={() => setIsModalOpen(false)}>
          <NoteForm onClose={() => setIsModalOpen(false)} />
        </Modal>
      )}
    </div>
  );
}