import Head from 'next/head';
import Navbar from './Navbar';
import Footer from './Footer';
import { getFavorites, getSheets } from '../../service/queryFns';
import { useQueries } from 'react-query';

export const siteTitle = 'Keybound';

export default function Layout({
  children,
  home,
}: {
  children: React.ReactNode;
  home?: boolean;
}) {
  // calling useQuery(ies) here SHOULD cache api data on mount
  // for any page to access
  useQueries([
    { queryKey: 'sheets', queryFn: getSheets },
    { queryKey: 'favorites', queryFn: getFavorites },
  ]);
  return (
    <div>
      <Head>
        <link rel="icon" href="/favicon.ico" />
        <meta
          name="description"
          content="Keybound lets users make custom cheat sheets full of shortcuts for study and easy reference. We currently support VS Code but plan to add more resources."
        />
        <meta property="og:site_name" content={siteTitle} key="ogsitename" />
        <meta name="og:title" content={siteTitle} key="ogtitle" />
        <meta
          property="og:description"
          content={
            'Keybound lets users make custom cheat sheets full of shortcuts for study and easy reference. We currently support VS Code but plan to add more resources.'
          }
          key="ogdesc"
        />
        <meta
          property="og:image"
          content={`https://live.staticflickr.com/65535/51201558969_098f1a86c7_z.jpg`}
          key="ogimage"
        />
        <meta
          property="og:url"
          content={'https://keybound.vercel.app/'}
          key="ogurl"
        />
        <meta name="twitter:card" content="summary_large_image" />
      </Head>
      <div className="flex flex-col min-h-screen ">
        <Navbar />
        <header></header>
        <main className="flex-grow">{children}</main>
        <Footer />
      </div>
    </div>
  );
}
