import { motion } from 'framer-motion'
import { useQuery } from '@tanstack/react-query'
import { childrenAnimation } from '@/lib/motion'
import { Service } from '@/components/elements'
import { servicesProps } from '@/types'
import { getServices } from '@/sanity/sanity-utils'

const ServicesSection = () => {
  const { data } = useQuery<servicesProps[]>({
    queryKey: ['services'],
    queryFn: async () => await getServices()
  })

  if (!data) return null

  return (
    <div className='services-wrapper grid grid-cols-3 gap-7'>
      {data?.map((service, index) => (
        <motion.div
          initial='hidden'
          whileInView='visible'
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: 0.2 * index }}
          variants={childrenAnimation}
          className='col-span-3 lg:col-span-1'
          key={service.id}
        >
          <Service service={service} />
        </motion.div>
      ))}
    </div>
  )
}

export default ServicesSection
