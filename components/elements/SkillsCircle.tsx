import { imageLoader, shimmer, toBase64 } from '@/lib/utils'
import type { skillsProps } from '@/types'
import Image from 'next/image'

const SkillsCircle = ({ skill: { title, skills } }: { skill: skillsProps }) => {
  return (
    <div className='circleprogress card hovercard relative p-4 text-center md:p-5'>
      <div className='relative mb-5 text-primary grid grid-cols-2 grid-rows-2 gap-4'>
        {skills?.map(({ label, image, _key }) => (
          <div
            key={_key}
            className='flex justify-center items-center rounded-xl card skillbg hovercard relative p-4 md:p-5'
          >
            <Image
              unoptimized={true}
              loader={imageLoader}
              src={`/images/skills/${image}`}
              height={100}
              width={100}
              alt={label}
              className='w-24 h-24 object-contain'
              placeholder='blur'
              blurDataURL={`data:image/svg+xml;base64,${toBase64(shimmer(100, 100))}`}
              draggable={false}
            />
          </div>
        ))}
      </div>
      <h5>{title}</h5>
    </div>
  )
}

export default SkillsCircle
