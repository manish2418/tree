import '../styles/index.scss'
import NextAuthProvider from './context/NextAuthProvider';


export const metadata = {
  title: 'TREEDIGIT',
  description: 'Welcome to TREEDIGIT internal dashboard',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`inter.className`}>
        <NextAuthProvider>
          {children}
        </NextAuthProvider>
      </body>
    </html>
  );
}

