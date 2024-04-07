import MessageDisplay from "./game-message-display";

const messages = [
    "Waiting for the next move...",
    "The tension at the table rises...",
    "What will the dealer's cards reveal?",
    "The outcome is being decided...",
    "Hold tight, the game is unfolding...",
    "Eyes on the dealer as the moment approaches...",
    "The deck holds your fate, let's see what comes next...",
    "Anticipation builds... What move will turn the tide?",
    "The cards are drawn, the results are imminent...",
    "The table waits in silence for the outcome..."
];

const GamePlayerActionMessages = () => {

    return <MessageDisplay messages={messages} />;
};

export default GamePlayerActionMessages;