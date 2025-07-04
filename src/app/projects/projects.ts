type projectsType = {
  title: string;
  category: string;
  description: string;
  stack: string[];
  image: string;
  liveUrl: string;
  githubUrl: string;
}[];

export const projects = [
  {
    title: "John Al-Shiekh – English Speaking Practice with Instant Feedback",
    category: "Full Stack",
    description:
      "Enhance your English speaking skills with John Al-Shiekh's AI-powered platform. Engage in realistic mock interviews and receive instant, detailed feedback to boost your performance.",
    stack: [
      "OpenAI",
      "Vapi AI",
      "Next.js",
      "TRPc",
      "TailwindCSS",
      "Zustand",
      "Stripe",
      "PostgreSQL",
    ],
    image: "/projects/john-al-shiekh.svg",
    liveUrl: "https://www.john-al-shiekh.live",
    githubUrl: "https://github.com/MHMDHIDR/john-al-sheikh",
  },
  {
    title: "Eco Curiosity Lab",
    category: "Frontend",
    description:
      "Eco Curiosity Lab is a modern, extensible web application designed to foster curiosity and knowledge about the animal kingdom. Our mission is to create a vibrant community of enthusiasts, researchers, and learners who share a passion for discovering and cataloging species from around the world. The platform is built to be both beautiful and highly functional, with a focus on performance, accessibility, and extensibility.",
    stack: ["React.js", "TailwindCSS", "Zustand", "Shadcn/UI", "TypeScript"],
    image: "/projects/eco-curiosity-lab.png",
    liveUrl: "https://www.ecocuriositylab.me",
    githubUrl: "https://github.com/MHMDHIDR/eco-curiosity-lab",
  },
  {
    title: "Multi Vendor Restaurants Management App",
    category: "Full Stack",
    description:
      "Showcasing the Multi-Vendor Restaurant Management App: A modern platform that connects vendors and customers, offering seamless restaurant management, real-time orders, and an intuitive user experience. Built for efficiency, scalability, and convenience.",
    stack: [
      "Next.js",
      "TRPc",
      "TailwindCSS",
      "Zustand",
      "Stripe",
      "PayPal",
      "PostgreSQL",
    ],
    image: "/projects/restaurant.webp",
    liveUrl: "https://restaurant.technodevlabs.com",
    githubUrl: "https://github.com/MHMDHIDR/restaurant-next",
  },
  {
    title: "Shms Agricultural",
    category: "Full Stack",
    description:
      "Shms Agricultural | Empowering Sudanese Farmers and Investors Built with the latest technologies, including Next.js and TypeScript, Shms Agricultural provides an innovative platform to support Sudanese farmers and investors in achieving sustainable agricultural growth. Our platform is designed to offer fast, reliable, and scalable solutions, leveraging the most advanced web development tools available today.",
    stack: ["Next.js", "TailwindCSS", "Auth.js", "Shadcn", "MongoDB"],
    image: "/projects/shmsagricultural.webp",
    liveUrl: "https://www.shmsagricultural.com",
    githubUrl: "https://github.com/MHMDHIDR/shms-agricultural",
  },
  {
    title: "CRM System",
    category: "Full Stack",
    description:
      "A sleek customers management application that helps to manage and grow customer relationships effortlessly. Fully customizable, it adapts to your company’s unique workflow and supports seamless integration, allowing you to track progress and optimize your customer interactions effectively.",
    stack: [
      "Next.js",
      "Redux",
      "TailwindCSS",
      "Auth.js",
      "PostgreSQL",
      "Drizzle-ORM",
    ],
    image: "/projects/crm.webp",
    liveUrl: "https://crm.technodevlabs.com",
    githubUrl: "https://github.com/MHMDHIDR/crm",
  },
  {
    title: "StayMakan",
    category: "Full Stack",
    description:
      "StayMakan is your go-to platform for finding and booking the perfect homestay or holiday retreat anywhere, anytime. Whether you're planning a relaxing weekend getaway or an adventurous holiday, we’ve got a wide selection of comfortable and affordable accommodations to make your stay memorable.",
    stack: ["Next.js", "Auth.js", "Google Calender", "Radix UI", "MongoDB"],
    image: "/projects/StayMakan.webp",
    liveUrl: "https://staymakan.technodevlabs.com",
    githubUrl: "https://github.com/MHMDHIDR/staymakan",
  },
] satisfies projectsType;
