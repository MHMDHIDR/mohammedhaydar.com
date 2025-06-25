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
      className="mx-auto -my-24 flex min-h-screen w-full max-w-4xl flex-grow flex-col justify-center px-4 pb-20 leading-loose max-sm:my-0"
    >
      <h1 className="my-6 text-2xl font-semibold sm:text-3xl">{pageTitle}</h1>
      {pageDesc && <p className="mt-2 mb-6 italic">{pageDesc}</p>}
      {children}
    </main>
  );
}
