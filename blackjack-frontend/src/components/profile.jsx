import styles from '../styles/components/profile.module.css';

const Profile = () => {

    const level = 1;
    //TODO add level logic

    return (
        <div className={styles.profileContainer}>
            <img src='https://github.com/matheusmorcinek.png' alt='Profile photo' />
            <div>
                <strong>Matheus Morcinek</strong>
                <p>
                    <img src='icons/level.svg' alt='Level icon' />
                    Level {level}
                </p>
            </div>
        </div>
    );
};

export default Profile;
