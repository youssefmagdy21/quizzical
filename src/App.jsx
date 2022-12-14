import Start from "./pages/Start";
import Quiz from "./pages/Quiz";
import ImgBg from "./components/ImgBg";
import { useState } from "react";

export default function App() {
  const [isStarted, setIsStarted] = useState(false);
  function startQuiz() {
    setIsStarted(true);
  }
  return (
    <main>
      <ImgBg />
      {isStarted ? <Quiz /> : <Start startQuiz={startQuiz} />}
    </main>
  );
}
