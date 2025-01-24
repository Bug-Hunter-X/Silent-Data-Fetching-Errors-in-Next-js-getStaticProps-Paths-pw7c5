```javascript
// pages/blog/[slug].js
export async function getStaticPaths() {
  try {
    const paths = await fetch('/api/posts').then(res => res.json());
    return {
      paths,
      fallback: false,
    };
  } catch (error) {
    console.error('Error fetching paths:', error);
    // Handle the error appropriately (e.g., return an empty array, display a fallback page)
    return {
      paths: [],
      fallback: true, // Or false, depending on your strategy
    };
  }
}

export async function getStaticProps({ params }) {
  try {
    const post = await fetch(`/api/posts/${params.slug}`).then(res => res.json());
    return { props: { post } };
  } catch (error) {
    console.error('Error fetching post:', error);
    return {
      props: {
        error: 'Failed to load post',
      },
    };
  }
}

function BlogPost({ post, error }) {
  if (error) {
    return <div>Error: {error}</div>;
  }
  return <div>{post.title}</div>;
}
export default BlogPost;
```