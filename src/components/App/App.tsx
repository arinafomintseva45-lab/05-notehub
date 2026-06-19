import { useState } from "react";
import css from "./App.module.css";

import SearchBox from "../SearchBox/SearchBox";
import NoteList from "../NoteList/NoteList";
import Pagination from "../Pagination/Pagination";
import { Modal } from "../Modal/Modal";
import { NoteForm } from "../NoteForm/NoteForm";

export default function App() {
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className={css.app}>
      <header className={css.toolbar}>
        <SearchBox onChange={setSearch} />

        <Pagination
          page={page}
          setPage={setPage}
          pageCount={10}
        />

        <button onClick={() => setIsModalOpen(true)}>
          Create note +
        </button>
      </header>

      <NoteList page={page} search={search} />

      {isModalOpen && (
        <Modal onClose={() => setIsModalOpen(false)}>
          <NoteForm onClose={() => setIsModalOpen(false)} />
        </Modal>
      )}
    </div>
  );
}