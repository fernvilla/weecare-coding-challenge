import './styles/global.scss';
import { useState } from 'react';
import { AlbumEntry } from './interfaces/itunes-response';
import Layout from './components/layout/Layout';
import AlbumFeed from './components/albumFeed/AlbumFeed';
import Hero from './components/hero/Hero';
import AlbumDetailsModal from './components/albumDetailsModal/AlbumDetailsModal';
import LoadingIcon from './components/loadingIcon/LoadingIcon';
import { useAlbums } from './hooks/useAlbums';

function App() {
  const [selectedAlbum, setSelectedAlbum] = useState<AlbumEntry | null>(null);
  const { error: loadingAlbumsError, isLoading: isLoadingAlbums } = useAlbums();

  const handleAlbumSelect = (album: AlbumEntry) => {
    setSelectedAlbum(album);
  };

  if (isLoadingAlbums) {
    return (
      <Layout>
        <LoadingIcon />
      </Layout>
    );
  }

  if (loadingAlbumsError) {
    return (
      <Layout>
        Error:
        <pre className="text-center">{loadingAlbumsError}</pre>
      </Layout>
    );
  }

  return (
    <Layout>
      <Hero />
      <AlbumFeed onAlbumSelect={handleAlbumSelect} />
      {selectedAlbum && (
        <AlbumDetailsModal
          album={selectedAlbum}
          onClose={() => setSelectedAlbum(null)}
          show={!!selectedAlbum}
        />
      )}
    </Layout>
  );
}

export default App;
