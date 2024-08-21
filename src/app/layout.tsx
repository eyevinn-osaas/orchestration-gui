import { Toaster } from 'react-hot-toast';
import DefaultLayout from '../components/layout/DefaultLayout';
import './globals.css';

export default async function RootLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang={process.env.UI_LANG || 'en'}>
      <body className="bg-background">
        <Toaster
          position="bottom-right"
          toastOptions={{
            error: {
              style: {
                background: '#52525b',
                color: 'white'
              }
            }
          }}
        />
        <DefaultLayout>{children}</DefaultLayout>
      </body>
    </html>
  );
}
