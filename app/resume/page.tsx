'use client'

import PageLayout from '@/components/PageLayout'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import {
  BriefcaseBusiness,
  Calendar,
  Code2,
  Download,
  GraduationCap,
  User,
} from 'lucide-react'
import { motion } from 'motion/react'
import { useRouter, useSearchParams } from 'next/navigation'

const tabMenu = [
  { title: 'Education', value: 'education', icon: GraduationCap },
  { title: 'Skills', value: 'skills', icon: Code2 },
  { title: 'About me', value: 'about', icon: User },
  { title: 'View CV', value: 'cv', icon: BriefcaseBusiness },
]
const tabContent = {
  education: {
    title: 'Educational Background',
    items: [
      {
        degree: 'Master of Computer Science',
        institution: 'University of Warwick',
        period: '2025 - 2026',
        description: 'Specializing in Software Engineering and Artificial Intelligence',
        achievements: ['4.0 GPA', 'Research Publication'],
      },
      {
        degree: 'Bachelor of Science in Information Technology',
        institution: 'Middlesex University London',
        period: '2023 - 2024',
        description:
          'Specialized in developing a high-quality web applications and mobile platforms.',
        achievements: ['First Class Honours'],
      },
    ],
  },
  skills: {
    title: 'Technical Skills',
    categories: [
      {
        name: 'Frontend Development',
        description:
          'Developing and maintaining web applications using modern JavaScript frameworks, including React, Next.js, and TypeScript.',
        skills: ['React', 'Next.js', 'TypeScript', 'Tailwind CSS', 'Framer Motion'],
      },
      {
        name: 'Backend Development',
        description:
          'Specializing in building robust and scalable backend systems using Node.js, Express, and Nest.js.',
        skills: ['Node.js', 'Express', 'Nest.js', 'PostgreSQL', 'MongoDB'],
      },
      {
        name: 'Tools & Others',
        description:
          'Proficient in version control using Git and Docker. Experienced in cloud platforms like AWS. Skilled in Agile methodologies and CI/CD pipelines.',
        skills: ['Git', 'Docker', 'AWS', 'CI/CD', 'Agile Methodologies'],
      },
    ],
  },
  about: {
    title: 'About Me',
    bio: 'Passionate Software Engineer with over 5 years of experience in building modern web applications. Committed to writing clean, maintainable code and staying current with emerging technologies. Strong advocate for user-friendly design and accessibility.',
    interests: [
      'Open Source Contributing',
      'Tech Blogging',
      'UI/UX Design',
      'Machine Learning',
    ],
    languages: ['English (Proffessional)', 'Arabic (Native)'],
  },
}
export default function ResumePage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const currentTab = searchParams.get('tab') || 'education'

  function handleTabChange(value: string) {
    router.push(`/resume?tab=${value}`)
  }

  async function saveFile() {
    const fileName = 'cv.pdf'
    const response = await fetch(`/${fileName}`)
    const blob = await response.blob()
    const url = window.URL.createObjectURL(blob)

    const fileURLToPath = document.createElement('a')
    fileURLToPath.href = url
    fileURLToPath.download = fileName
    fileURLToPath.click()

    window.URL.revokeObjectURL(url)
  }

  return (
    <div className='flex flex-col justify-center py-10'>
      <PageLayout>
        <Tabs
          value={currentTab}
          onValueChange={handleTabChange}
          className='w-full flex flex-col md:flex-row gap-6 md:gap-10'
        >
          <TabsList className='flex-col h-full bg-transparent md:w-64 gap-4'>
            {tabMenu?.map(item => (
              <TabsTrigger
                key={item?.value}
                value={item?.value}
                className='bg-white/10 w-full py-2.5 text-white data-[state=active]:bg-hoverColor hover:bg-lightSky/50 text-xs sm:text-sm'
              >
                <div className='flex items-center gap-1.5 md:w-[50%] md:gap-3'>
                  <item.icon className='w-4 h-4 md:h-5 md:w-5' />
                  {item?.title}
                </div>
              </TabsTrigger>
            ))}
          </TabsList>
          <div className='flex-1 min-h-[400px]'>
            <TabsContent value='education'>
              <motion.h2
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className='text-xl font-bold mb-6 text-lightSky'
              >
                {tabContent.education.title}
              </motion.h2>
              <div className='space-y-6'>
                {tabContent?.education?.items.map((item, index) => (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    key={index}
                    className='border rounded-lg border-lightSky/20 p-6'
                  >
                    <div className='flex items-start justify-between mb-4'>
                      <div>
                        <h3 className='text-lg font-semibold'>{item?.degree}</h3>
                        <p className=' text-muted-foreground'>{item?.institution}</p>
                      </div>
                      <div className='flex items-center text-muted-foreground'>
                        <Calendar className='h-4 w-4 mr-2' />
                        {item?.period}
                      </div>
                    </div>
                    <p className='mb-4 text-white'>{item?.description}</p>
                    <div className='flex flex-wrap gap-2'>
                      {item.achievements.map((achievement, i) => (
                        <Badge key={i} variant='secondary'>
                          {achievement}
                        </Badge>
                      ))}
                    </div>
                  </motion.div>
                ))}
              </div>
            </TabsContent>
            <TabsContent value='skills'>
              <motion.h2
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className='text-xl font-bold mb-6 text-lightSky'
              >
                {tabContent.skills.title}
              </motion.h2>
              <div className='space-y-6'>
                {tabContent?.skills?.categories.map((item, index) => (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    key={index}
                    className='border rounded-lg border-lightSky/20 p-6'
                  >
                    <div className='flex items-start justify-between mb-4'>
                      <div>
                        <h3 className='text-lg font-semibold'>{item?.name}</h3>
                        <p className=' text-muted-foreground'>{item?.description}</p>
                      </div>
                    </div>

                    <div className='flex flex-wrap gap-2'>
                      {item.skills.map((skill, i) => (
                        <Badge key={i} variant='secondary'>
                          {skill}
                        </Badge>
                      ))}
                    </div>
                  </motion.div>
                ))}
              </div>
            </TabsContent>
            <TabsContent value='about'>
              <motion.h2
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className='text-xl font-bold mb-6 text-lightSky'
              >
                {tabContent.about.title}
              </motion.h2>
              <div className='space-y-6'>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0 * 0.1 }}
                  className='border rounded-lg border-lightSky/20 p-6'
                >
                  <span className='text-white/90 mb-6 text-lg'>
                    {tabContent.about.bio}
                  </span>
                  <div className='space-y-4'>
                    <div>
                      <h3 className='text-lg font-semibold mb-2'>Interests</h3>
                      <div className='flex flex-wrap gap-2'>
                        {tabContent.about.interests.map((interest, i) => (
                          <Badge key={i} variant='secondary'>
                            {interest}
                          </Badge>
                        ))}
                      </div>
                    </div>
                    <div>
                      <h3 className='text-lg font-semibold mb-2'>Languages</h3>
                      <div className='flex flex-wrap gap-2'>
                        {tabContent.about.languages.map((language, i) => (
                          <Badge key={i} variant='secondary'>
                            {language}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </div>
                </motion.div>
              </div>
            </TabsContent>
            <TabsContent value='cv'>
              <Button
                className='text-xl font-bold px-0 mb-3 text-lightSky/85 hover:text-lightSky'
                variant={'link'}
                onClick={saveFile}
              >
                <Download className='w-4 h-4 mr-2' /> Download CV
              </Button>
              <div className='border rounded-lg border-lightSky/20 w-full max-w-full overflow-clip'>
                <object
                  data='/cv.pdf#zoom=100&view=Fit'
                  type='application/pdf'
                  className='w-full h-[80vh] min-h-[500px] max-h-[800px] bg-white'
                >
                  <p>
                    It appears you don't have a PDF plugin for this browser. You can
                    <Button
                      variant={'link'}
                      onClick={saveFile}
                      className='text-lightSky/85 hover:text-lightSky px-1'
                    >
                      download the PDF
                    </Button>
                    instead.
                  </p>
                </object>
              </div>
            </TabsContent>
          </div>
        </Tabs>
      </PageLayout>
    </div>
  )
}
