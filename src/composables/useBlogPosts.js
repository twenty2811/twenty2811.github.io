const requirePost = require.context('../blogs', false, /\.md$/)

export function useBlogPosts() {
  const posts = requirePost.keys().map(fileName => {
    const slug = fileName.replace(/^\.\/|\.md$/g, '')
    const title = slug
      .split('-')
      .map(w => w[0].toUpperCase() + w.slice(1))
      .join(' ')
    const content = requirePost(fileName).default || requirePost(fileName)

    return {
      slug,
      title,
      content,
    }
  })

  return posts
}
