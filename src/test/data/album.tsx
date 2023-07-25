import { AlbumEntry } from '../../interfaces/itunes-response';
import { generateImageWithSizeFromUrl } from '../../utils/images';

const album: AlbumEntry = {
  'im:name': { label: 'Barbie The Album' },
  'im:image': [
    {
      label:
        'https://is1-ssl.mzstatic.com/image/thumb/Music116/v4/c0/54/97/c05497aa-c19f-bf4f-de29-71edf30fbefb/075679688767.jpg/55x55bb.png',
      attributes: { height: '55' },
    },
    {
      label:
        'https://is5-ssl.mzstatic.com/image/thumb/Music116/v4/c0/54/97/c05497aa-c19f-bf4f-de29-71edf30fbefb/075679688767.jpg/60x60bb.png',
      attributes: { height: '60' },
    },
    {
      label:
        'https://is5-ssl.mzstatic.com/image/thumb/Music116/v4/c0/54/97/c05497aa-c19f-bf4f-de29-71edf30fbefb/075679688767.jpg/170x170bb.png',
      attributes: { height: '170' },
    },
  ],
  'im:itemCount': { label: '17' },
  'im:price': { label: '$10.99', attributes: { amount: '10.99', currency: 'USD' } },
  'im:contentType': {
    'im:contentType': { attributes: { term: 'Album', label: 'Album' } },
    attributes: { term: 'Music', label: 'Music' },
  },
  rights: {
    label: '℗ 2023 Atlantic Recording Corporation, Warner Bros. Entertainment, Inc. & Mattel, Inc.',
  },
  title: { label: 'Barbie The Album - Various Artists' },
  link: {
    attributes: {
      rel: 'alternate',
      type: 'text/html',
      href: 'https://music.apple.com/us/album/barbie-the-album/1689238301?uo=2',
    },
  },
  id: {
    label: 'https://music.apple.com/us/album/barbie-the-album/1689238301?uo=2',
    attributes: { 'im:id': '1689238301' },
  },
  'im:artist': { label: 'Various Artists' },
  category: {
    attributes: {
      'im:id': '14',
      term: 'Pop',
      scheme: 'https://music.apple.com/us/genre/music-pop/id14?uo=2',
      label: 'Pop',
    },
  },
  'im:releaseDate': { label: '2023-07-21T00:00:00-07:00', attributes: { label: 'July 21, 2023' } },
};

export const image = generateImageWithSizeFromUrl(album['im:image'][0].label, 500);

export default album;
