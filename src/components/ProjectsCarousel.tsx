import { projects as allProjects } from "@/app/projects/projects";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  type CarouselProps,
} from "@/components/ui/carousel";
import { Separator } from "@/components/ui/separator";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";
import { ArrowUpRight, Github } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

type Project = (typeof allProjects)[0];

interface ProjectsCarouselProps {
  title?: string;
  projects?: Project[];
  className?: string;
  orientation: CarouselProps["orientation"];
}

export default function ProjectsCarousel({
  title,
  projects = allProjects,
  className,
  orientation = "horizontal",
}: ProjectsCarouselProps) {
  return (
    <div className={cn("", className)}>
      {title && (
        <h2 className="border-primary/20 mx-auto mb-10 w-fit rounded-sm border-8 border-double p-3 text-sm font-bold text-white select-none md:mb-6 md:text-2xl">
          {title}
        </h2>
      )}
      {orientation === "horizontal" ? (
        <Carousel
          opts={{ align: "start", loop: true }}
          className="w-full"
          orientation={orientation}
        >
          <div className="flex justify-end">
            <div className="flex gap-3">
              <CarouselPrevious className="border-lightSky/20 hover:bg-hoverColor/20 hover:border-hoverColor hoverEffect relative rounded-md border bg-transparent p-5 hover:text-white" />
              <CarouselNext className="border-lightSky/20 hover:bg-hoverColor/20 hover:border-hoverColor hoverEffect relative rounded-md border bg-transparent p-5 hover:text-white" />
            </div>
          </div>
          <CarouselContent className="items-center lg:my-4">
            {projects?.map((project, index) => (
              <CarouselItem key={index}>
                <Card className="bg-bodyColor border-lightSky/20">
                  <CardContent className="p-6">
                    <div className="group flex flex-col md:flex-row md:items-center md:space-x-8">
                      <div className="order-2 mb-8 w-full md:order-1 md:mb-0 md:w-1/2">
                        <div className="mt-4 space-y-3 md:mt-0 md:space-y-2">
                          <h2 className="text-outline text-3xl leading-none font-extrabold text-transparent select-none md:text-6xl">
                            {index + 1}
                          </h2>
                          <h3 className="group-hover:text-primary hoverEffect text-xl leading-none font-bold text-white md:text-3xl">
                            <Link href={project.liveUrl} target="_blank">
                              {project.title}
                            </Link>
                          </h3>
                          <Badge>{project.category}</Badge>
                          <p className="text-sm leading-6 text-white/60 md:text-base md:leading-normal">
                            {project.description}
                          </p>
                          <ul className="flex flex-wrap items-center gap-2 md:gap-4">
                            {project.stack?.map((item, index) => (
                              <li
                                key={index}
                                className="text-primary/80 bg-primary/10 rounded-sm px-1.5 py-0.5 text-xs select-none md:text-base"
                              >
                                {item}
                                {index !== project.stack?.length - 1 && ""}
                              </li>
                            ))}
                          </ul>
                          <Separator className="bg-gray-700" />
                          <div className="flex items-center space-x-4">
                            <TooltipProvider>
                              <Tooltip>
                                <Link href={project.liveUrl} target="_blank">
                                  <TooltipTrigger asChild>
                                    <Button
                                      variant="outline"
                                      size="icon"
                                      className="bg-lightSky/5 border-lightSky/20 hover:bg-lightSky/20 hover:border-lightSky hover:text-hoverColor hoverEffect border text-white/80"
                                    >
                                      <ArrowUpRight />
                                      <span className="sr-only">
                                        View Live Project
                                      </span>
                                    </Button>
                                  </TooltipTrigger>
                                </Link>
                                <TooltipContent className="bg-white font-semibold text-black">
                                  <p>View Live Project</p>
                                </TooltipContent>
                              </Tooltip>

                              {project.githubUrl && (
                                <Tooltip>
                                  <Link
                                    href={project.githubUrl}
                                    target="_blank"
                                  >
                                    <TooltipTrigger asChild>
                                      <Button
                                        variant="outline"
                                        size="icon"
                                        className="bg-lightSky/5 border-lightSky/20 hover:bg-lightSky/20 hover:border-lightSky hover:text-hoverColor hoverEffect border text-white/80"
                                      >
                                        <Github />
                                        <span className="sr-only">
                                          View Github Repository
                                        </span>
                                      </Button>
                                    </TooltipTrigger>
                                  </Link>
                                  <TooltipContent className="bg-white font-semibold text-black">
                                    <p>View Github Repository</p>
                                  </TooltipContent>
                                </Tooltip>
                              )}
                            </TooltipProvider>
                          </div>
                        </div>
                      </div>
                      <div className="order-1 w-full md:order-2 md:w-1/2">
                        <Link
                          href={project.liveUrl}
                          target="_blank"
                          className="relative flex h-72 overflow-hidden rounded-lg bg-gray-700 sm:h-96"
                        >
                          <Image
                            src={project.image}
                            alt={project.title}
                            fill
                            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                            className="object-cover"
                          />
                        </Link>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </CarouselItem>
            ))}
          </CarouselContent>
          <div className="flex justify-end">
            <div className="flex gap-3">
              <CarouselPrevious className="border-lightSky/20 hover:bg-hoverColor/20 hover:border-hoverColor hoverEffect relative rounded-md border bg-transparent p-5 hover:text-white" />
              <CarouselNext className="border-lightSky/20 hover:bg-hoverColor/20 hover:border-hoverColor hoverEffect relative rounded-md border bg-transparent p-5 hover:text-white" />
            </div>
          </div>
        </Carousel>
      ) : (
        projects?.map((project, index) => (
          <Card className="bg-bodyColor border-lightSky/20" key={index}>
            <CardContent className="p-6">
              <div className="group flex flex-col md:flex-row md:items-center md:space-x-8">
                <div className="order-2 mb-8 w-full md:order-1 md:mb-0 md:w-1/2">
                  <div className="mt-4 space-y-3 md:mt-0 md:space-y-2">
                    <h2 className="text-outline text-3xl leading-none font-extrabold text-transparent select-none md:text-6xl">
                      {index + 1}
                    </h2>
                    <h3 className="group-hover:text-primary hoverEffect text-xl leading-none font-bold text-white md:text-3xl">
                      <Link href={project.liveUrl} target="_blank">
                        {project.title}
                      </Link>
                    </h3>
                    <Badge>{project.category}</Badge>
                    <p className="text-sm leading-6 text-white/60 md:text-base md:leading-normal">
                      {project.description}
                    </p>
                    <ul className="flex flex-wrap items-center gap-2 md:gap-4">
                      {project.stack?.map((item, index) => (
                        <li
                          key={index}
                          className="text-primary/80 bg-primary/10 rounded-sm px-1.5 py-0.5 text-xs select-none md:text-base"
                        >
                          {item}
                          {index !== project.stack?.length - 1 && ""}
                        </li>
                      ))}
                    </ul>
                    <Separator className="bg-gray-700" />
                    <div className="flex items-center space-x-4">
                      <TooltipProvider>
                        <Tooltip>
                          <Link href={project.liveUrl} target="_blank">
                            <TooltipTrigger asChild>
                              <Button
                                variant="outline"
                                size="icon"
                                className="bg-lightSky/5 border-lightSky/20 hover:bg-lightSky/20 hover:border-lightSky hover:text-hoverColor hoverEffect border text-white/80"
                              >
                                <ArrowUpRight />
                                <span className="sr-only">
                                  View Live Project
                                </span>
                              </Button>
                            </TooltipTrigger>
                          </Link>
                          <TooltipContent className="bg-white font-semibold text-black">
                            <p>View Live Project</p>
                          </TooltipContent>
                        </Tooltip>

                        {project.githubUrl && (
                          <Tooltip>
                            <Link href={project.githubUrl} target="_blank">
                              <TooltipTrigger asChild>
                                <Button
                                  variant="outline"
                                  size="icon"
                                  className="bg-lightSky/5 border-lightSky/20 hover:bg-lightSky/20 hover:border-lightSky hover:text-hoverColor hoverEffect border text-white/80"
                                >
                                  <Github />
                                  <span className="sr-only">
                                    View Github Repository
                                  </span>
                                </Button>
                              </TooltipTrigger>
                            </Link>
                            <TooltipContent className="bg-white font-semibold text-black">
                              <p>View Github Repository</p>
                            </TooltipContent>
                          </Tooltip>
                        )}
                      </TooltipProvider>
                    </div>
                  </div>
                </div>
                <div className="order-1 w-full md:order-2 md:w-1/2">
                  <Link
                    href={project.liveUrl}
                    target="_blank"
                    className="relative flex h-72 overflow-hidden rounded-lg bg-gray-700 sm:h-96"
                  >
                    <Image
                      src={project.image}
                      alt={project.title}
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      className="object-cover"
                    />
                  </Link>
                </div>
              </div>
            </CardContent>
          </Card>
        ))
      )}
    </div>
  );
}
