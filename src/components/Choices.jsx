import parse from "html-react-parser";
import { nanoid } from "nanoid";

export default function Choices(props) {
  const choicesArr = props.choices.map((ele) => {
    return (
      <button
        key={nanoid()}
        onClick={() => {
          props.handleClick(props.id, ele.choice);
        }}
        disabled={props.isChecked}
        className={`
        ${
          !props.isChecked && !ele.isChosen
            ? "border bg-transparent opacity-100"
            : !props.isChecked && ele.isChosen
            ? "border-none bg-chooseClr opacity-100"
            : props.isChecked && ele.isChosen && !ele.isCorrect
            ? "border-none bg-wrongAnswer opacity-50"
            : props.isChecked && ele.isCorrect
            ? "border-none bg-correctAnswer opacity-100"
            : "border bg-transparent opacity-50"
        }
      min-w-[4rem] cursor-default
      rounded-lg
      border-btnClr
      py-0.5
      px-2.5
      text-center
      transition duration-300
      hover:bg-chooseClr
      `}
      >
        {/* {ele.choice} */}
        {parse(ele.choice)}
      </button>
    );
  });
  return choicesArr;
}
