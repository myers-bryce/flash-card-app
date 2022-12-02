import React from "react";
import { useParams, Link } from "react-router-dom";

function CardButtons({ id, deleteHandler }) {
  const { deckId } = useParams();

  return (
    <div className="btn-group" role="group" aria-label="Card Buttons Group">
      <Link to={`/decks/${deckId}/cards/${id}/edit`}>
        <button type="button" className="btn btn-sm btn-secondary mr-2">
          Edit
        </button>
      </Link>
      <button
      type="button"
      onClick={() => deleteHandler(id)}
      className="btn btn-sm btn-danger">
        <span className="oi oi-trash"></span>
      </button>
    </div>
  );
}

export default CardButtons