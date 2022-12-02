import React, { useState, useEffect } from "react";
import { useHistory, Link, useParams } from "react-router-dom";
import { readDeck } from "../utils/api/index";
import CardStudy from "../Cards/StudyCard";

function StudyDeck() {
  const history = useHistory();
  const { deckId } = useParams();
  const [cardDeck, setCardDeck] = useState();

  useEffect(() => {
    async function loadCardDeck() {
      const deckFromAPI = await readDeck(deckId);
      setCardDeck(deckFromAPI);
    }
    loadCardDeck();
  }, [deckId]);

  const initialCardState = {
    cardNumber: 1,
    cardFlipped: false,
    nextButton: false,
  };

  const [card, setCard] = useState(initialCardState);
  const { cardNumber, cardFlipped, nextButton } = card;

  const flipHandler = () => {
    setCard({ ...card, cardFlipped: !cardFlipped, nextButton: true });
  };

  const nextHandler = () => {
    if (cardNumber >= totalCards && totalCards >= 3) {
      if (
        window.confirm(
          `Restart cards?\n\nClick 'cancel' to return to home page.`
        )
      ) {
        setCard(initialCardState);
      } else {
        history.push("/");
      }
    } else {
      setCard({
        ...card,
        cardNumber: cardNumber + 1,
        cardFlipped: false,
        nextButton: false,
      });
    }
  };

  const totalCards = cardDeck?.cards?.length;

  const cards = cardDeck?.cards?.map((card) => {
    return (
      <CardStudy
        cardNumber={cardNumber}
        cardFlipped={cardFlipped}
        card={card}
        key={card.id}
        total={totalCards}
        nextHandler={nextHandler}
        flipHandler={flipHandler}
        nextButton={nextButton}
      />
    );
  });

function NotEnoughCards({totalCards, deckId}) {
  let cardCount = "2 cards";
  cardCount = !totalCards ? "0 cards" : "1 card"
  return (
    <div>
      <h3>Not enough cards.</h3>
      <p>
        You need at least 3 cards to study. There are {cardCount} in the deck.
      </p>
      <Link to={`/decks/${deckId}/cards/new`}>
        <button type="button" className="btn btn-primary">
        <span className="oi oi-plus"> Add</span>
        </button>
      </Link>
    </div>
  )
}

  if (!cardDeck) {
    return <p>Loading...</p>;
  }

  let displayResult = null;
  const notEnoughCards = (
    <NotEnoughCards total={totalCards} deckId={cardDeck.id} />
  );
  const enoughCards = cards[cardNumber - 1];
  displayResult = totalCards <= 2 ? notEnoughCards : enoughCards;

  return (
    <div class="container">
      <nav aria-label="breadcrumb">
        <ol class="breadcrumb">
          <li class="breadcrumb-item">
            <a href="/">Home</a>
          </li>
          <li class="breadcrumb-item">
            <Link to={`/decks/${cardDeck.id}`}>{cardDeck.name}</Link>
          </li>
          <li class="breadcrumb-item active" aria-current="page">
            Study
          </li>
        </ol>
      </nav>
      <h1>Study: {cardDeck.name}</h1>
      <div style={{ marginTop: "30px" }}>{displayResult}</div>
    </div>
  );
}

export default StudyDeck;
