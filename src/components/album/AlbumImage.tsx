import clsx from 'clsx';
import styles from './AlbumImage.module.scss';

interface AlbumImageProps {
  image: string;
  label: string;
  removeHover?: boolean;
}

const AlbumImage = ({ image, label, removeHover }: AlbumImageProps) => {
  return (
    <img
      src={image}
      alt={label}
      className={clsx(styles.albumImage, {
        [styles.hoverable]: !removeHover
      })}
    />
  );
};

export default AlbumImage;
