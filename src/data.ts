import type { Project, ProjectFiltersProps, WorkEducationProps } from "types";

export const workEducationData: WorkEducationProps[] = [
  {
    id: 1,
    title: "Bachelor's in Information Technology",
    year: "2023 - 2024",
    meta: "Middlesex University London",
    text: "Middlesex University is a renowned institution celebrated for its academic excellence and commitment to innovation. It provides a dynamic learning environment for students from diverse backgrounds.\nI have undertaken a variety of courses at Middlesex University, including Advanced Web Development with Big Data, Digital Media Engineering, Web-Based Mobile App Development, and the Undergraduate Individual Project. These courses collectively contribute to my academic foundation, enhancing my capabilities in the field of computer science and technology.",
  },
  {
    id: 3,
    title: "Higher Diploma in Software Engineering",
    year: "2014 - 2017",
    meta: "Aptech Qatar Education",
    text: "The Higher Diploma in Software Engineering offered by Aptech Qatar Education is a specialized program that delivers comprehensive training in software development and engineering principles. It emphasizes equipping students with the essential skills and knowledge to design, develop, test, and maintain software systems.",
  },
  {
    id: 2,
    title: "High School Certificate",
    year: "2011 - 2014",
    meta: "Computer Department, Sudanese School - Doha, Qatar",
    text: "During my secondary school education, I graduated with high grades and displayed a keen interest in computer-related subjects. While I did well academically, I am genuinely passionate about the field, particularly in the area of programming, such as web development. I'm eager to continue learning and further develop my skills as I embark on a journey in this dynamic and ever-evolving field.",
  },
];

export const jobExperienceData: WorkEducationProps[] = [
  {
    id: 1,
    title: "Front-end Developer",
    meta: "INLINE Company",
    link: "https://inline.qa",
    text: "Designed a professional, user-friendly website for INLINE marketing company using WordPress, and JavaScript, working closely with the marketing team to develop a comprehensive content strategy and implement interactive features, data visualization tools, and mobile-responsive design.",
    year: "Jan 2023 - Mar 2023",
  },
  {
    id: 2,
    title: "Web Developer",
    meta: "Sudan Academic Journal for Research and Science",
    link: "http://sudanacademicjournalresearch.online/index?page=1",
    text: "Designed and developed an academic journal web application using PHP, JavaScript, and Bootstrap, collaborating with the editorial team to create a user-friendly platform with easy navigation, search functionality, and security measures. Conducted regular updates, maintenance, and improvements based on user feedback, contributing to the journal's growth and success.",
    year: "Jun 2016 - May 2021",
  },
  {
    id: 3,
    meta: "Qatar University",
    link: "https://sesri.qu.edu.qa",
    text: "Utilized statistical analysis and data collection tools to input accurate and complete information into databases, organized and analyzed data to identify patterns and trends, collaborated with team members to develop efficient data entry processes, communicated findings to inform decision making, monitored processes for improvement and met strict deadlines.",
    year: "Sep 2016 - Mar 2017",
    title: "Data Entry",
  },
];

export const filteredProjectsData: ProjectFiltersProps[] = [
  {
    _id: "62e87a0f-ffc5-488b-8870-87cccfda79d7",
    title: "PHP",
    value: "PHP",
  },
  {
    _id: "7506b030-8b86-4250-8f8a-54630a89d511",
    title: "ExpressJS",
    value: "ExpressJS",
  },
  {
    _id: "d6de33f6-4435-4e04-8086-956579ded94f",
    title: "WordPress",
    value: "WordPress",
  },
  {
    _id: "e7185d48-3fa0-43b0-abcd-f0ac820034a5",
    title: "Bootstrap",
    value: "Bootstrap",
  },
  {
    _id: "fa7bdbe5-2118-40ae-806a-99da85849ff7",
    title: "NextJS",
    value: "NextJS",
  },
];

export const projectsData: Project[] = [
  {
    _createdAt: "2023-05-21T12:22:48Z",
    title: "Academic Journal for Research and Science",
    slug: null,
    coverimage: "saj.jpg",
    imagegallery: ["saj-lg.jpg"],
    videogallery: null,
    description:
      "During the period of June 2016 to May 2017, I designed and developed the Sudan Academic Journal Research website. Using PHP, JavaScript, and Bootstrap, I created a user-friendly platform that facilitated the publication of research work for scholars and researchers. Working closely with the editorial team, I ensured the website's design and functionality met the needs of the academic community, providing a seamless experience for authors to showcase their work.",
    _id: "03562b37-2f27-4446-8266-6056e60051fe",
    subtitle: null,
    url: "http://sudanacademicjournalresearch.online",
    github: "https://github.com/MHMDHIDR/saj-online",
    filter: [
      {
        _key: "c793ef590fb3",
        _ref: "62e87a0f-ffc5-488b-8870-87cccfda79d7",
        _type: "reference",
      },
      {
        _ref: "e7185d48-3fa0-43b0-abcd-f0ac820034a5",
        _type: "reference",
        _key: "093af2c87343",
      },
    ],
  },
  {
    title: "Data Management Center",
    coverimage: "dmc-lg.jpg",
    imagegallery: null,
    url: "https://dmcqtr.com",
    filter: [
      {
        _ref: "d6de33f6-4435-4e04-8086-956579ded94f",
        _type: "reference",
        _key: "e6e013f95b43",
      },
    ],
    _id: "523e7bc9-ee9e-4d3e-b5b2-a6c35de9db26",
    _createdAt: "2023-12-08T20:05:00Z",
    subtitle: null,
    slug: null,
    videogallery: null,
    github: null,
    description: null,
  },
  {
    videogallery: null,
    filter: [
      {
        _ref: "d6de33f6-4435-4e04-8086-956579ded94f",
        _type: "reference",
        _key: "ef9814b528fb",
      },
    ],
    description:
      "I designed a visually appealing and user-friendly website for INLINE, specializing in marketing solutions to empower businesses and enhance workflow. Collaborating closely with the marketing team, I developed a comprehensive content strategy featuring case studies, testimonials, and informative blog posts. Interactive features like forms and chatbots were implemented for seamless user engagement, and data visualization tools were built to showcase INLINE's analytics expertise, offering valuable insights to clients and prospects.",
    _id: "6e6b2c10-e622-454d-8c51-e8da51b9bbce",
    _createdAt: "2023-05-21T12:22:03Z",
    title: "INLINE Marketing Agency",
    slug: null,
    imagegallery: ["inline-lg.jpg"],
    subtitle: null,
    coverimage: "inline.jpg",
    url: "https://inline.qa",
    github: null,
  },
  {
    _id: "b6f8c0c8-6034-47ef-b713-e26abe714ee1",
    title: "Restaurant App",
    imagegallery: ["mhmdhidr-restaurant-next-lg.jpg"],
    videogallery: null,
    url: "https://cst3990-restaurant.vercel.app",
    github: "https://github.com/MHMDHIDR/cst3990-restaurant",
    _createdAt: "2023-05-21T12:07:57Z",
    subtitle: null,
    slug: null,
    coverimage: "mhmdhidr-restaurant-next.jpg",
    filter: [
      {
        _ref: "fa7bdbe5-2118-40ae-806a-99da85849ff7",
        _type: "reference",
        _key: "3b3e8ee8e2b2",
      },
    ],
    description:
      "From September 2021 to December 2022, I developed and maintained restaurant webapp, focusing on delivering a seamless user experience. By employing Next.js, I ensured smooth functionality and implemented an intuitive design to enhance usability and satisfaction for users.",
  },
  {
    videogallery: null,
    url: "https://ecommerce-mhmdhidr.vercel.app",
    github: "https://github.com/MHMDHIDR/ecommerce",
    _id: "bf84a665-d8fa-4eea-acf2-a71c58a9f55b",
    slug: null,
    coverimage: "e-commerce.jpg",
    imagegallery: ["e-commerce-lg.jpg"],
    filter: [
      {
        _ref: "7506b030-8b86-4250-8f8a-54630a89d511",
        _type: "reference",
        _key: "13bdb6d4b6b8",
      },
    ],
    description:
      "I developed an e-commerce platform, accessible at eCommerce app, using Express, React, and Tailwind CSS. By leveraging these technologies, I created a dynamic and visually appealing platform. The website offers a seamless shopping experience, incorporating intuitive navigation, responsive design, and stylish elements to enhance user engagement and satisfaction.",
    _createdAt: "2023-05-21T12:24:36Z",
    title: "eCcommerce Web Application",
    subtitle: null,
  },
];
