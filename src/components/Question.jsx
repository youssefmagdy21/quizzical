import parse from "html-react-parser";
import { nanoid } from "nanoid";

export default function Question(props) {
  return <h2 className="mb-3 font-karla font-bold">{parse(props.question)}</h2>;
}
