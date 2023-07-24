import './styles/global.scss';
import { useState } from 'react';
import { Entry } from './interfaces/itunes-response';
import Layout from './components/layout/Layout';
import AlbumFeed from './components/albumFeed/AlbumFeed';
import Hero from './components/hero/Hero';
import AlbumDetailsModal from './components/albumDetailsModal/AlbumDetailsModal';
import LoadingIcon from './components/loadingIcon/LoadingIcon';
import FavoritesProvider from './context/favoritesContext';
import AlbumsProvider from './context/albumsContext';
import { useAlbums } from './hooks/useAlbums';

function App() {
  const [selectedAlbum, setSelectedAlbum] = useState<Entry | null>(null);
  const { error: loadingAlbumsError, isLoading: isLoadingAlbums } = useAlbums();

  const handleAlbumSelect = (album: Entry) => {
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
    <AlbumsProvider>
      <FavoritesProvider>
        <>
          <Layout>
            <Hero />
            <AlbumFeed onAlbumSelect={handleAlbumSelect} />

            {selectedAlbum && (
              <AlbumDetailsModal album={selectedAlbum} onClose={() => setSelectedAlbum(null)} show={!!selectedAlbum} />
            )}
          </Layout>
        </>
      </FavoritesProvider>
    </AlbumsProvider>
  );
}

export default App;
