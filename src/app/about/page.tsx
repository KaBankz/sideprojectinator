export default function About() {
  return (
    <main className="flex min-h-[calc(100vh-3.5rem)] flex-col items-center justify-center">
      <div className="container flex flex-col items-center justify-center gap-12 px-4 py-16">
        <div className="max-w-screen-lg text-justify">
          <h2 className="max-w-screen-xl text-6xl font-bold">
            SideProjectInator? What is that?
          </h2>
          <p className="text-4xl">
            Well, it&apos;s a project that I&apos;m working on to help you
            generate ideas for your next side project! Utilizing the power of
            A.I, you can get a random idea to help you get started on your next
            project. I&apos;m still working on it, so stay tuned for more
            updates!
          </p>
        </div>
      </div>
    </main>
  );
}
