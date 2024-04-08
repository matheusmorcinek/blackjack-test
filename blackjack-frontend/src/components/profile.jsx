import styles from '../styles/components/profile.module.css';
import SkeletonLoader from './skeleton-loader';

const ProfileSkeleton = () => {
    return (<div className={styles.profileContainer}>
        <div className={styles.profileSkeletonImage}>
            <SkeletonLoader style={{ width: '5.5rem', height: '5.5rem', borderRadius: '50%', marginLeft: '0' }} />
        </div>
        <div className={styles.profileInnerContainer}>
            <div className={styles.profileNameSkeleton}>
                <SkeletonLoader style={{ width: '100%', height: '100%', borderRadius: '1px' }} />
            </div>
            <div className={styles.profileLevelSkeleton}>
                <SkeletonLoader style={{ width: '100%', height: '100%', borderRadius: '1px' }} />
            </div>
        </div>
    </div>)
};

const Profile = ({ isLoading, name = 'Matheus Morcinek', imageUrl = 'https://github.com/matheusmorcinek.png', level = 1 }) => {

    if (isLoading) return <ProfileSkeleton />;

    return (
        <div className={styles.profileContainer}>
            <img className={styles.profileImage} src='https://github.com/matheusmorcinek.png' alt='Profile photo' />
            <div className={styles.profileInnerContainer}>
                <strong className={styles.profileName}>{name}</strong>
                <p className={styles.levelContainer}>
                    <img src='icons/level.svg' alt='Level icon' />
                    Level {level}
                </p>
            </div>
        </div>
    );
};

export default Profile;
