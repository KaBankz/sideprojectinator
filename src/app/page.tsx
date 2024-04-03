import Link from "next/link";
import { CreatePost } from "~/app/_components/create-post";
import { buttonVariants } from "~/components/ui/button";
import { cn } from "~/lib/utils";
import { getServerAuthSession } from "~/server/auth";
import { api } from "~/trpc/server";

export default async function Home() {
  // const hello = await api.post.hello({ text: "from tRPC" });

  return (
    <main className="flex min-h-[calc(100vh-3.5rem)] flex-col items-center justify-start">
      <div className="container mt-20 flex flex-col items-center justify-center gap-12 px-4 py-16">
        <div className="flex flex-col items-center justify-center">
          <h1 className="text-5xl font-extrabold tracking-tight sm:text-[5rem]">
            SideProject<span className="text-red-600">Inator</span>
          </h1>
          <h2 className="text-4xl font-semibold italic">
            ˗ˏˋ Where side projects are born ˎˊ˗
          </h2>
        </div>

        <div className="group relative inline-flex">
          <div className="absolute -inset-2 animate-pulse rounded-xl bg-gradient-to-r from-[#44BCFF] via-[#FF44EC] to-[#FF675E] bg-top blur-xl transition-all duration-1000 group-hover:-inset-3"></div>
          <Link
            className={cn(
              buttonVariants({ variant: "default" }),
              "relative rounded-xl p-8 text-lg font-bold transition-all duration-200 group-hover:scale-105",
            )}
            href="/generate"
          >
            I&apos;m Feeling Lucky!
          </Link>
        </div>

        <div className="mt-48 flex flex-col items-center justify-center gap-2">
          <p className="text-center text-2xl font-light">
            Utilize the power of A.I to generate ideas for your next side
            project!
          </p>
        </div>

        {/* <div className="flex flex-col items-center gap-2">
          <p className="text-2xl">
            {hello ? hello.greeting : "Loading tRPC query..."}
          </p>
        </div> */}

        {/* <CrudShowcase /> */}
      </div>
    </main>
  );
}

async function CrudShowcase() {
  const session = await getServerAuthSession();
  if (!session?.user) return null;

  const latestPost = await api.post.getLatest();

  return (
    <div className="w-full max-w-xs">
      {latestPost ? (
        <p className="truncate">Your most recent post: {latestPost.name}</p>
      ) : (
        <p>You have no posts yet.</p>
      )}

      <CreatePost />
    </div>
  );
}
