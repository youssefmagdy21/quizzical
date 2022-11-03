import parse from "html-react-parser";
import { nanoid } from "nanoid";

export default function Question(props) {
  function getRandomNumber(max) {
    return Math.floor(Math.random() * max);
  }
  const { question, correctAnswer, incorrectAnswers } = props;
  const answers = [...incorrectAnswers];
  answers.splice(getRandomNumber(4), 0, correctAnswer);
  function displayChoices() {
    return answers.map((ele) => {
      return (
        <div
          key={nanoid()}
          className={`
            min-w-[4rem] cursor-default
            rounded-lg
            border border-btnClr
            bg-transparent py-0.5
            px-2.5
            text-center
            transition duration-150
            `}
        >
          {parse(ele)}
        </div>
      );
    });
  }
  return (
    <div className="mb-5 border-b border-borderClr pb-5">
      <h2 className="mb-3 font-karla font-bold">{parse(question)}</h2>
      <div className="flex gap-3 font-inter text-xxs font-medium">
        {displayChoices()}
      </div>
    </div>
  );
}

// ${
//   props.isChosen
//     ? "bg-chooseClr border-chooseClr"
//     : "bg-transparent border-btnClr"
// }
