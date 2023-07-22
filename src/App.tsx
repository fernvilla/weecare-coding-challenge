import { useEffect, useState } from 'react';
import { ItunesResponse } from './interfaces/itunes-response';
import Layout from './components/layout/Layout';
import AlbumFeed from './components/albumFeed/AlbumFeed';
import './styles/global.scss';
import Hero from './components/hero/Hero';

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [songData, setSongData] = useState<ItunesResponse>();

  useEffect(() => {
    const fetchSongData = async () => {
      try {
        const res = await fetch('https://itunes.apple.com/us/rss/topalbums/limit=100/json');
        const data = await res.json();

        setSongData(data);
      } catch (err: unknown) {
        const error = err as Error;

        setError(error.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchSongData();
  }, []);

  // TODO: add loading spinner
  if (isLoading) {
    return <div>Loading...</div>;
  }

  // TODO: add error message ui
  if (error) {
    return <div>{error}</div>;
  }

  if (!songData) {
    return <div>No data</div>;
  }

  return (
    <Layout>
      <Hero albums={songData.feed.entry} />
      <AlbumFeed albums={songData.feed.entry} />
    </Layout>
  );
}

export default App;
