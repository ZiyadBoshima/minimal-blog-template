import Layout from '@components/layout';
import Date from '@components/date';
import Head from 'next/head';
import utilStyles from '@styles/utils.module.css';
import { getDocumentSlugs, getDocumentPaths, getDocumentBySlug } from 'outstatic/server'
import Image from 'next/image';

import { unified } from 'unified'
import remarkParse from 'remark-parse'
import remarkRehype from 'remark-rehype'
import rehypeFormat from 'rehype-format'
import rehypeStringify from 'rehype-stringify'
import remarkPrism from 'remark-prism'
import rehypeRaw from 'rehype-raw'

export async function generateStaticParams() {
    const posts = getDocumentSlugs('posts')
    return posts.map((slug) => ({ slug }))
  }
  
// /pages
export async function getStaticPaths() {
return {
    paths: getDocumentPaths('posts'),
    fallback: false
}
}

export async function getStaticProps({ params }) {
    const post = getDocumentBySlug('posts', params.slug, [
    'title',
    'publishedAt',
    'slug',
    'author',
    'content',
    'coverImage'
    ])

    const processedContent = await unified()
    .use(remarkParse)
    .use(remarkPrism)
    .use(remarkRehype, { allowDangerousHtml: true })
    .use(rehypeRaw)
    .use(rehypeFormat)
    .use(rehypeStringify)
    .process(post.content)
    const content = processedContent.toString();

    return {
    props: {
    post: {
        ...post,
        content
    }
    }
    }
}

export default function Post({ post }) {
    return (
      <Layout>
        <Head>
            <title>{post.title}</title>
        </Head>
        <article>
            <h1 className={utilStyles.headingXl}>{post.title}</h1>
            <div className={utilStyles.lightText}>
                <Date dateString={post.publishedAt} />
            </div>
            <div className={utilStyles.coverImage}>
                <Image
                src={post.coverImage}
                fill={true}
                objectFit='cover'
                alt="Cover Image"
                />
            </div>
            <div className={utilStyles.content} dangerouslySetInnerHTML={{ __html: post.content }} />
        </article>
      </Layout>
    );
}