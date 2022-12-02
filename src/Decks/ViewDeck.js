import React, { useEffect, useState } from "react";
import { useParams, useHistory } from "react-router-dom";
import CardList from "../Cards/CardList";
import { readDeck, deleteCard } from "../utils/api/index";
import DeckButtons from "./DeckButtons";

function ViewDeck({ deleteHandler }) {
  const { deckId } = useParams();
  const history = useHistory();

  const [deck, setDeck] = useState({});
  const { id, name, description, cards } = deck;

  useEffect(() => {
    async function getDeck() {
      const deckFromAPI = await readDeck(deckId);
      setDeck(deckFromAPI);
    }
    getDeck();
  }, [deckId]);

  const deleteCardHandler = async (id) => {
    if (
      window.confirm(`Delete this card?\n\nYou will not be able to recover it.`)
    ) {
      await deleteCard(id);
      history.go(0);
    }
  };

  return (
    <div className="mb-4">
      <nav aria-label="breadcrumb">
        <ol className="breadcrumb">
          <li className="breadcrumb-item">
            <a href="/">
              <span className="oi oi-home"> Home</span>
            </a>
          </li>
          <li className="breadcrumb-item active" aria-current="page">
            {name}
          </li>
        </ol>
      </nav>
      <div className="mb-2" key={id}>
        <h4>{name}</h4>
        <p>{description}</p>
        <DeckButtons id={id} deleteHandler={deleteHandler} />
      </div>
      <CardList cards={cards} deleteHandler={deleteCardHandler}/>
    </div>
  );
}

export default ViewDeck;
