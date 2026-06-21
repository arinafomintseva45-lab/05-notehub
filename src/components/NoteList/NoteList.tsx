import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteNote } from "../../services/noteService";
import type { Note } from "../../types/note";

interface NoteListProps {
  notes: Note[];
}

export default function NoteList({ notes }: NoteListProps) {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: deleteNote,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["notes"] });
    },
  });

  return (
    <ul>
      {notes.map((note) => (
        <li key={note.id}>
          <h2>{note.title}</h2>
          <p>{note.content}</p>
          <span>{note.tag}</span>

          <button onClick={() => mutation.mutate(note.id)}>
            Delete
          </button>
        </li>
      ))}
    </ul>
  );
}