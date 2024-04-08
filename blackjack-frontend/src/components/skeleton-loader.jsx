import React from 'react';
import styles from '../styles/components/skeleton-loader.module.css';

const SkeletonLoader = ({ style }) => {
  return (
    <div className={styles.skeleton} style={style}></div>
  );
};

export default SkeletonLoader;
