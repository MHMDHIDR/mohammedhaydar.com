'use client'
import { getFilters } from '@/sanity/sanity-utils'
import { ProjectFiltersProps } from '@/types'
import { motion } from 'framer-motion'
import { useEffect, useState } from 'react'
import { useQuery } from 'react-query'

interface PortfolioFiltersProps {
  currentFilter: string
  filterHandler: (filter: string) => void
}

const PortfolioFilters: React.FC<PortfolioFiltersProps> = ({
  currentFilter,
  filterHandler
}) => {
  const { data: filterData } = useQuery<ProjectFiltersProps[]>('filters', getFilters)
  const [tabs, setTabs] = useState<ProjectFiltersProps[]>([])

  const [activeTab, setActiveTab] = useState<string | null>(
    currentFilter === 'ALL' ? 'ALL' : null
  )

  useEffect(() => {
    if (filterData) {
      setTabs(filterData)
    }
  }, [filterData])

  useEffect(() => {
    if (filterData) {
      const allFilter: ProjectFiltersProps = {
        _id: 'ALL',
        title: 'ALL',
        value: 'ALL'
      }
      setTabs([allFilter, ...filterData])
    }
  }, [filterData])

  useEffect(() => {
    if (activeTab === null) {
      setActiveTab(currentFilter)
    }
  }, [currentFilter])

  if (!tabs) return null

  return (
    <div className='flex gap-4 justify-center flex-wrap'>
      {tabs.map(tab => (
        <button
          key={tab._id}
          className={`${
            activeTab === tab._id ? '' : 'hover:text-blue-600'
          } relative rounded-full px-3 py-1.5 max-w-fit min-w-fit text-sm font-medium text-white outline-sky-400 transition focus-visible:outline-2 ${
            currentFilter === tab.value
              ? 'before:invisible'
              : 'btn-transparent text-blue-400 hover:text-white'
          }`}
          style={{
            WebkitTapHighlightColor: 'transparent'
          }}
          onClick={() => {
            setActiveTab(tab._id)
            filterHandler(tab._id)
          }}
        >
          {activeTab === tab._id && (
            <motion.span
              layoutId='bubble'
              className='absolute inset-0 z-10 bg-white mix-blend-difference'
              style={{ borderRadius: 9999 }}
              transition={{ type: 'spring', bounce: 0.2, duration: 0.6 }}
            />
          )}
          {tab.title}
        </button>
      ))}
    </div>
  )
}

export default PortfolioFilters
