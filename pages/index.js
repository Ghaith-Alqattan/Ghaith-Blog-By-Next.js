import Head from 'next/head'
import FeaturedPosts from '../components/home-page/featured-posts'
import Hero from '../components/home-page/hero'
import { getFeaturedPosts } from '../lib/posts-util'

const DUMMY_DATA = [
  {
    slug: 'getting-started1',
    title: 'getting started with Next1',
    image: 'getting-started-nextjs.png',
    excerpt: 'Next js is Nice',
    date: '2022-02-10',
  },
  {
    slug: 'getting-started2',
    title: 'getting started with Next2',
    image: 'getting-started-nextjs.png',
    excerpt: 'Next js is Nice',
    date: '2022-02-10',
  },
  {
    slug: 'getting-started3',
    title: 'getting started with Next3',
    image: 'getting-started-nextjs.png',
    excerpt: 'Next js is Nice',
    date: '2022-02-10',
  },
]

export default function HomePage(props) {
  return (
    <>
      <Head>
        <title>Ghaith's Blog</title>
        <meta
          name="description"
          content="I post About Programming and Web Development"
        />
      </Head>
      <Hero />
      <FeaturedPosts posts={props.posts} />
    </>
  )
}

export function getStaticProps() {
  const featuredPosts = getFeaturedPosts()
  return {
    props: {
      posts: featuredPosts,
    },
  }
}
