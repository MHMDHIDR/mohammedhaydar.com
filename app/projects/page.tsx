'use client'

import PageLayout from '@/components/PageLayout'
import ProjectsCarousel from '@/components/ProjectsCarousel'

export default function Project() {
  return (
    <div className='py-8'>
      <PageLayout>
        <ProjectsCarousel orientation='vertical' />
      </PageLayout>
    </div>
  )
}
