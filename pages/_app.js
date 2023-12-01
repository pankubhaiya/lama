// pages/_app.js
import { EmailProvider } from '../context/EmailContext';
import '../styles/global.css';
// _app.js or _app.tsx
import '@fortawesome/fontawesome-free/css/all.css';
// import { GlobalProvider } from '../../context/GlobalContext';

function MyApp({ Component, pageProps }) {
  return (
  <EmailProvider>
   <Component {...pageProps} />;
  </EmailProvider>
  )
}

export default MyApp;
