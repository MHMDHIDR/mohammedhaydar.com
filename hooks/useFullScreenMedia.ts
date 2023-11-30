import { useEffect } from 'react'

const useFullScreenMedia = () => {
  let fullScreenMedia: HTMLImageElement | HTMLVideoElement
  useEffect(() => {
    const handleMediaClick = (event: { target: any }) => {
      const media = event.target

      // Check if the clicked media is inside the 'post-body' class
      if (media.closest('.post-body')) {
        const overlay = document.createElement('div')
        overlay.className = 'full-screen-overlay'

        const closeBtn = document.createElement('span')
        closeBtn.className = 'close-button'
        closeBtn.innerHTML = '&times;'
        closeBtn.title = 'Close Media'
        closeBtn.addEventListener('click', () => {
          document.body.removeChild(overlay)
          document.documentElement.style.overflow = 'auto' // Enable scrolling
        })

        if (media.tagName === 'IMG') {
          fullScreenMedia = document.createElement('img')
          fullScreenMedia.className = 'full-screen-media'
          fullScreenMedia.src = media.src
          fullScreenMedia.alt = media.alt
        } else if (media.tagName === 'VIDEO') {
          fullScreenMedia = document.createElement('video')
          fullScreenMedia.className = 'full-screen-media'

          // Check if the video has source elements
          const sourceElements = media.querySelectorAll('source')
          if (sourceElements.length > 0) {
            sourceElements.forEach((source: HTMLSourceElement) => {
              const sourceElement = document.createElement('source')
              sourceElement.src = source.src
              sourceElement.type = source.type
              fullScreenMedia.appendChild(sourceElement)
            })
          } else {
            throw new Error('Invalid media element')
          }

          if (fullScreenMedia instanceof HTMLVideoElement) {
            fullScreenMedia.controls = true
            fullScreenMedia.autoplay = true
          }
        }

        if (fullScreenMedia) {
          overlay.appendChild(fullScreenMedia)
          overlay.appendChild(closeBtn)
          document.body.appendChild(overlay)
        } else {
          throw new Error('Invalid media element')
        }

        document.documentElement.style.overflow = 'hidden' // Disable scrolling
        document.addEventListener('keydown', handleKeyPress)
      }
    }

    const handleKeyPress = (event: { key: string }) => {
      if (event.key === 'Escape') {
        const overlay = document.querySelector('.full-screen-overlay')
        if (overlay) {
          document.body.removeChild(overlay)
          document.documentElement.style.overflow = 'auto' // Enable scrolling
          document.removeEventListener('keydown', handleKeyPress)
        }
      }
    }

    const mediaElements = document.querySelectorAll('.post-body img, .post-body video')
    mediaElements.forEach(media => {
      media.addEventListener('click', handleMediaClick)
    })

    return () => {
      mediaElements.forEach(media => {
        media.removeEventListener('click', handleMediaClick)
      })
    }
  }, [])
}

export default useFullScreenMedia
