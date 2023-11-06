import '@styles/globals.css';

import Navbar from '@components/common/Navbar';
import Provider from '@components/Provider';

export const metadata = {
  title: 'Highlights',
  description: 'Create Key Points For Your Call Recordings',
};

const RootLayout = ({ children }) => {
  return (
    <html lang="en">
      <body>
        <Provider>
          <div className="main">
            <div className="gradient" />
          </div>

          <main className="app">
            <Navbar />
            {children}
          </main>
        </Provider>
      </body>
    </html>
  );
};

export default RootLayout;
