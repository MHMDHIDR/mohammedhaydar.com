import { type Metadata } from "next";
import { SITE } from "@/constants";

interface PageSEOProps {
  title: string;
  description?: string;
  image?: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [key: string]: any;
}

export function generateMetadata({
  title,
  description,
  image,
  ...rest
}: PageSEOProps): Metadata {
  return {
    title,
    description: description ?? SITE.desc,
    openGraph: {
      title: `${title} | ${SITE.title}`,
      description: description ?? SITE.desc,
      url: "./",
      siteName: SITE.title,
      images: image ? [image] : [SITE.socialBanner],
      locale: "en_US",
      type: "website",
    },
    twitter: {
      title: `${title} | ${SITE.title}`,
      card: "summary_large_image",
      images: image ? [image] : [SITE.socialBanner],
    },
    ...rest,
  };
}
