export function BlogLayout({
  children,
  pageTitle,
  pageDesc,
}: {
  children: React.ReactNode
  pageTitle: string
  pageDesc?: string
}) {
  return (
    <main
      id='main-content'
      className='mx-auto w-full min-h-screen flex flex-col justify-center max-sm:my-0 -my-24 max-w-4xl px-4 pb-4 flex-grow'
    >
      <h1 className='text-2xl font-semibold sm:text-3xl my-6'>{pageTitle}</h1>
      {pageDesc && <p className='mb-6 mt-2 italic'>{pageDesc}</p>}
      {children}
    </main>
  )
}
