import { HydrateClient } from "@/trpc/server";
import Container from "@/components/Container";
import HomeDescription from "@/components/HomeDescription";
import Photo from "@/components/Photo";
import ProjectsCarousel from "@/components/ProjectsCarousel";
import SocialLinks from "@/components/SocialLinks";
import { Button } from "@/components/ui/button";
import { File, Package } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

export const dynamic = "force-static";
export const revalidate = 86400;

export default async function Home() {
  return (
    <HydrateClient>
      <div className="bg-bodyColor text-white/80">
        <Container className="grid grid-cols-1 gap-10 py-10 md:grid-cols-2">
          <div className="flex flex-col items-center gap-5 text-center md:items-start md:gap-7 md:text-start">
            <div>
              <h3 className="text-primary mb-1 font-semibold tracking-wider">
                Full Stack Engineer
              </h3>
              <h2 className="text-accent dark:text-accent-foreground mb-2 text-3xl md:text-5xl">
                Hi, I&apos;m
              </h2>
              <h1 className="text-primary text-5xl tracking-normal md:text-7xl">
                Mohammed{" "}
                <span className="text-accent dark:text-accent-foreground">
                  Haydar
                </span>
              </h1>
            </div>
            <div className="relative h-[170px] w-full md:h-[140px]">
              <div className="absolute top-0 left-0 h-full w-full">
                <HomeDescription />
              </div>
            </div>
            <div className="flex gap-x-1">
              <div className="academy-badge">
                <Link
                  href="https://app-eu1.hubspot.com/academy/achievements/w02xvmxp/en/1/mohammed-haydar/seo"
                  title="Mohammed Haydar - SEO"
                  target="_blank"
                  aria-label="Mohammed Haydar - SEO"
                  rel="noopener noreferrer"
                  className="rounded-full"
                >
                  <Image
                    src="https://hubspot-credentials-na1.s3.amazonaws.com/prod/badges/user/9b2dff0e21824340aafe7a389fb1852f.png"
                    alt="SEO"
                    width={176}
                    height={176}
                    className="rounded-full transition-all duration-300 hover:scale-105 hover:shadow-lg"
                  />
                </Link>
              </div>
            </div>
            <div className="flex gap-x-1">
              <Link href="/projects" className="my-3">
                <Button className="border-primary/50 bg-primary hoverEffect h-8 rounded-full border hover:text-white md:h-11">
                  <Package /> My Projects
                </Button>
              </Link>
              <Link href="/resume" className="my-3">
                <Button className="border-primary/50 bg-primary/10 hoverEffect text-primary h-8 rounded-full border hover:text-white md:h-11">
                  <File /> My Resume
                </Button>
              </Link>
            </div>
            <SocialLinks />
          </div>

          <Photo />
        </Container>

        <Container className="mb-10">
          <ProjectsCarousel
            title="Featured Projects"
            orientation="horizontal"
            className="py-10"
          />
        </Container>
      </div>
    </HydrateClient>
  );
}
