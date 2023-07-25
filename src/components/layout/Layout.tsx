import Favorites from '../favorites/Favorites';
import Footer from '../footer/Footer';
import Header from './../header/Header';

import styles from './Layout.module.scss';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  return (
    <div className={styles.siteContent}>
      <Header />
      <main>{children}</main>
      <Footer />
      <Favorites />
    </div>
  );
};

export default Layout;
