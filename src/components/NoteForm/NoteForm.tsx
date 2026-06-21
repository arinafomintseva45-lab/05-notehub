import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

import { createNote } from "../../services/noteService";
import type { CreateNoteInput } from "../../services/noteService";
import type { NoteTag } from "../../types/note";

interface NoteFormProps {
  onClose: () => void;
}

const validationSchema = Yup.object({
  title: Yup.string()
    .min(3, "Min 3 characters")
    .max(50, "Max 50 characters")
    .required("Required"),

  content: Yup.string().max(500, "Max 500 characters"),

  tag: Yup.mixed<NoteTag>()
    .oneOf(["Todo", "Work", "Personal", "Meeting", "Shopping"])
    .required("Required"),
});

export default function NoteForm({ onClose }: NoteFormProps) {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: createNote,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["notes"] });
      onClose();
    },
  });

  return (
    <Formik
      initialValues={{
        title: "",
        content: "",
        tag: "Todo" as NoteTag,
      }}
      validationSchema={validationSchema}
      onSubmit={(values, actions) => {
        mutation.mutate(values as CreateNoteInput);
        actions.resetForm();
      }}
    >
      {({ isSubmitting }) => (
        <Form>
          {/* TITLE */}
          <div>
            <label>Title</label>
            <Field name="title" />
            <ErrorMessage name="title" component="div" />
          </div>

          {/* CONTENT */}
          <div>
            <label>Content</label>
            <Field as="textarea" name="content" />
            <ErrorMessage name="content" component="div" />
          </div>

          {/* TAG */}
          <div>
            <label>Tag</label>
            <Field as="select" name="tag">
              <option value="Todo">Todo</option>
              <option value="Work">Work</option>
              <option value="Personal">Personal</option>
              <option value="Meeting">Meeting</option>
              <option value="Shopping">Shopping</option>
            </Field>
            <ErrorMessage name="tag" component="div" />
          </div>

          {/* BUTTONS */}
          <button type="button" onClick={onClose}>
            Cancel
          </button>

          <button type="submit" disabled={isSubmitting || mutation.isPending}>
            Create note
          </button>
        </Form>
      )}
    </Formik>
  );
}