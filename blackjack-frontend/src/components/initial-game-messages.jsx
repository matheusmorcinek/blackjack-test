import React from 'react';
import MessageDisplay from "./game-message-display";

const messages = [
  "Shuffling the deck...",
  "Let's get ready to play!",
  "Dealing the cards...",
  "May luck be on your side!",
  "The game begins now. Place your bets!",
  "Your cards are being dealt, plan your strategy wisely.",
  "Dealer is dealing the cards... what will be your move?",
  "The dealer slides the cards across the table...",
  "Will the next card be in your favor? Cards are coming up!",
  "It's all in the cards now, let's see what you've got."
];

const InitialGameMessages = () => {

  return <MessageDisplay messages={messages} />;
};

export default InitialGameMessages;