import styles from '../styles/components/sidebar.module.css';

const Sidebar = () => {
    return (
        <div className={styles.container}>
            <img src='/logo.svg' alt='Blackjack logo'></img>

            <button type='button' >

                <img src='/icons/home.svg' alt='Home icon'></img>
                <div className={styles.selected}></div>
            </button>

            <button type='button'>

                <img src='/icons/leaderboard.svg' alt='Leader board icon'></img>
                <div className={styles.selected}></div>
            </button>

            <button type='button' className={styles.settings}>

                <img src='/icons/settings.svg' alt='Settings icon'></img>
                <div className={styles.selected}></div>
            </button>
        </div>);
};

export default Sidebar;