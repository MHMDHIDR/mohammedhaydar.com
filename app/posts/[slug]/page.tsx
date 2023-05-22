import { Layout } from '@/components/layout'
import PostPreview from '@/components/posts/PostPreview'
import getPostMetadata from '@/components/posts/getPostMetadata'

const Posts = () => {
  const postMetadata = getPostMetadata()
  const postPreviews = postMetadata.map(post => <PostPreview key={post.slug} {...post} />)

  return <Layout>{postPreviews}</Layout>
}

export default Posts
