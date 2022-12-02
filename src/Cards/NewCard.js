import React, { useEffect, useState } from "react";
import { Link, useParams , useHistory } from "react-router-dom";
import { createCard, readDeck } from "../utils/api/index";
import CardForm from "../Forms/CardForm";

function NewCard() {
  const history = useHistory()
  const { deckId } = useParams();

  const formReset = {
    front: "",
    back: "",
  };

  const deckReset = {
    id: deckId,
    name: "",
    description: "",
  };

  const [deck, setDeck] = useState(deckReset);

  useEffect(() => {
    async function getDeck() {
      try {
        const deckFromAPI = await readDeck(deckId);
        setDeck(deckFromAPI);
      } catch (error) {
        throw new Error(`API readDeck(${deckId} had an error: ${error}`);
      }
    }
    getDeck();
  }, [deckId]);

  const [newCard, setNewCard] = useState(formReset);

  const formChangeHandler = ({ target }) => {
    setNewCard({
      ...newCard,
      [target.id]: target.value,
    });
  };

  async function submitHandler(event) {
    event.preventDefault();
    await createCard(deckId, newCard);
    setNewCard(formReset);
    history.goBack(-1)
  }

  let deckName = deck?.name ? deck?.name : "loading...";

  return (
    <div className="container">
      <nav aria-label="breadcrumb">
        <ol className="breadcrumb">
          <li className="breadcrumb-item">
            <Link to="/">Home</Link>
          </li>
          <li className="breadcrumb-item">
            <Link to={`/decks/${deckId}`}>{deckName}</Link>
          </li>
          <li className="breadcrumb-item active" aria-current="page">
            Add Card
          </li>
        </ol>
      </nav>
      <h4>{deckName}: Add Card</h4>
      <CardForm
        submitHandler={submitHandler}
        formChangeHandler={formChangeHandler}
        card={newCard}
      />
    </div>
  );
}

export default NewCard;
