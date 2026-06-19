import { useEffect, useState } from "react";
import { fetchNotes } from "../../services/noteService";
import type { Note } from "../../types/note";

interface NoteListProps {
  page: number;
  search: string;
}

export default function NoteList({ page, search }: NoteListProps) {
  const [notes, setNotes] = useState<Note[]>([]);

  useEffect(() => {
    fetchNotes(page, search).then((data) => {
      setNotes(data.notes);
    });
  }, [page, search]);

  if (notes.length === 0) return <p>No notes</p>;

  return (
    <ul>
      {notes.map((note) => (
        <li key={note.id}>
          <h2>{note.title}</h2>
          <p>{note.content}</p>
          <span>{note.tag}</span>
        </li>
      ))}
    </ul>
  );
}