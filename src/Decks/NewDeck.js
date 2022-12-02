import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { createDeck } from "../utils/api/index";
import DeckForm from "../Forms/DeckForm";

function NewDeck() {
  const history = useHistory();

  const formReset = {
    name: "",
    description: "",
  };

  const [newDeck, setNewDeck] = useState(formReset);

  const formChangeHandler = ({ target }) => {
    setNewDeck({
      ...newDeck,
      [target.id]: target.value,
    });
  };

  async function submitHandler(event) {
    event.preventDefault();
    const response = await createDeck({
      name: newDeck.name,
      description: newDeck.description,
    });
    const brandNewDeck = await response;
    history.push(`/decks/${brandNewDeck.id}`);
  }

  return (
    <div>
      <nav aria-label="breadcrumb">
        <ol className="breadcrumb">
          <li className="breadcrumb-item">
            <Link to="/">
              <span className="oi oi-home"> Home</span>
            </Link>
          </li>
          <li className="breadcrumb-item active" aria-current="page">
            Create Deck
          </li>
        </ol>
      </nav>
      <DeckForm
        submitHandler={submitHandler}
        formChangeHandler={formChangeHandler}
        existingDeck={newDeck}
      />
    </div>
  );
}

export default NewDeck;
