import parse from "html-react-parser";
import { nanoid } from "nanoid";

export default function Choices(props) {
  const choicesArr = props.choices.map((ele) => {
    return (
      <div
        key={nanoid()}
        onClick={() => {
          props.handleClick(props.id, ele.choice);
        }}
        className={`
        ${ele.isChosen ? "border-none bg-chooseClr" : "border bg-transparent"}
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
      </div>
    );
  });
  return choicesArr;
}
