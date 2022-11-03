export default function Start(props) {
  return (
    <div className="flex h-screen w-full items-center justify-center">
      <div>
        <h1 className=" mb-11 text-center font-karla text-3xl font-bold">
          Quizzical
        </h1>
        <button
          className="h-14 w-48  rounded-2xl bg-btnClr font-inter font-medium text-bgClr shadow-md transition duration-300 hover:brightness-110"
          onClick={props.startQuiz}
        >
          Start quiz
        </button>
      </div>
    </div>
  );
}
