import { Container } from "./styles";
import { FiPlus, FiX } from "react-icons/fi";

export function NoteItem({ isNew = false, value, onClick, ...rest }) {
  return (
    <Container $isnew={isNew.toString()}>
      <input type="text" value={value} readOnly={!isNew.toString()} {...rest} />

      <button
        type="button"
        onClick={onClick}
        className={isNew ? "button-add" : "button-delete"}
      >
        {isNew ? <FiPlus /> : <FiX />}
      </button>
    </Container>
  );
}
