import {getPosts} from '../services'
import { PostCard, Categories, PostWidget } from '../components'
import { FeaturedPosts } from '../sections'
export default function Home({posts}) {

  // number of posts that show up on the Home page 
  const numberOfPosts = 20
  
  return (
    <div className="container mx-auto px-10 mb-8">
      <FeaturedPosts/>
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
        <div className="lg:col-span-8 col-span-1">
          
          {posts.slice(0, numberOfPosts).map((post, index) => (
            <PostCard key={index} post={post.node} />
          ))}
        </div>
        <div className="lg:col-span-4 col-span-1">
          <div className="lg:sticky relative top-8">
            <PostWidget />
            <Categories />
          </div>
        </div>
      </div>
    </div>
  );
}

// Fetch the posts with GraphQL
export async function getStaticProps() {
    const posts = (await getPosts()) || []

    return {
        props: {posts}
    }
}