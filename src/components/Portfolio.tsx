import { useState } from "react";
import FsLightbox from "fslightbox-react";
import { ExternalLink, Github, BookImage, FileVideo } from "lucide-react";
import { Portal } from "react-portal";
import type { Project } from "types";

const Portfolio = ({
  portfolio: {
    title,
    subtitle,
    coverimage,
    imagegallery,
    videogallery,
    url,
    github,
  },
}: {
  portfolio: Project;
}) => {
  const [videoGalleryOpen, setVideoGalleryOpen] = useState(false);
  const [imageGalleryOpen, setImageGalleryOpen] = useState(false);

  return (
    <div className="p-4 portfolio card hovercard group md:p-5">
      <div className="relative overflow-hidden portfolio-top">
        <div className="flex items-center mx-auto portfolio-image fiximage h-72 w-72 blur-0 filter transition-all duration-500 group-hover:blur">
          <img
            src={`/assets/images/portfolios/${coverimage}`}
            height={384}
            width={550}
            alt={title}
            className="w-full h-auto mx-auto"
          />
        </div>
        <div className="absolute top-0 left-0 z-20 flex items-center justify-center w-full h-full overflow-hidden portfolio-hovercontent -translate-x-full transform gap-4 bg-grey bg-opacity-80 transition-all duration-500 group-hover:translate-x-0">
          {imagegallery && imagegallery.length > 0 && (
            <button
              className="inline-flex items-center justify-center w-10 h-10 min-h-0 p-0 text-lg text-center rounded-full bg-primary text-grey"
              aria-label="Image Link"
              onClick={() => setImageGalleryOpen(true)}
            >
              <BookImage />
            </button>
          )}
          {videogallery && videogallery.length > 0 && (
            <button
              className="inline-flex items-center justify-center w-10 h-10 min-h-0 p-0 text-lg text-center rounded-full bg-primary text-grey"
              aria-label="Video Link"
              onClick={() => setVideoGalleryOpen(true)}
            >
              <FileVideo />
            </button>
          )}
          {url?.length && url.length > 0 && (
            <a
              href={url}
              target="_blank"
              className="inline-flex items-center justify-center w-10 h-10 min-h-0 p-0 text-lg text-center rounded-full bg-primary text-grey"
              aria-label="External Link"
            >
              <ExternalLink />
            </a>
          )}
          {github?.length && github.length > 0 && (
            <a
              href={github}
              target="_blank"
              className="inline-flex items-center justify-center w-10 h-10 min-h-0 p-0 text-lg text-center rounded-full bg-primary text-grey"
              aria-label="Github Link"
            >
              <Github />
            </a>
          )}
        </div>
      </div>
      <div className="mt-4 text-center portfolio-content">
        <h5 className="mb-0">{title}</h5>
        <p>{subtitle}</p>
      </div>
      {imagegallery && (
        <Portal>
          <FsLightbox
            toggler={imageGalleryOpen}
            sources={imagegallery.map(
              image => `/assets/images/portfolios/${image}`
            )}
          />
        </Portal>
      )}
      {videogallery && (
        <Portal>
          <FsLightbox toggler={videoGalleryOpen} sources={videogallery} />
        </Portal>
      )}
    </div>
  );
};

export default Portfolio;
