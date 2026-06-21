import axios from "axios";
import type { Note, NoteTag } from "../types/note";

const token = import.meta.env.VITE_NOTEHUB_TOKEN;

const api = axios.create({
  baseURL: "https://notehub-public.goit.study/api",
  headers: {
    Authorization: `Bearer ${token}`,
  },
});

export interface FetchNotesParams {
  page: number;
  search: string;
}

export interface FetchNotesResponse {
  notes: Note[];
  totalPages: number;
}

export const fetchNotes = async ({
  page,
  search,
}: FetchNotesParams): Promise<FetchNotesResponse> => {
  const { data } = await api.get<FetchNotesResponse>("/notes", {
    params: {
      page,
      perPage: 12,
      search,
    },
  });

  return data;
};

export interface CreateNoteInput {
  title: string;
  content: string;
  tag: NoteTag;
}

export const createNote = async (
  body: CreateNoteInput
): Promise<Note> => {
  const { data } = await api.post<Note>("/notes", body);
  return data;
};

export const deleteNote = async (id: string): Promise<{ id: string }> => {
  const { data } = await api.delete<{ id: string }>(`/notes/${id}`);
  return data;
};