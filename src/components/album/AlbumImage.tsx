import clsx from 'clsx';
import { useState } from 'react';

import styles from './AlbumImage.module.scss';

interface AlbumImageProps {
  image: string;
  label: string;
  removeHover?: boolean;
  containerStyles?: React.CSSProperties;
  loading?: 'lazy' | 'eager';
  imageStyles?: React.CSSProperties;
}

const AlbumImage = ({
  image,
  label,
  removeHover,
  containerStyles,
  loading = 'lazy',
}: AlbumImageProps) => {
  const [loaded, setLoaded] = useState(false);

  return (
    <div
      className={clsx(styles.imageContainer, {
        [styles.loaded]: loaded,
      })}
      style={containerStyles}
    >
      {!loaded && <div className={styles.imagePlaceholder} />}

      <img
        src={image}
        alt={label}
        className={clsx(styles.albumImage, {
          [styles.hoverable]: !removeHover,
        })}
        loading={loading}
        onLoad={() => setLoaded(true)}
      />
    </div>
  );
};

export default AlbumImage;
