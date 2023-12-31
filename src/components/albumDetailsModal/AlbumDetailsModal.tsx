import { useEffect, useState } from 'react';
import { AlbumEntry } from '../../interfaces/itunes-response';
import { formatDate } from '../../utils/dates';
import { generateImageWithSizeFromUrl } from '../../utils/images';
import AlbumImage from '../album/AlbumImage';
import Button from '../button/Button';
import Modal, { ModalProps } from '../modal/Modal';
import { AlbumSongsSearch, Result } from '../../interfaces/itunes-album-songs-response';
import LoadingIcon from '../loadingIcon/LoadingIcon';
import { RiMusicFill } from 'react-icons/ri';
import { millisToMinutesAndSeconds } from '../../utils/time';
import { useFavorites } from '../../hooks/useFavorites';
import FavoriteIcon from '../favoriteIcon/FavoriteIcon';

import styles from './AlbumDetailsModal.module.scss';

interface AlbumDetailsModalProps extends Omit<ModalProps, 'children'> {
  album: AlbumEntry;
}

const AlbumDetailsModal = ({ album, show, onClose }: AlbumDetailsModalProps) => {
  const image = generateImageWithSizeFromUrl(album['im:image'][0].label, 600);
  const [albumSongsData, setAlbumSongsData] = useState<Result[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const { checkIfFavorite, onFavoriteClick } = useFavorites();
  const isFavorite = checkIfFavorite(album);

  useEffect(() => {
    const fetchAlbumSongs = async () => {
      try {
        const res = await fetch(
          `https://itunes.apple.com/lookup?id=${album.id.attributes['im:id']}&entity=song`,
        );
        const data = (await res.json()) as AlbumSongsSearch;
        const filteredData = data.results.filter((song) => song.wrapperType === 'track');

        setAlbumSongsData(filteredData);
      } catch (err: unknown) {
        const error = err as Error;
        console.error(error.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchAlbumSongs();
  }, [album.id.attributes]);

  return (
    <Modal show={show} onClose={onClose}>
      <div className={styles.albumDetailsContainer}>
        <div className={styles.imageContainer}>
          <div className={styles.albumPrice}>{album['im:price'].label}</div>
          <AlbumImage image={image} label={album.title.label} removeHover />
        </div>

        <div className={styles.detailsContainer}>
          <div>
            <h2 className={styles.albumName}>
              {album['im:name'].label}
              <FavoriteIcon
                isFavorite={isFavorite}
                onFavoriteClick={() => onFavoriteClick(album)}
                size={18}
              />
            </h2>
            <h2 className={styles.albumArtistName}>{album['im:artist'].label}</h2>
            <h3 className={styles.albumReleaseDate}>
              Released: {formatDate(new Date(album['im:releaseDate'].label))}
            </h3>
            <h3 className={styles.albumCategory}>{album.category.attributes.label}</h3>
          </div>

          <div>
            <div className={styles.ctaContainer}>
              <a href={album.link.attributes.href} target="_blank" rel="noopener noreferrer">
                <Button fullWidth>View Album</Button>
              </a>
            </div>
            <p className={styles.albumLabel}>{album.rights.label}</p>
          </div>
        </div>
      </div>

      {isLoading ? (
        <LoadingIcon />
      ) : (
        <div>
          <div className={styles.songsContainer}>
            <h2 className={styles.songsTitle}>Songs</h2>

            {albumSongsData.map((song) => (
              <div className={styles.song} key={song.trackId}>
                <RiMusicFill />

                <div>
                  {song.trackName}
                  <span className={styles.songTime}>
                    ({song.trackTimeMillis && millisToMinutesAndSeconds(song.trackTimeMillis)})
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </Modal>
  );
};

export default AlbumDetailsModal;
