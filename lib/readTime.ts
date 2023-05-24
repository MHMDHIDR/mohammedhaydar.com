export const calculateReadTime = (article: string): number => {
  const wordsPerMinute = 200 // Adjust this value based on the average reading speed

  // Remove any leading or trailing whitespace from the article
  const trimmedArticle = article.trim()

  // Split the article into an array of words
  const words = trimmedArticle.split(/\s+/)

  // Calculate the read time by dividing the total number of words by words per minute
  const readTime = Math.ceil(words.length / wordsPerMinute)

  return readTime
}
