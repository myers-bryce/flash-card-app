import React from "react";
import CardStudyButtons from "./CardStudyButtons";

function CardStudy({
  card,
  total,
  nextHandler,
  flipHandler,
  cardNumber,
  cardFlipped,
  nextButton,
}) {
  const { id, front, back } = card;

  const question = <p className="card-body">{front}</p>;
  const answer = <p className="card-body text-success">{back}</p>;

  const content = cardFlipped ? answer : question;

  return (
    <div className="card">
      <div className="card" key={id}>
        <div className="card-body">
          <h4 className="card-title">
            Card {cardNumber} of {total}
          </h4>
          <p className="card-text" style={{height: "75px"}}>{content}</p>
          <CardStudyButtons
            nextHandler={nextHandler}
            flipHandler={flipHandler}
            nextButton={nextButton}
          />
        </div>
      </div>
    </div>
  );
}

export default CardStudy;
