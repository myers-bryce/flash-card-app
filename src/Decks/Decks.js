import React, { useState, useEffect } from "react";
import { Route, Switch, Link, useHistory, useParams } from "react-router-dom";
import { listDecks, deleteDeck } from "../utils/api/index";
import ViewDeck from "./ViewDeck";
import EditDeck from "./EditDeck";
import NewDeck from "./NewDeck";
import StudyDeck from "./StudyDeck";
import Deck from "./Deck";
import NotFound from "../Layout/NotFound";
import EditCard from "../Cards/EditCard";
import NewCard from "../Cards/NewCard";

function Decks() {
  const [decks, setDecks] = useState([]);
  const history = useHistory();
  const { deckId } = useParams();

  useEffect(() => {
    async function fetchDecks() {
      const deckData = await listDecks();
      setDecks(deckData);
    }
    fetchDecks();
  }, []);

  const deleteHandler = async (deckId, id) => {
    //console.log("decksfile");
    //console.log("id", id);
    //console.log("deckId", deckId);
    if (
      window.confirm(`Delete this deck?\n\nYou will not be able to recover it.`)
    ) {
      await deleteDeck(id);
      //console.log(id);
      const updatedDeck = await listDecks(id);
      // console.log(updatedDeck);
      setDecks(updatedDeck);
      // setDecks((selectedDeck) => {
      //   selectedDeck.filter((deck) => {
      //     console.log(deck.id, id)
      //     return deck.id !== id});
      // });
      //console.log("delete");
      history.push(0);
      history.push("/");
    }
  };

  const decksDisplay = decks.map((deck) => {
    //console.log("2decksdisplay", deck.id);
    return (
      <Deck
        key={deck?.id}
        id={deck?.id}
        name={deck?.name}
        description={deck?.description}
        totalCards={deck?.cards?.length}
        deleteHandler={deleteHandler}
      />
    );
  });

  function DisplayDecks({ decks, deckId }) {
    //console.log("1displaydecks", deckId);
    // undefined
    return (
      <div className="container">
        <Link to="/decks/new">
          <button type="button" className="btn btn-secondary mb-2">
            <span className="oi oi-plus"> Create Deck</span>
          </button>
        </Link>
        {decks}
      </div>
    );
  }

  return (
    <div className="container" style={{ paddingBottom: "30px" }}>
      <Switch>
        <Route exact path="/">
          <DisplayDecks decks={decksDisplay} deckId={deckId} />
          {/* deck id is undefinded */}
        </Route>
        <Route path="/decks/:deckId/cards/:cardId/edit">
          <EditCard />
        </Route>
        <Route path="/decks/:deckId/cards/new">
          <NewCard />
        </Route>
        <Route path="/decks/:deckId/study">
          <StudyDeck />
        </Route>
        <Route path="/decks/:deckId/edit">
          <EditDeck />
        </Route>
        <Route path="/decks/new">
          <NewDeck />
        </Route>
        <Route path="/decks/:deckId">
          <ViewDeck deleteHandler={deleteHandler} />
        </Route>
        <Route>
          <NotFound />
        </Route>
      </Switch>
    </div>
  );
}

export default Decks;
