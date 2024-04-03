"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { Icons } from "~/components/icons";
import { siteConfig } from "~/config/site";
import { cn } from "~/lib/utils";

export function MainNav() {
  return (
    <div className="mr-4 hidden md:flex">
      <Link
        href="/"
        className="mr-6 flex items-center space-x-2 text-foreground"
      >
        <Icons.logo className="h-6 w-6" />
        <span className="hidden font-bold sm:inline-block">
          {siteConfig.name}
        </span>
      </Link>
      <nav className="flex items-center gap-4 text-sm lg:gap-6">
        <NavItem href="/ideas">My Ideas</NavItem>
        <NavItem href="/about">About</NavItem>

        {/* <Link
          href={siteConfig.links.github}
          className={cn(
            "hidden text-foreground/60 transition-colors hover:text-foreground/80 lg:block",
          )}
        >
          GitHub
        </Link> */}
      </nav>
    </div>
  );
}

function NavItem({
  href,
  children,
}: {
  href: string;
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  return (
    <Link
      href={href}
      className={cn(
        "transition-colors hover:text-foreground/80",
        pathname?.startsWith(href) ? "text-foreground" : "text-foreground/60",
      )}
    >
      {children}
    </Link>
  );
}
