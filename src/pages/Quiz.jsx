import parse from "html-react-parser";
import { nanoid } from "nanoid";
import { useEffect, useState } from "react";
import axios from "axios";
import Choices from "../components/Choices";

export default function Quiz() {
  const questionsNumber = 5;
  const [quizData, setQuizData] = useState([]);
  const [isChecked, setIsChecked] = useState(false);
  const [score, setScore] = useState(0);
  const [playAgain, setPlayAgain] = useState(false);
  function getRandomNumber(max) {
    return Math.floor(Math.random() * max);
  }
  useEffect(() => {
    axios
      .get(
        `https://opentdb.com/api.php?amount=${questionsNumber}&type=multiple`
      )
      .then((res) => {
        const data = res.data.results;
        const quiz = data.map((ele) => {
          const wrongChoices = ele.incorrect_answers;
          const choices = wrongChoices.map((ele) => {
            return {
              choice: ele,
              isCorrect: false,
              isChosen: false,
            };
          });
          choices.splice(getRandomNumber(4), 0, {
            choice: ele.correct_answer,
            isCorrect: true,
            isChosen: false,
          });
          return {
            id: nanoid(),
            question: ele.question,
            choices: [...choices],
            isAnswered: false,
          };
        });

        setQuizData(quiz);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [playAgain]);
  function chooseAnswer(id, choice) {
    // const newQuizData = [];
    // for (let i = 0; i < questionsNumber; i++) {
    //   if (quizData[i].id === id) {
    //     const newChoices = [];
    //     for (let j = 0; j < 4; j++) {
    //       if (quizData[i].choices[j].choice === choice) {
    //         const newChoice = quizData[i].choices[j];
    //         newChoices.push({ ...newChoice, isChosen: true });
    //       } else {
    //         const newChoice = quizData[i].choices[j];
    //         newChoices.push({ ...newChoice, isChosen: false });
    //       }
    //     }
    //     newQuizData.push({ ...quizData[i], choices: [...newChoices] });
    //   } else {
    //     newQuizData.push({ ...quizData[i] });
    //   }
    // }
    // console.log(newQuizData);

    // setQuizData((prevQuizData) => {
    //   return prevQuizData.map((ele) => {
    //     if (ele.id === id) {
    //       const newChoices = [];
    //       for (let i = 0; i < ele.choices.length; i++) {
    //         if (ele.choices[i].choice === choice) {
    //           const newChoice = ele.choices[i];
    //           newChoices.push({ ...newChoice, isChosen: true });
    //         } else {
    //           const newChoice = ele.choices[i];
    //           newChoices.push({ ...newChoice, isChosen: false });
    //         }
    //       }
    //       return { ...ele, choices: [...newChoices] };
    //     }
    //     return { ...ele };
    //   });
    // });
    // console.log(quizData);

    setQuizData((prevQuizData) => {
      return prevQuizData.map((ele) => {
        if (ele.id === id) {
          const newChoices = ele.choices.map((ele) => {
            if (ele.choice === choice) {
              return { ...ele, isChosen: true };
            }
            return { ...ele, isChosen: false };
          });
          return { ...ele, choices: [...newChoices], isAnswered: true };
        }
        return { ...ele };
      });
    });
  }
  function displayQuizData() {
    return quizData.map((ele) => {
      return (
        <div key={ele.id} className="mb-5 border-b border-borderClr pb-5">
          <h2 className="mb-3 font-karla font-bold">{parse(ele.question)}</h2>
          <div className="flex gap-3 font-inter text-xxs font-medium">
            <Choices
              choices={ele.choices}
              id={ele.id}
              handleClick={chooseAnswer}
              isChecked={isChecked}
            />
          </div>
        </div>
      );
    });
  }
  // function allAnswered() {
  //   return quizData.every((ele) => {
  //     return ele.isAnswered;
  //   });
  //   // for (let i = 0; i < quizData.length; i++) {
  //   //   if (!quizData[i].isAnswered) {
  //   //     return false;
  //   //   }
  //   // }
  //   // return true;
  // }
  function checkAnswers() {
    // if (!allAnswered()) {
    //   alert("Please Answer All Question");
    //   return false;
    // }
    quizData.forEach((ele) => {
      ele.choices.forEach((ele) => {
        ele.isChosen && ele.isCorrect
          ? setScore((prevScore) => prevScore + 1)
          : setScore((prevScore) => prevScore);
      });
    });
    setIsChecked(true);
  }
  function runPlayAgain() {
    setPlayAgain((prevState) => {
      return !prevState;
    });
    setIsChecked(false);
    setScore(0);
  }
  return (
    <div className=" px-20 py-10">
      {displayQuizData()}
      {isChecked ? (
        <div className=" mx-auto flex w-96 items-center justify-center gap-2">
          <span className=" font-inter text-xs font-bold">
            {`You scored ${score}/5 correct answers`}
          </span>
          <button
            className="mx-auto h-9 w-32 rounded-xl bg-btnClr font-inter text-xxs font-semibold text-bgClr shadow-md transition duration-300 hover:brightness-110"
            onClick={runPlayAgain}
          >
            Play again
          </button>
        </div>
      ) : (
        <button
          className="mx-auto block h-9 w-32 rounded-xl bg-btnClr font-inter text-xxs font-semibold text-bgClr shadow-md transition duration-300 hover:brightness-110"
          onClick={checkAnswers}
        >
          Check answers
        </button>
      )}
    </div>
  );
}
