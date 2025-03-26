import Head from 'next/head'
import AllPosts from '../../components/posts/all-posts'
import { getAllPosts } from '../../lib/posts-util'

export default function AllPostsPage(props) {
  return (
    <>
      <Head>
        <title>All Ghaith's Posts</title>
        <meta name="description" content="Discover all Ghaith's Posts " />
      </Head>
      <AllPosts posts={props.posts} />
    </>
  )
}

export function getStaticProps() {
  const allPosts = getAllPosts()

  return {
    props: {
      posts: allPosts,
    },
  }
}
