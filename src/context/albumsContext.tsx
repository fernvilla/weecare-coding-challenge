import { createContext, useEffect, useState } from 'react';
import { AlbumsContextInterface, FilterOptions } from '../interfaces/albums-context';
import { AlbumEntry, ItunesResponse } from '../interfaces/itunes-response';

export const AlbumsContext = createContext<AlbumsContextInterface | null>(null);

const AlbumsProvider = ({ children }: { children: React.ReactNode }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [albums, setAlbums] = useState<AlbumEntry[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [filterOptions, setFilterOptions] = useState<FilterOptions>({} as FilterOptions);

  useEffect(() => {
    const fetchSongData = async () => {
      try {
        const res = await fetch('https://itunes.apple.com/us/rss/topalbums/limit=100/json');
        const data = (await res.json()) as ItunesResponse;
        const albums = data.feed.entry;

        mapAlbumData(albums);
        setAlbums(data.feed.entry);
      } catch (err: unknown) {
        const error = err as Error;
        setError(error.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchSongData();
  }, []);

  const mapAlbumData = (albums: AlbumEntry[]) => {
    const filterOptions = { genres: [] } as FilterOptions;

    albums.forEach((album) => {
      const genre = album.category.attributes.label;

      if (!filterOptions.genres.includes(genre)) {
        filterOptions.genres.push(genre);
      }
    });

    setFilterOptions(filterOptions);
  };

  return (
    <AlbumsContext.Provider value={{ isLoading, albums, error, filterOptions }}>
      {children}
    </AlbumsContext.Provider>
  );
};

export default AlbumsProvider;
