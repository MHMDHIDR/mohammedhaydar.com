import { http } from './http'
import type { skillsProps, ReviewsProps } from '@/types'

const getLanguageskills = async () => {
  const { data }: { data: skillsProps[] } = await http.get(`/languageskills.json`)
  return data
}

const getClientReviews = async () => {
  const { data }: { data: ReviewsProps['review'][] } = await http.get(
    `/clientsreview.json`
  )
  return data
}

export { getLanguageskills, getClientReviews }
