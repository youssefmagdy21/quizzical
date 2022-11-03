import bottomImg from "../assets/blob-babyBlue.png";
import topImg from "../assets/blob-lime.png";
export default function ImgBg() {
  return (
    <>
      <img
        src={bottomImg}
        className="
            fixed
            -bottom-28 -left-36
            -z-10"
      />
      <img
        src={topImg}
        className="
            fixed
            -top-40 -right-32
            -z-10"
      />
    </>
  );
}
