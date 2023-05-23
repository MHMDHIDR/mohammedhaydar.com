import type { getAllBlogsDataProps } from '@/types'

const sortPostByDate = (a: { date: string }, b: { date: string }) => {
  return new Date(b.date).valueOf() - new Date(a.date).valueOf()
}

const filterPostsByPage = (arr: getAllBlogsDataProps[], page: number, limit: number) => {
  return arr.slice(limit * page - limit, limit * page)
}

/* A function to create a slug making the text from (this is text) => (this-is-text) */
const createSlug = (txt: string) =>
  txt
    .toString()
    ?.replace(/[^A-Za-z0-9أ-ي -]/g, '') // remove invalid chars
    ?.replace(/\s+/g, '-') // collapse whitespace and replace by -
    ?.replace(/-+/g, '-') // collapse dashes replace with one dash
    ?.toLowerCase() // convert the whole text into lower case

/* A function to remove all dashes */
const removeSlug = (txt: string) => txt?.replace(/-/g, ' ')

/**
 *
 * @param text a function that returns text string to capitalize,
 *  (e.g: hey How arE YoU ThiS is TeXt => Hey How Are You This Is Text)
 * @returns string
 */
const capitalizeText = (text: string) => {
  return text.toLowerCase().replace(/(^|\s)\S/g, match => match.toUpperCase())
}

export { sortPostByDate, filterPostsByPage, createSlug, removeSlug, capitalizeText }
