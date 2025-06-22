import ContactForm from "@/components/ContactForm";
import Container from "@/components/Container";
import PageLayout from "@/components/PageLayout";
import { Mail } from "lucide-react";
import Link from "next/link";

const infoData = [
  {
    title: "email",
    description: "info@mohammedhaydar.com",
    icon: <Mail className="h-6 w-6" />,
    href: "mailto:info@mohammedhaydar.com",
  },
];

export default function ContactPage() {
  return (
    <PageLayout>
      <Container className="px-0 pt-4 md:py-20">
        <div className="mb-16 text-center">
          <h1 className="mb-6 bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-4xl font-bold text-transparent md:text-6xl">
            Get In Touch
          </h1>
          <p className="mx-auto max-w-2xl text-lg leading-relaxed text-gray-600 md:text-xl dark:text-gray-300">
            {
              "Ready to bring your ideas to life? Let's collaborate and create something amazing together."
            }
          </p>
        </div>

        <div className="flex flex-col gap-12 lg:flex-row lg:gap-20">
          <div className="w-full lg:w-2/3">
            <div className="relative">
              <div className="absolute -top-4 -left-4 h-full w-full rounded-3xl bg-gradient-to-br from-blue-500/10 via-purple-500/10 to-pink-500/10 blur-xl"></div>

              <div className="relative rounded-2xl border border-gray-200/50 bg-white/80 p-8 shadow-2xl backdrop-blur-xl md:p-12 dark:border-white/10 dark:bg-gray-900/80">
                <ContactForm />
              </div>
            </div>
          </div>

          <div className="flex w-full flex-col justify-center lg:w-1/3">
            <div className="space-y-8">
              <div className="mb-8">
                <h2 className="mb-4 text-2xl font-bold text-gray-900 md:text-3xl dark:text-white">
                  {"Let's Connect"}
                </h2>
                <p className="leading-relaxed text-gray-600 dark:text-gray-300">
                  {
                    "Feel free to reach out through any of these channels. I'm always excited to discuss new projects and opportunities."
                  }
                </p>
              </div>

              <div className="space-y-6">
                {infoData?.map((item) => (
                  <div
                    key={item?.title}
                    className="group relative overflow-hidden rounded-xl border border-gray-200/50 bg-white/60 p-6 backdrop-blur-md transition-all duration-300 hover:-translate-y-1 hover:border-gray-300/70 hover:bg-white/80 hover:shadow-lg dark:border-white/10 dark:bg-white/5 dark:hover:border-white/20 dark:hover:bg-white/10"
                  >
                    <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-blue-500/5 via-purple-500/5 to-pink-500/5 opacity-0 transition-opacity duration-300 group-hover:opacity-100"></div>

                    <div className="relative z-10 flex items-center space-x-4">
                      <div className="rounded-xl bg-gradient-to-br from-blue-500/20 to-purple-500/20 p-4 backdrop-blur-sm transition-all duration-300 group-hover:scale-110 group-hover:from-blue-500/30 group-hover:to-purple-500/30">
                        <div className="text-blue-600 transition-colors duration-300 group-hover:text-blue-700 dark:text-blue-400 dark:group-hover:text-blue-300">
                          {item?.icon}
                        </div>
                      </div>

                      <div className="flex-1">
                        <h3 className="mb-1 text-sm font-semibold tracking-wider text-gray-500 uppercase transition-colors duration-300 group-hover:text-gray-600 dark:text-gray-400 dark:group-hover:text-gray-300">
                          {item?.title}
                        </h3>
                        <div className="font-medium text-gray-900 transition-colors duration-300 group-hover:text-blue-600 dark:text-white dark:group-hover:text-blue-400">
                          {item?.href ? (
                            <Link
                              href={item.href}
                              className="transition-all duration-300 hover:underline"
                            >
                              {item?.description}
                            </Link>
                          ) : (
                            item?.description
                          )}
                        </div>
                      </div>
                    </div>

                    <div className="absolute bottom-0 left-0 h-px w-full bg-gradient-to-r from-transparent via-blue-500/50 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100"></div>
                  </div>
                ))}
              </div>

              <div className="mt-12 rounded-xl border border-gray-200/50 bg-gradient-to-br from-blue-500/10 via-purple-500/10 to-pink-500/10 p-6 backdrop-blur-sm max-sm:mb-20 dark:border-white/10">
                <h3 className="mb-2 text-lg font-semibold text-gray-900 dark:text-white">
                  Quick Response Guaranteed
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-300">
                  I typically respond within 24 hours.
                </p>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </PageLayout>
  );
}
