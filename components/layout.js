import Head from 'next/head';
import styles from './layout.module.css';
import Link from 'next/link';
import { GitHub, Mail, Home } from 'react-feather';

export const siteTitle = `Minimal Blog Website`;

export default function Layout({ children, home }) {
  return (
    <div className={styles.container}>
      <Head>
        <link rel="icon" href="/favicon.ico" />
        <meta
          name="description"
          content={siteTitle}
        />
        <meta
          property="og:image"
          content={`https://og-image.vercel.app/${encodeURI(
            siteTitle,
          )}.png?theme=light&md=0&fontSize=75px&images=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Ffront%2Fassets%2Fdesign%2Fnextjs-black-logo.svg`}
        />
        <meta name="og:title" content={siteTitle} />
      </Head>
      <nav className={styles.nav}>
        <p className={styles.navName}>Name</p>
        <ul className={styles.navLinks}>
        {!home && (
         <li><Link href="/" className={styles.navLink}><Home size={30}/></Link></li>
        )}
         <li><Link href="https://github.com/" target="_blank" className={styles.navLink}><GitHub size={30}/></Link></li>
         <li><Link href="/" className={styles.navLink}><Mail size={30}/></Link></li>
        </ul>
      </nav>
      <main>{children}</main>
      {!home && (
        <div className={styles.backToHome}>
          <Link href="/">← Back to home</Link>
        </div>
      )}
    </div>
  );
}