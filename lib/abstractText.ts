export const abstractText = (txt: string, txtLength: number) => {
  return txt?.length > txtLength ? txt.slice(0, txtLength) + '...' : txt
}

export const abstractSentence = (txt: string, wordLimit: number) => {
  const words = txt.trim().split(/\s+/)
  const abstractedText = words.slice(0, wordLimit).join(' ')
  return abstractedText
}
