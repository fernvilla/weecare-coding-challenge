import { Entry } from '../interfaces/itunes-response';

interface AlbumProps {
  album: Entry;
}

const Album = ({ album }: AlbumProps) => {
  // TODO: image size is controlled by the last part of the label (use larger image)
  const image = album['im:image'].find(image => image.label.includes('170x170'))?.label;

  return (
    <div>
      <img src={image} alt={album.title.label} />
    </div>
  );
};

export default Album;
