import { motion } from 'framer-motion'
import { useQuery } from '@tanstack/react-query'
import { childrenAnimation } from '@/lib/motion'
import { SkillsCircle } from '@/components/elements'
import { skillsProps } from '@/types'
import { getTechskills } from '@/sanity/sanity-utils'

const TechSkills = () => {
  const { data } = useQuery<skillsProps[]>(['skills'], getTechskills)

  if (!data) return null

  return (
    <div className='grid grid-cols-4 gap-7'>
      {data?.map((skill, index) => (
        <motion.div
          initial='hidden'
          whileInView='visible'
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: 0.2 * index }}
          variants={childrenAnimation}
          className='col-span-4 sm:col-span-2 lg:col-span-1'
          key={skill.id}
        >
          <SkillsCircle skill={skill} />
        </motion.div>
      ))}
    </div>
  )
}

export default TechSkills
