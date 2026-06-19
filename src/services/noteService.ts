import axios from "axios";
import type { Note } from "../types/note";

const API_URL = "https://notehub-public.goit.study/api/notes";

const token = import.meta.env.VITE_NOTEHUB_TOKEN;

export interface FetchNotesResponse {
  notes: Note[];
  totalPages: number;
}

// GET NOTES
export const fetchNotes = async (page: number, search: string) => {
  const { data } = await axios.get(API_URL, {
    params: { page, perPage: 12, search },
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return data as FetchNotesResponse;
};

// CREATE NOTE
export const createNote = async (note: {
  title: string;
  content: string;
  tag: Note["tag"];
}) => {
  const { data } = await axios.post(API_URL, note, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return data as Note;
};

// DELETE NOTE
export const deleteNote = async (id: string) => {
  const { data } = await axios.delete(`${API_URL}/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return data as Note;
};