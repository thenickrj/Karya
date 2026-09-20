// pages/_app.js
import "../app/globals.css"; // Adjust path relative to where globals.css lives

export default function MyApp({ Component, pageProps }) {
  return <Component {...pageProps} />;
}
