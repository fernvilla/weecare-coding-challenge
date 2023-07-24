import { createContext, useEffect, useState } from 'react';
import { AlbumsContextInterface } from '../interfaces/albums-context';
import { Entry, ItunesResponse } from '../interfaces/itunes-response';

export const AlbumsContext = createContext<AlbumsContextInterface | null>(null);

const AlbumsProvider = ({ children }: { children: React.ReactNode }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [albums, setAlbums] = useState<Entry[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchSongData = async () => {
      try {
        const res = await fetch('https://itunes.apple.com/us/rss/topalbums/limit=100/json');
        const data = (await res.json()) as ItunesResponse;

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

  return <AlbumsContext.Provider value={{ isLoading, albums, error }}>{children}</AlbumsContext.Provider>;
};

export default AlbumsProvider;
