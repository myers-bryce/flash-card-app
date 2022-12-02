import React from "react";
import DeckButtons from "./DeckButtons";

function Deck({ id, name, description, totalCards, deleteHandler }) {
  const displayTotalCards = totalCards === 1 ? "1 card" : `${totalCards} cards`;

  return (
    <div className="card mb-2">
      <div className="card" key={id}>
        <div className="card-body">
          <p className="card-title float-right text-muted">{displayTotalCards}</p>
          <h4 className="card-title">{name}</h4>
          <p className="card-text">{description}</p>
          <DeckButtons id={id} deleteHandler={deleteHandler} />
        </div>
      </div>
    </div>
  );
}

export default Deck;