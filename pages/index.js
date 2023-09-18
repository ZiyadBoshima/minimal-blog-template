import Head from 'next/head';
import Layout from '@components/layout';
import utilStyles from '@styles/utils.module.css';
import Link from 'next/link';
import Date from '@components/date';
import { getDocuments } from 'outstatic/server'

export async function getStaticProps() {
  const posts = getDocuments('posts', ['title', 'slug', 'publishedAt']);
  const projects = getDocuments('projects', ['title', 'description', 'link']);

  return {
    props: {
      posts,
      projects
    },
  };
}

export default function Home({ posts, projects }) {
  return (
    <Layout home>
      <Head>
        <title>Minimal Blog</title>
      </Head>
      <section className={utilStyles.headingMd}>
        <h2 className={utilStyles.headingLg}>About Me</h2>
        <p className={utilStyles.paragraph}>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
        </p>
      </section>
      <section className={`${utilStyles.headingMd} ${utilStyles.padding1px}`}>
        <h2 className={utilStyles.headingLg}>Projects</h2>
        <ul className={utilStyles.list}>
          {projects.map(({ title, description, link }) => (
            <li className={utilStyles.listItem} key={title}>
              <Link  href={link} target="_blank">
                <div className={utilStyles.postLink}>
                    {title}
                    <br />
                    <small className={utilStyles.lightText}>
                      { description }
                    </small>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      </section>
      <section className={`${utilStyles.headingMd} ${utilStyles.padding1px}`}>
        <h2 className={utilStyles.headingLg}>Posts</h2>
        <ul className={utilStyles.list}>
          {posts.map(({ title, slug, publishedAt }) => (
            <li className={utilStyles.listItem} key={slug}>
              <Link  href={`/posts/${slug}`}>
                <div className={utilStyles.postLink}>
                    {title}
                    <br />
                    <small className={utilStyles.lightText}>
                      <Date dateString={publishedAt} />
                    </small>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      </section>
    </Layout>
  );
}