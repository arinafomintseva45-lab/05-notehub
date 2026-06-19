interface NoteFormProps {
  onClose: () => void;
}

export function NoteForm({ onClose }: NoteFormProps) {
  return (
    <form>
      <input placeholder="title" />
      <textarea placeholder="content" />

      <select>
        <option>Todo</option>
        <option>Work</option>
        <option>Personal</option>
        <option>Meeting</option>
        <option>Shopping</option>
      </select>

      <button type="button" onClick={onClose}>
        Cancel
      </button>

      <button type="submit">Create</button>
    </form>
  );
}