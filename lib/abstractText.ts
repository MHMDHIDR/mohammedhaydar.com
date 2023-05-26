/**
 *
 * @param txt Takes a txt of type string
 * @param txtLength Takes a txtLength of type number
 * @returns Returns a string of how many txtLength in character I limit
 */
export const abstractText = (txt: string, txtLength: number) => {
  return txt?.length > txtLength ? txt.slice(0, txtLength) + '...' : txt
}

/**
 *
 * @param txt Takes a txt of type string
 * @param wordLimit Takes a wordLimit of type number
 * @returns Returns a string of how many wordLimit I set as a limit
 */
export const abstractSentence = (txt: string, wordLimit: number) => {
  const words = txt.trim().split(/\s+/)
  const abstractedText = words.slice(0, wordLimit).join(' ')
  return abstractedText
}
