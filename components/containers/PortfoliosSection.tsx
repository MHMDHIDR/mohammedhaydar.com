'use client'
import { motion } from 'framer-motion'
import { useCallback, useEffect, useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import { Portfolio } from '@/components/elements'
import { PortfolioFilters } from '@/components/utils'
import type { Project, ProjectFiltersProps } from '@/types'
import { getProjects } from '@/sanity/sanity-utils'
import { PROJECTS_COUNT } from '@/constants'

const PortfoliosSection = () => {
  const [visibleProjects, setVisibleProjects] = useState<Project[] | null>(null)
  const [currentFilter, setCurrentFilter] = useState('ALL')
  const [pageNumber, setPageNumber] = useState(1)
  const [allProjectsLoaded, setAllProjectsLoaded] = useState(false) // New state variable

  const { data: projects } = useQuery(['projects'], getProjects)

  useEffect(() => {
    if (projects) {
      const slicedProjects = projects.slice(0, pageNumber * PROJECTS_COUNT)
      setVisibleProjects(slicedProjects)
      setAllProjectsLoaded(slicedProjects.length === projects.length)
    }
  }, [projects, pageNumber])

  const handleFilter = useCallback((_id: ProjectFiltersProps['_id']) => {
    setCurrentFilter(_id)
    setPageNumber(1)
    setAllProjectsLoaded(false) // Reset allProjectsLoaded when a new filter is selected
  }, [])

  useEffect(() => {
    if (projects && visibleProjects) {
      const slicedProjects = projects.slice(0, pageNumber * PROJECTS_COUNT)
      setVisibleProjects(slicedProjects)
      setAllProjectsLoaded(slicedProjects.length === projects.length)
    }
  }, [projects, pageNumber])

  if (projects && projects.length === 0) return null

  return (
    <>
      <PortfolioFilters currentFilter={currentFilter} filterHandler={handleFilter} />
      <motion.div layout className='mt-12 grid grid-cols-6 gap-7'>
        {visibleProjects?.map(project => {
          if (!project) {
            return null
          }

          if (
            currentFilter !== 'ALL' &&
            !project.filter.some(filter => filter._ref === currentFilter)
          ) {
            return null
          }

          return (
            <motion.div
              layout
              exit={{ scale: 0 }}
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{
                duration: 0.4
              }}
              className='col-span-6 sm:col-span-3 lg:col-span-2'
              key={project._id}
            >
              <Portfolio portfolio={project} />
            </motion.div>
          )
        })}
      </motion.div>
      {visibleProjects && !allProjectsLoaded && (
        <div className='mt-12 text-center'>
          <button
            className='btn btn-small text-white hover:text-blue-900'
            onClick={() => setPageNumber(prevNumber => prevNumber + 1)}
          >
            <span>Load More</span>
          </button>
        </div>
      )}
    </>
  )
}

export default PortfoliosSection
