import Card from "./card";
import styles from '../styles/components/hand-display.module.css';

const HandDisplay = ({ role, cards, points }) => {
 
    const label = role === 'dealer' ? "Dealer's Hand" : "Your Hand";

    return (
        <div>
            <h3 className={styles.title}>{label}</h3>
            <div className={styles.innerContainer}>
                {cards.map((card, index) => {
                    // For the dealer, hide the first card's value and suit
                    if (role === 'dealer' && index === 0) {
                        return <Card key={index} />;
                    }
                    return <Card key={index} suit={card.suit} value={card.value} />;
                })}
                <div>
                    <h3 className={styles.points}>{points}</h3>
                </div>
            </div>
        </div>
    );
};

export default HandDisplay;
