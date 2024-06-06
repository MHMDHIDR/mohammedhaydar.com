import type { WorkEducationProps } from "types";

const TimelineItem = ({
  timeline: { title, meta, link, text, year },
}: {
  timeline: WorkEducationProps;
}) => {
  return (
    <div className="relative items-start block border-white rounded-full timeline border-opacity-20 first:mt-0 md:flex">
      <span className="timeline-year absolute left-12 top-0 mr-14 mt-7 min-w-[10rem] whitespace-nowrap rounded-full bg-primary bg-opacity-10 p-1 text-center text-sm leading-none md:relative md:left-0">
        {year}
      </span>
      <div className="relative pt-16 pl-12 border-l-4 border-black timeline-right border-opacity-20 md:pt-6 dark:border-gray-700">
        <span className="absolute -left-0.5 top-0 mt-1 h-full w-0 rounded-full bg-white bg-opacity-20">
          <span className="absolute left-0 z-10 inline-block w-6 h-6 border-4 border-white rounded-full top-6 -translate-x-1/2 transform border-opacity-20 bg-grey"></span>
          <span className="absolute left-0 right-full top-6 -z-10 mt-2.5 h-1 w-8 translate-x-0 transform rounded-full bg-gray-200 bg-opacity-20 md:left-1/2 md:w-20 md:-translate-x-1/2 dark:bg-gray-700"></span>
        </span>
        <h5 className="mb-0 text-primary">{title}</h5>
        <p className="mb-2 text-heading">
          {link ? (
            <a
              href={link}
              className="break-words hover:underline-active"
              target="_blank"
              rel="noopener noreferrer"
            >
              {meta}
            </a>
          ) : (
            <span className="break-words hover:underline-active">{meta}</span>
          )}
        </p>
        <p className="leading-loose">{text}</p>
      </div>
    </div>
  );
};

export default TimelineItem;
