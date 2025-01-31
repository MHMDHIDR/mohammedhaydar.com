'use client'

import PageLayout from '@/components/PageLayout'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Calendar, Code2, GraduationCap, User } from 'lucide-react'
import { motion } from 'motion/react'
import { Badge } from '@/components/ui/badge'
import { useRouter, useSearchParams } from 'next/navigation'

const tabMenu = [
  // { title: 'Experience', value: 'experience', icon: Briefcase },
  { title: 'Education', value: 'education', icon: GraduationCap },
  { title: 'Skills', value: 'skills', icon: Code2 },
  { title: 'About me', value: 'about', icon: User },
]
const tabContent = {
  // experience: {
  //   title: 'Professional Experience',
  //   items: [
  //     {
  //       role: 'Senior Frontend Developer',
  //       company: 'Tech Solutions Inc.',
  //       period: '2021 - Present',
  //       description:
  //         'Led the development of multiple React-based web applications, improving performance by 40%. Mentored junior developers and implemented best practices for code quality.',
  //       highlights: ['React', 'Next.js', 'TypeScript', 'Team Leadership'],
  //     },
  //     {
  //       role: 'Full Stack Developer',
  //       company: 'Digital Innovations Ltd',
  //       period: '2018 - 2021',
  //       description:
  //         'Developed and maintained full-stack applications using modern JavaScript frameworks. Collaborated with cross-functional teams to deliver high-quality solutions.',
  //       highlights: ['Node.js', 'React', 'MongoDB', 'AWS'],
  //     },
  //   ],
  // },
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
        institution: 'State University',
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

  const handleTabChange = (value: string) => {
    router.push(`/resume?tab=${value}`)
  }

  return (
    <div className='flex flex-col justify-center py-10'>
      <PageLayout>
        <Tabs
          value={currentTab}
          onValueChange={handleTabChange}
          className='w-full flex flex-col md:flex-row gap-6 md:gap-10'
        >
          <TabsList className='flex md:flex-col h-full bg-transparent md:w-64 gap-4'>
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
            {/* <TabsContent value='experience'>
              <motion.h2
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className='text-2xl font-bold mb-6 text-lightSky'
              >
                {tabContent.experience.title}
              </motion.h2>
              <div className='space-y-6'>
                {tabContent?.experience?.items.map((item, index) => (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    key={index}
                    className='border rounded-lg border-lightSky/20 p-6'
                  >
                    <div className='flex items-start justify-between mb-4'>
                      <div>
                        <h3 className='text-lg font-semibold'>{item?.role}</h3>
                        <p className=' text-muted-foreground'>{item?.company}</p>
                      </div>
                      <div className='flex items-center text-muted-foreground'>
                        <Calendar className='h-4 w-4 mr-2' />
                        {item?.period}
                      </div>
                    </div>
                    <p className='mb-4 text-white'>{item?.description}</p>
                    <div className='flex flex-wrap gap-2'>
                      {item.highlights.map((highlight, i) => (
                        <Badge key={i} variant='secondary'>
                          {highlight}
                        </Badge>
                      ))}
                    </div>
                  </motion.div>
                ))}
              </div>
            </TabsContent> */}
            <TabsContent value='education'>
              <motion.h2
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className='text-2xl font-bold mb-6 text-lightSky'
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
                className='text-2xl font-bold mb-6 text-lightSky'
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
                className='text-2xl font-bold mb-6 text-lightSky'
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
          </div>
        </Tabs>
      </PageLayout>
    </div>
  )
}
