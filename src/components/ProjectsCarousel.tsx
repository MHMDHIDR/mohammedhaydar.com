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
    <div className={cn("space-y-4", className)}>
      {title && (
        <h2 className="border-primary/20 text-accent dark:text-accent-foreground mx-auto mb-10 w-fit rounded-sm border-8 border-double p-3 text-sm font-bold select-none md:mb-6 md:text-2xl">
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
              <CarouselPrevious className="border-lightSky/20 hover:bg-hoverColor/20 hover:border-hoverColor hoverEffect bg-accent-forground text-accent dark:text-accent-foreground relative rounded-md border p-4.5" />
              <CarouselNext className="border-lightSky/20 hover:bg-hoverColor/20 hover:border-hoverColor hoverEffect bg-accent-forground text-accent dark:text-accent-foreground relative rounded-md border p-4.5" />
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
                          <h3 className="group-hover:text-primary hoverEffect text-accent dark:text-accent-foreground text-xl leading-none font-bold md:text-3xl">
                            <Link href={project.liveUrl} target="_blank">
                              {project.title}
                            </Link>
                          </h3>
                          <Badge className="text-accent dark:text-accent-foreground">
                            {project.category}
                          </Badge>
                          <p className="text-accent/60 dark:text-accent-foreground/60 text-sm leading-6 md:text-base md:leading-normal">
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
                                      className="bg-lightSky/5 border-lightSky/20 hover:bg-lightSky/20 hover:border-lightSky hover:text-hoverColor hoverEffect text-accent dark:text-accent-foreground border"
                                    >
                                      <ArrowUpRight />
                                      <span className="sr-only">
                                        View Live Project
                                      </span>
                                    </Button>
                                  </TooltipTrigger>
                                </Link>
                                <TooltipContent className="dark:bg-accent dark:text-accent-foreground bg-accent-foreground text-accent font-semibold">
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
                                        className="bg-lightSky/5 border-lightSky/20 hover:bg-lightSky/20 hover:border-lightSky hover:text-hoverColor hoverEffect text-accent dark:text-accent-foreground border"
                                      >
                                        <Github />
                                        <span className="sr-only">
                                          View Github Repository
                                        </span>
                                      </Button>
                                    </TooltipTrigger>
                                  </Link>
                                  <TooltipContent className="dark:bg-accent dark:text-accent-foreground bg-accent-foreground text-accent font-semibold">
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
              <CarouselPrevious className="border-lightSky/20 hover:bg-hoverColor/20 hover:border-hoverColor hoverEffect bg-accent-forground text-accent dark:text-accent-foreground relative rounded-md border p-4.5" />
              <CarouselNext className="border-lightSky/20 hover:bg-hoverColor/20 hover:border-hoverColor hoverEffect bg-accent-forground text-accent dark:text-accent-foreground relative rounded-md border p-4.5" />
            </div>
          </div>
        </Carousel>
      ) : (
        projects?.map((project, index) => (
          <Card
            className="bg-bodyColor border-lightSky/20 last:mb-10"
            key={index}
          >
            <CardContent className="p-6">
              <div className="group flex flex-col md:flex-row md:items-center md:space-x-8">
                <div className="order-2 mb-8 w-full md:order-1 md:mb-0 md:w-1/2">
                  <div className="mt-4 space-y-3 md:mt-0 md:space-y-2">
                    <h2 className="text-outline text-3xl leading-none font-extrabold text-transparent select-none md:text-6xl">
                      {index + 1}
                    </h2>
                    <h3 className="group-hover:text-primary hoverEffect text-accent dark:text-accent-foreground text-xl leading-none font-bold md:text-3xl">
                      <Link href={project.liveUrl} target="_blank">
                        {project.title}
                      </Link>
                    </h3>
                    <Badge className="text-accent dark:text-accent-foreground">
                      {project.category}
                    </Badge>
                    <p className="text-accent/60 dark:text-accent-foreground/60 text-sm leading-6 md:text-base md:leading-normal">
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
                                className="bg-lightSky/5 border-lightSky/20 hover:bg-lightSky/20 hover:border-lightSky hover:text-hoverColor hoverEffect text-accent dark:text-accent-foreground border"
                              >
                                <ArrowUpRight />
                                <span className="sr-only">
                                  View Live Project
                                </span>
                              </Button>
                            </TooltipTrigger>
                          </Link>
                          <TooltipContent className="dark:bg-accent dark:text-accent-foreground bg-accent-foreground text-accent font-semibold">
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
                                  className="bg-lightSky/5 border-lightSky/20 hover:bg-lightSky/20 hover:border-lightSky hover:text-hoverColor hoverEffect text-accent dark:text-accent-foreground border"
                                >
                                  <Github />
                                  <span className="sr-only">
                                    View Github Repository
                                  </span>
                                </Button>
                              </TooltipTrigger>
                            </Link>
                            <TooltipContent className="dark:bg-accent dark:text-accent-foreground bg-accent-foreground text-accent font-semibold">
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
