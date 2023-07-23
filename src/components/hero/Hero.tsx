import { useMemo } from 'react';
import { Entry } from '../../interfaces/itunes-response';
import { generateRandomArrayItems } from '../../utils/arrays';
import { generateImageWithSizeFromUrl } from '../../utils/images';
import AlbumImage from '../album/AlbumImage';

import styles from './Hero.module.scss';

interface HeroProps {
  albums: Entry[];
}

const Hero = ({ albums }: HeroProps) => {
  // Grab 3 random albums from the list to display on the hero
  // Prevent re-rendering of the random albums by using useMemo
  const randomAlbums = useMemo(() => generateRandomArrayItems(albums, 3), [albums]);
  const randomAlbumsImages = randomAlbums.map(album => generateImageWithSizeFromUrl(album['im:image'][0].label, 600));

  const onButtonClick = () => {
    alert('Let the music play!');
  };

  return (
    <div className={styles.hero}>
      <div className={styles.heroInnerContainer}>
        {/* Left Column */}
        <div className={styles.heroLeftColumn}>
          <div className={styles.imagesContainer}>
            {randomAlbumsImages.map((image, i) => (
              <AlbumImage
                image={image}
                // Increase the width of each image by 25px and the right position by 40px
                style={{ width: 250 + i * 25, position: 'absolute', right: i * 40, zIndex: i }}
                label="Album image"
                key={image}
                removeHover
              />
            ))}
          </div>
        </div>

        {/* Right Column */}
        <div className={styles.heroRightColumn}>
          <h1 className={styles.heroTitle}>Harmonize Your World</h1>

          <p className={styles.heroTagline}>
            Discover, Stream, and Experience Music Like Never Before with our Cutting-Edge Music App!
          </p>

          <button className={styles.heroButton} onClick={onButtonClick}>
            Get Started
          </button>
        </div>
      </div>
    </div>
  );
};

export default Hero;
