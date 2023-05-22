import PostPreview from '@/components/posts/PostPreview'
import getPostMetadata from '@/components/posts/getPostMetadata'

const Posts = () => {
  const postMetadata = getPostMetadata()
  const postPreviews = postMetadata.map(post => <PostPreview key={post.slug} {...post} />)

  return <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>{postPreviews}</div>
}

export default Posts
