import clsx from 'clsx';

import styles from './AlbumImage.module.scss';

interface AlbumImageProps {
  image: string;
  label: string;
  removeHover?: boolean;
  style?: React.CSSProperties;
}

const AlbumImage = ({ image, label, removeHover, style }: AlbumImageProps) => {
  return (
    <img
      src={image}
      alt={label}
      className={clsx(styles.albumImage, {
        [styles.hoverable]: !removeHover
      })}
      style={style}
      loading="lazy"
    />
  );
};

export default AlbumImage;
