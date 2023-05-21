import type { getAllPostsDataProps } from '@/types'

const sortPostByDate = (a: { date: string }, b: { date: string }) => {
  return new Date(b.date).valueOf() - new Date(a.date).valueOf()
}

const filterPostsByPage = (arr: getAllPostsDataProps[], page: number, limit: number) => {
  return arr.slice(limit * page - limit, limit * page)
}

/* A function to create a slug making the text from (this is text) => (this-is-text) */
const createSlug = (txt: string) =>
  txt
    ?.replace(/[^A-Za-z0-9أ-ي -]/g, '') // remove invalid chars
    ?.replace(/\s+/g, '-') // collapse whitespace and replace by -
    ?.replace(/-+/g, '-') // collapse dashes replace with one dash
    ?.toLowerCase() //

/* A function to remove all dashes */
const removeSlug = (txt: string) => txt?.replace(/-/g, ' ')

export { sortPostByDate, filterPostsByPage, createSlug, removeSlug }
