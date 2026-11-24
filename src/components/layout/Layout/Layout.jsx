import { Outlet } from 'react-router';
import SkipLink from '../../ui/SkipLink/SkipLink';
import Footer from '../Footer/Footer';
import Header from '../Header/Header';

/** Shell shared by every route: skip link, header, page content, footer. */
export default function Layout() {
  return (
    <>
      <SkipLink targetId="main" />
      <Header />
      <main id="main" tabIndex={-1}>
        <Outlet />
      </main>
      <Footer />
    </>
  );
}
