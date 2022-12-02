import React from "react";
import { useParams, Link } from "react-router-dom";

function DeckButtons({ id, deleteHandler }) {
  const { deckId } = useParams();
  let editButton = null;
  let viewButton = null;
  let addCardsButton = null;

  if (deckId) {
    editButton = (
      <Link to={`/decks/${deckId}/edit`}>
        <button type="button" className="btn btn-secondary mr-2">
          <span className="oi oi-pencil"> Edit</span>
        </button>
      </Link>
    );
    addCardsButton = (
      <Link to={`/decks/${deckId}/cards/new`}>
        <button type="button" className="btn btn-primary">
          <span className="oi oi-plus"> Add Cards</span>
        </button>
      </Link>
    );
  } else {
    viewButton = (
      <Link to={`/decks/${id}`}>
        <button type="button" className="btn btn-secondary mr-2">
          <span className="oi oi-eye"> View</span>
        </button>
      </Link>
    );
  }

  return (
    <div
      className="btn-toolbar justify-content-between"
      role="toolbar"
      aria-label="Deck Buttons"
    >
      <div
        className="btn-group"
        role="group"
        aria-label="View Study Edit Add group"
      >
        {viewButton}
        {editButton}

        <Link to={`/decks/${id}/study`}>
          <button type="button" className="btn btn-primary mr-2">
            <span className="oi oi-book"> Study</span>
          </button>
        </Link>

        {addCardsButton}
      </div>
      <div className="btn-group" role="group" aria-label="Delete group">
        <button
          type="button"
          onClick={() => deleteHandler(deckId, id)}
          className="btn btn-danger"
        >
          <span className="oi oi-trash"></span>
        </button>
      </div>
    </div>
  );
}

export default DeckButtons;
