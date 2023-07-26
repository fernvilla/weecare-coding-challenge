import { useMemo } from 'react';
import { generateRandomArrayItems } from '../../utils/arrays';
import { generateImageWithSizeFromUrl } from '../../utils/images';
import AlbumImage from '../album/AlbumImage';
import { useAlbums } from '../../hooks/useAlbums';

import styles from './Hero.module.scss';

const Hero = () => {
  const { albums } = useAlbums();
  // Grab 3 random albums from the list to display on the hero
  // Prevent re-rendering of the random albums by using useMemo
  const randomAlbums = useMemo(() => generateRandomArrayItems(albums, 3), [albums]);
  const randomAlbumsImages = randomAlbums.map((album) =>
    generateImageWithSizeFromUrl(album['im:image'][0].label, 300),
  );

  return (
    <div className={styles.hero}>
      <div className={styles.heroInnerContainer}>
        {/* Left Column */}
        <div className={styles.heroLeftColumn}>
          <div className={styles.imagesContainer}>
            {randomAlbumsImages.map((image, albumIndex) => (
              <AlbumImage
                image={image}
                // Increase the width of each image by 25px and the right position by 40px
                containerStyles={{
                  width: 250 + albumIndex * 25,
                  position: 'absolute',
                  right: albumIndex * 40,
                  zIndex: albumIndex,
                }}
                label="Album image"
                key={image}
                removeHover
                loading="eager"
              />
            ))}
          </div>
        </div>

        {/* Right Column */}
        <div className={styles.heroRightColumn}>
          <h1 className={styles.heroTitle}>Harmonize Your World</h1>

          <p className={styles.heroTagline}>
            Discover, Stream, and Experience Music Like Never Before with our Cutting-Edge Music
            App!
          </p>

          <p className={styles.heroTagline}>
            Listen to the Top Albums on the go <span className="text-red text-bold">Now!</span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Hero;
