import React from "react";

function CardStudyButtons({ nextHandler, flipHandler, nextButton }) {
  let buttonFlip = (
    <button
      type="button"
      onClick={() => flipHandler()}
      className="btn btn-secondary mr-2"
      style={{ maxWidth: "60px" }}
    >
      Flip
    </button>
  );
  let buttonNext = (
    <button
      type="button"
      onClick={() => nextHandler()}
      className="btn btn-primary"
      style={{ maxWidth: "60px" }}
    >
      Next
    </button>
  );
  return (
    <div
      role="group"
      aria-label="Study Card Buttons Group"
    >
      {buttonFlip}
      {nextButton ? buttonNext : null}
    </div>
  );
}

export default CardStudyButtons;
