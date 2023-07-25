import clsx from 'clsx';
import { RiHeartFill, RiHeartLine } from 'react-icons/ri';
import { MouseEvent } from 'react';

import styles from './FavoriteIcon.module.scss';

interface FavoriteIconProps {
  isFavorite: boolean;
  onFavoriteClick: (e: MouseEvent<HTMLSpanElement>) => void;
  size?: number;
}

const FavoriteIcon = ({ isFavorite, onFavoriteClick, size }: FavoriteIconProps) => {
  return (
    <span
      className={clsx(styles.favoriteIcon, {
        [styles.favoriteIconActive]: isFavorite
      })}
      onClick={onFavoriteClick}
      title={isFavorite ? 'Remove from favorites' : 'Add to favorites'}
    >
      {isFavorite ? <RiHeartFill color="#df3940" size={size} /> : <RiHeartLine size={size} />}
    </span>
  );
};

export default FavoriteIcon;
