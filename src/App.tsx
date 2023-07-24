import './styles/global.scss';
import { useEffect, useState } from 'react';
import { Entry, ItunesResponse } from './interfaces/itunes-response';
import Layout from './components/layout/Layout';
import AlbumFeed from './components/albumFeed/AlbumFeed';
import Hero from './components/hero/Hero';
import AlbumDetailsModal from './components/albumDetailsModal/AlbumDetailsModal';
import LoadingIcon from './components/loadingIcon/LoadingIcon';
import FavoritesProvider from './context/favoritesContext';

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [songData, setSongData] = useState<Entry[]>([]);
  const [selectedAlbum, setSelectedAlbum] = useState<Entry | null>(null);

  useEffect(() => {
    const fetchSongData = async () => {
      try {
        const res = await fetch('https://itunes.apple.com/us/rss/topalbums/limit=100/json');
        const data = (await res.json()) as ItunesResponse;

        setSongData(data.feed.entry);
      } catch (err: unknown) {
        const error = err as Error;

        setError(error.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchSongData();
  }, []);

  const handleAlbumSelect = (album: Entry) => {
    setSelectedAlbum(album);
  };

  if (isLoading) {
    return (
      <Layout>
        <LoadingIcon />
      </Layout>
    );
  }

  if (error) {
    return (
      <Layout>
        Error:
        <pre className="text-center">{error}</pre>
      </Layout>
    );
  }

  if (!songData) {
    return (
      <Layout>
        <div className="text-center">No data</div>
      </Layout>
    );
  }

  return (
    <FavoritesProvider>
      <>
        <Layout>
          <Hero albums={songData} />
          <AlbumFeed albums={songData} onAlbumSelect={handleAlbumSelect} />
          {selectedAlbum && (
            <AlbumDetailsModal album={selectedAlbum} onClose={() => setSelectedAlbum(null)} show={!!selectedAlbum} />
          )}
        </Layout>
      </>
    </FavoritesProvider>
  );
}

export default App;
