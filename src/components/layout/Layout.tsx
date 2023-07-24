import Favorites from '../favorites/Favorites';
import Footer from '../footer/Footer';
import Header from './../header/Header';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  return (
    <div className="relative">
      <Header />
      <main>{children}</main>
      <Footer />

      <Favorites />
    </div>
  );
};

export default Layout;
