"use client";

import PageLayout from "@/components/PageLayout";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  BriefcaseBusiness,
  Calendar,
  Code2,
  Download,
  GraduationCap,
  User,
} from "lucide-react";
import { motion } from "motion/react";
import { useRouter, useSearchParams } from "next/navigation";

const tabMenu = [
  { title: "Education", value: "education", icon: GraduationCap },
  { title: "Skills", value: "skills", icon: Code2 },
  { title: "About me", value: "about", icon: User },
  { title: "View CV", value: "cv", icon: BriefcaseBusiness },
];
const tabContent = {
  education: {
    title: "Educational Background",
    items: [
      {
        degree: "Master of Computer Science",
        institution: "University of Warwick",
        period: "2025 - 2026",
        description:
          "Specializing in Software Engineering and Artificial Intelligence",
        achievements: ["4.0 GPA", "Research Publication"],
      },
      {
        degree: "Bachelor of Science in Information Technology",
        institution: "Middlesex University London",
        period: "2023 - 2024",
        description:
          "Specialized in developing a high-quality web applications and mobile platforms.",
        achievements: ["First Class Honours"],
      },
    ],
  },
  skills: {
    title: "Technical Skills",
    categories: [
      {
        name: "Frontend Development",
        description:
          "Developing and maintaining web applications using modern JavaScript frameworks, including React, Next.js, and TypeScript.",
        skills: [
          "React",
          "Next.js",
          "TypeScript",
          "Tailwind CSS",
          "Framer Motion",
        ],
      },
      {
        name: "Backend Development",
        description:
          "Specializing in building robust and scalable backend systems using Node.js, Express, and Nest.js.",
        skills: ["Node.js", "Express", "Nest.js", "PostgreSQL", "MongoDB"],
      },
      {
        name: "Tools & Others",
        description:
          "Proficient in version control using Git and Docker. Experienced in cloud platforms like AWS. Skilled in Agile methodologies and CI/CD pipelines.",
        skills: ["Git", "Docker", "AWS", "CI/CD", "Agile Methodologies"],
      },
    ],
  },
  about: {
    title: "About Me",
    bio: "Passionate Full Stack Engineer with over 5 years of experience in building modern web applications. Committed to writing clean, maintainable code and staying current with emerging technologies. Strong advocate for user-friendly design and accessibility.",
    interests: [
      "Open Source Contributing",
      "Tech Blogging",
      "UI/UX Design",
      "Machine Learning",
    ],
    languages: ["English (Proffessional)", "Arabic (Native)"],
  },
};

export const dynamic = "force-static";

export default function ResumePage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const currentTab = searchParams.get("tab") ?? "education";

  function handleTabChange(value: string) {
    router.push(`/resume?tab=${value}`);
  }

  async function saveFile() {
    const fileName = "cv.pdf";
    const response = await fetch(`/${fileName}`);
    const blob = await response.blob();
    const url = window.URL.createObjectURL(blob);

    const fileURLToPath = document.createElement("a");
    fileURLToPath.href = url;
    fileURLToPath.download = fileName;
    fileURLToPath.click();

    window.URL.revokeObjectURL(url);
  }

  return (
    <div className="-my-24 flex min-h-screen flex-col justify-center py-10 max-sm:my-0">
      <PageLayout>
        <Tabs
          value={currentTab}
          onValueChange={handleTabChange}
          className="flex w-full flex-col gap-6 md:flex-row md:gap-10"
        >
          <TabsList className="h-full flex-col gap-4 bg-transparent md:w-64">
            {tabMenu?.map((item) => (
              <TabsTrigger
                key={item?.value}
                value={item?.value}
                className="hover:bg-lightSky/50 text-accent dark:text-accent-foreground w-full py-2.5 text-xs sm:text-sm"
              >
                <div className="flex items-center gap-1.5 md:w-[50%] md:gap-3">
                  <item.icon className="h-4 w-4 md:h-5 md:w-5" />
                  {item?.title}
                </div>
              </TabsTrigger>
            ))}
          </TabsList>
          <div className="min-h-[400px] flex-1">
            <TabsContent value="education">
              <motion.h2
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-lightSky mb-6 text-xl font-bold"
              >
                {tabContent.education.title}
              </motion.h2>
              <div className="space-y-6">
                {tabContent?.education?.items.map((item, index) => (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    key={index}
                    className="border-lightSky/20 rounded-lg border p-1.5 sm:p-4"
                  >
                    <div className="mb-4 flex items-start justify-between">
                      <div>
                        <h3 className="text-lg font-semibold">
                          {item?.degree}
                        </h3>
                        <p className="text-muted-foreground">
                          {item?.institution}
                        </p>
                      </div>
                      <div className="text-muted-foreground flex items-center">
                        <Calendar className="mr-2 size-4" />
                        <span className="whitespace-nowrap max-sm:text-xs">
                          {item?.period}
                        </span>
                      </div>
                    </div>
                    <p className="text-accent dark:text-accent-foreground mb-4">
                      {item?.description}
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {item.achievements.map((achievement, i) => (
                        <Badge key={i} variant="secondary">
                          {achievement}
                        </Badge>
                      ))}
                    </div>
                  </motion.div>
                ))}
              </div>
            </TabsContent>
            <TabsContent value="skills">
              <motion.h2
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-lightSky mb-6 text-xl font-bold"
              >
                {tabContent.skills.title}
              </motion.h2>
              <div className="space-y-6 max-sm:mb-10">
                {tabContent?.skills?.categories.map((item, index) => (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    key={index}
                    className="border-lightSky/20 rounded-lg border p-1.5 sm:p-4"
                  >
                    <div className="mb-4 flex items-start justify-between">
                      <div>
                        <h3 className="text-lg font-semibold">{item?.name}</h3>
                        <p className="text-accent dark:text-accent-foreground">
                          {item?.description}
                        </p>
                      </div>
                    </div>

                    <div className="flex flex-wrap gap-2">
                      {item.skills.map((skill, i) => (
                        <Badge key={i} variant="secondary">
                          {skill}
                        </Badge>
                      ))}
                    </div>
                  </motion.div>
                ))}
              </div>
            </TabsContent>
            <TabsContent value="about">
              <motion.h2
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-lightSky mb-6 text-xl font-bold"
              >
                {tabContent.about.title}
              </motion.h2>
              <div className="space-y-6">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0 * 0.1 }}
                  className="border-lightSky/20 rounded-lg border p-1.5 sm:p-4"
                >
                  <span className="text-accent dark:text-accent-foreground mb-6 text-lg">
                    {tabContent.about.bio}
                  </span>
                  <div className="space-y-4">
                    <div>
                      <h3 className="mb-2 text-lg font-semibold">Interests</h3>
                      <div className="flex flex-wrap gap-2">
                        {tabContent.about.interests.map((interest, i) => (
                          <Badge key={i} variant="secondary">
                            {interest}
                          </Badge>
                        ))}
                      </div>
                    </div>
                    <div>
                      <h3 className="mb-2 text-lg font-semibold">Languages</h3>
                      <div className="flex flex-wrap gap-2">
                        {tabContent.about.languages.map((language, i) => (
                          <Badge key={i} variant="secondary">
                            {language}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </div>
                </motion.div>
              </div>
            </TabsContent>
            <TabsContent value="cv">
              <Button
                className="text-lightSky/85 hover:text-lightSky mb-3 px-0 text-xl font-bold"
                variant={"link"}
                onClick={saveFile}
              >
                <Download className="mr-2 h-4 w-4" /> Download CV
              </Button>
              <div className="border-lightSky/20 w-full max-w-full overflow-clip rounded-lg border">
                <object
                  data="/cv.pdf#zoom=100&view=Fit"
                  type="application/pdf"
                  className="h-[80vh] max-h-[800px] min-h-[500px] w-full bg-white"
                >
                  <p>
                    It appears you don not have a PDF plugin for this browser.
                    You can
                    <Button
                      variant={"link"}
                      onClick={saveFile}
                      className="text-lightSky/85 hover:text-lightSky px-1"
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
  );
}
