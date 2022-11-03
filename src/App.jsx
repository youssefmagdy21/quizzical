import Start from "./pages/Start";
import Quiz from "./pages/Quiz";
import ImgBg from "./components/ImgBg";
import { useState } from "react";

export default function App() {
  const [isStarted, setIsStarted] = useState(true);
  function startQuiz() {
    setIsStarted(true);
  }
  return (
    <main>
      <ImgBg />
      {/* <Quiz /> */}
      {isStarted ? <Quiz /> : <Start startQuiz={startQuiz} />}
    </main>
  );
}
