import { motion } from 'framer-motion'
import { RiBookLine } from 'react-icons/ri'
import { useQuery } from '@tanstack/react-query'
import { childrenAnimation } from '@/lib/motion'
import { TimelineItem } from '@/components/elements'
import { WorkEducationProps } from '@/types'
import { getEducationBackground } from '@/sanity/sanity-utils'

const EducationTimeline = () => {
  const { data } = useQuery<WorkEducationProps[]>({
    queryKey: ['educationbackground'],
    queryFn: async () => await getEducationBackground()
  })

  if (!data) return null

  return (
    <div className='education-timeline'>
      <h4>
        <RiBookLine className='mr-2 inline-block text-primary' />
        Educational Qualification
      </h4>
      {data?.map((timeline, index) => (
        <motion.div
          initial='hidden'
          whileInView='visible'
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: 0.2 * index }}
          variants={childrenAnimation}
          className='timeline-wrap'
          key={timeline.id}
        >
          <TimelineItem timeline={timeline} />
        </motion.div>
      ))}
    </div>
  )
}

export default EducationTimeline
