import styles from '../styles/components/profile.module.css';
import SkeletonLoader from './skeleton-loader';

const Profile = ({ isLoading }) => {

    const level = 1;
    //TODO add level logic

    if (isLoading) return (
        <div className={styles.profileContainer}>
            <div className={styles.profileSkeletonImage}>
                <SkeletonLoader style={{ width: '100%', height: '100%', borderRadius: '50%', marginLeft: '0' }} />
            </div>
            <div className={styles.profileInnerContainer}>
                <div className={styles.profileNameSkeleton}>
                    <SkeletonLoader style={{ width: '100%', height: '100%', borderRadius: '1px' }} />
                </div>
                <div className={styles.profileLevelSkeleton}>
                    <SkeletonLoader style={{ width: '100%', height: '100%', borderRadius: '1px' }} />
                </div>
            </div>
        </div>
    );

    // <img src='https://github.com/matheusmorcinek.png' alt='Profile photo' />
    // <strong className={styles.profileName}>Matheus Morcinek</strong>
    return (
        <div className={styles.profileContainer}>
            <img className={styles.profileImage} src='https://github.com/matheusmorcinek.png' alt='Profile photo' />
            <div className={styles.profileInnerContainer}>
                <strong className={styles.profileName}>Matheus Morcinek</strong>
                <p className={styles.levelContainer}>
                    <img src='icons/level.svg' alt='Level icon' />
                    Level {level}
                </p>
            </div>
        </div>
    );
};

export default Profile;
