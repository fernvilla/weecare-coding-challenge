import { Entry } from '../../interfaces/itunes-response';
import { generateRandomArrayItems } from '../../utils/arrays';
import { generateImageWithSizeFromUrl } from '../../utils/images';
import styles from './Hero.module.scss';

interface HeroProps {
  albums: Entry[];
}

const Hero = ({ albums }: HeroProps) => {
  // Grab 3 random albums from the list to display on the hero
  const randomAlbums = generateRandomArrayItems(albums, 3);
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
              <img
                src={image}
                className={styles.heroImage}
                alt="hero image"
                style={{ width: 200 + i * 25, position: 'absolute', right: i * 20 + 20, zIndex: i }}
                key={i}
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
