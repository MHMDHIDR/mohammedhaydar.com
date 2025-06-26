import { SecondaryHeading } from "@/components/ui/cover";

export function BlogLayout({
  children,
  pageTitle,
  pageDesc,
}: {
  children: React.ReactNode;
  pageTitle: string;
  pageDesc?: string;
}) {
  return (
    <main
      id="main-content"
      className="mx-auto -my-24 mb-20 flex min-h-screen w-full max-w-4xl flex-grow flex-col justify-center px-4 pb-20 leading-10 max-sm:my-0"
    >
      <SecondaryHeading>{pageTitle}</SecondaryHeading>
      {pageDesc && <p className="mt-2 mb-6 italic">{pageDesc}</p>}
      {children}
    </main>
  );
}
