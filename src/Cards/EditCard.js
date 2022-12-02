import React, { useEffect, useState } from "react";
import { Link, useHistory, useParams } from "react-router-dom";
import { updateCard, readCard, readDeck } from "../utils/api/index";
import CardForm from "../Forms/CardForm";

function EditCard() {
  const history = useHistory();
  const { deckId, cardId } = useParams();

  const cardReset = {
    id: cardId,
    front: "",
    back: "",
    deckId: deckId,
  };

  const deckReset = {
    id: deckId,
    name: "",
    description: "",
  };

  const [deck, setDeck] = useState(deckReset);
  const [card, setCard] = useState(cardReset);

  useEffect(() => {
    async function getDeck() {
      try {
        const deckFromAPI = await readDeck(deckId);
        setDeck(deckFromAPI);
        const cardFromAPI = await readCard(cardId);
        setCard(cardFromAPI);
      } catch (error) {
        throw new Error(`API readDeck(${deckId}) had an error: ${error}`);
      }
    }
    getDeck();
  }, [deckId, cardId]);

  const formChangeHandler = ({ target }) => {
    setCard({
      ...card,
      [target.id]: target.value,
    });
  };

  async function submitHandler(event) {
    event.preventDefault();
    await updateCard({
      ...card,
      front: card.front,
      back: card.back,
    });
    history.goBack();
  }

  let deckName = deck?.name ? deck.name : "loading...";

  return (
    <div>
      <nav aria-label="breadcrumb">
        <ol className="breadcrumb">
          <li className="breadcrumb-item">
            <Link to="/">Home</Link>
          </li>
          <li className="breadcrumb-item">
            <Link to={`/decks/${deckId}`}>{deckName}</Link>
          </li>
          <li className="breadcrumb-item active" aria-current="page">
            Edit Card {cardId}
          </li>
        </ol>
      </nav>
      <CardForm
        submitHandler={submitHandler}
        formChangeHandler={formChangeHandler}
        card={card}
      />
    </div>
  );
}

export default EditCard;
