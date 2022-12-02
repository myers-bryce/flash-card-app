import React, { useEffect, useState } from "react";
import { Link, useHistory, useParams } from "react-router-dom";
import { updateDeck, readDeck } from "../utils/api/index";
import DeckForm from "../Forms/DeckForm";

function EditDeck() {
  const history = useHistory();
  const { deckId } = useParams();

  const formReset = {
    id: "",
    name: "",
    description: "",
  };

  const [existingDeck, setExistingDeck] = useState(formReset);

  useEffect(() => {
    async function getDeck() {
      try {
        const deckFromAPI = await readDeck(deckId);
        setExistingDeck(deckFromAPI);
      } catch (error) {
        throw new Error(`API readDeck(${deckId}) had an error: ${error}`);
      }
    }
    getDeck();
  }, [deckId]);

  const formChangeHandler = ({ target }) => {
    setExistingDeck({
      ...existingDeck,
      [target.id]: target.value,
    });
  };

  async function submitHandler(event) {
    event.preventDefault();
    await updateDeck({
      ...existingDeck,
      id: existingDeck.id,
      name: existingDeck.name,
      description: existingDeck.description,
    });
    history.goBack();
  }

  let originalDeckName = existingDeck?.name ? existingDeck?.name : "loading...";

  return (
    <div>
      <nav aria-label="breadcrumb">
        <ol className="breadcrumb">
          <li className="breadcrumb-item">
            <Link to="/">Home</Link>
          </li>
          <li className="breadcrumb-item">
            <Link to={`/decks/${deckId}`}>{originalDeckName}</Link>
          </li>
          <li className="breadcrumb-item active" aria-current="page">
            Edit Deck
          </li>
        </ol>
      </nav>
      <DeckForm
        submitHandler={submitHandler}
        formChangeHandler={formChangeHandler}
        existingDeck={existingDeck}
      />
    </div>
  );
}

export default EditDeck