import { Entry } from '../../interfaces/itunes-response';
import { formatDate } from '../../utils/dates';
import { generateImageWithSizeFromUrl } from '../../utils/images';
import AlbumImage from '../album/AlbumImage';
import Modal, { ModalProps } from '../modal/Modal';

import styles from './AlbumDetailsModal.module.scss';

interface AlbumDetailsModalProps extends Omit<ModalProps, 'children'> {
  album: Entry;
}

const AlbumDetailsModal = ({ album, show, onClose }: AlbumDetailsModalProps) => {
  console.log(album);
  const image = generateImageWithSizeFromUrl(album['im:image'][0].label, 600);

  return (
    <Modal show={show} onClose={onClose}>
      <div className={styles.albumDetailsContainer}>
        <div className={styles.imageContainer}>
          <AlbumImage image={image} label={album.title.label} removeHover />
        </div>

        <div className={styles.detailsContainer}>
          <div>
            <h2>{album['im:name'].label}</h2>
            <h3>{album['im:artist'].label}</h3>
            <p>{formatDate(album['im:releaseDate'].label)}</p>
          </div>

          <p>{album.rights.label}</p>
        </div>
      </div>
    </Modal>
  );
};

export default AlbumDetailsModal;
