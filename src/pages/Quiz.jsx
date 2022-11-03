import Question from "../components/Question";
import { nanoid } from "nanoid";
import { useEffect, useState } from "react";
import axios from "axios";

export default function Quiz() {
  const questionsNumber = 5;
  const [quizData, setQuizData] = useState([]);

  useEffect(() => {
    axios
      .get(
        `https://opentdb.com/api.php?amount=${questionsNumber}&type=multiple`
      )
      .then((res) => {
        console.log(res.data.results);
        setQuizData(res.data.results);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  function displayQuizData() {
    return quizData.map((ele) => {
      return (
        <Question
          key={nanoid()}
          question={ele.question}
          correctAnswer={ele.correct_answer}
          incorrectAnswers={[...ele.incorrect_answers]}
        />
      );
    });
  }

  return (
    <div className=" px-20 py-10">
      {displayQuizData()}
      <button className="mx-auto block h-9 w-32 rounded-xl bg-btnClr font-inter text-xxs font-semibold text-bgClr shadow-md transition duration-300 hover:brightness-110">
        Check answers
      </button>
    </div>
  );
}
