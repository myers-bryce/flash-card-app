import React from "react";
import { useHistory } from "react-router-dom";

function CardForm({ card, formChangeHandler, submitHandler }) {
  const history = useHistory();
  const backButton = card.id ? "Cancel" : "Done";
  const nextButton = card.id ? "Submit" : "Save";

  return (
    <div>
      <form onSubmit={submitHandler}>
        <div className="form-group">
          <label htmlFor="front">Front</label>
          <textarea
            id="front"
            type="text"
            className="form-control"
            placeholder="Front side of card"
            onChange={formChangeHandler}
            value={card.front}
          ></textarea>
        </div>
        <div className="form-group">
          <label htmlFor="back">Back</label>
          <textarea
            id="back"
            type="text"
            className="form-control mb-3"
            placeholder="Back side of card"
            onChange={formChangeHandler}
            value={card.back}
          ></textarea>
        </div>
        <button
          type="button"
          onClick={() => history.goBack()}
          className="btn btn-secondary mr-2"
        >
          {backButton}
        </button>
        <button type="submit" className="btn btn-primary">
          {nextButton}
        </button>
      </form>
    </div>
  );
}

export default CardForm;
