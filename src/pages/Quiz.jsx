import Question from "../components/Question";
import parse from "html-react-parser";
import { nanoid } from "nanoid";
import { useEffect, useState } from "react";
import axios from "axios";
import Choices from "../components/Choices";

export default function Quiz() {
  function getRandomNumber(max) {
    return Math.floor(Math.random() * max);
  }
  const questionsNumber = 5;
  const [quizData, setQuizData] = useState([]);
  const [isChecked, setIsChecked] = useState(false);
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
            choices: choices,
          };
        });

        setQuizData(quiz);
        console.log(quiz);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
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
          return { ...ele, choices: [...newChoices] };
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
            />
          </div>
        </div>
      );
    });
  }
  function checkAnswers() {
    let score = 0;
    quizData.forEach((ele) => {
      ele.choices.forEach((ele) => {
        ele.isCorrect && ele.isChosen ? score++ : (score = score);
      });
    });
    console.log(`${score}/5`);
    setIsChecked(true);
  }
  return (
    <div className=" px-20 py-10">
      {displayQuizData()}
      {/* {console.log(quizData)} */}
      {isChecked ? (
        <button className="mx-auto block h-9 w-32 rounded-xl bg-btnClr font-inter text-xxs font-semibold text-bgClr shadow-md transition duration-300 hover:brightness-110">
          Play again
        </button>
      ) : (
        <button
          className="mx-auto block h-9 w-32 rounded-xl bg-btnClr font-inter text-xxs font-semibold text-bgClr shadow-md transition duration-300 hover:brightness-110"
          onClick={checkAnswers}
        >
          Check answers
        </button>
      )}
      {/* <button
        className="mx-auto block h-9 w-32 rounded-xl bg-btnClr font-inter text-xxs font-semibold text-bgClr shadow-md transition duration-300 hover:brightness-110"
        onClick={checkAnswers}
      >
        Check answers
      </button> */}
    </div>
  );
}
