import Link from "next/link";
import { Suspense } from "react";
import { CalendarHeart } from "lucide-react";
import { AuthButton } from "@/components/auth-button";
import { EnvVarWarning } from "@/components/env-var-warning";
import { hasEnvVars } from "@/lib/utils";

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-10 border-b bg-background/90 backdrop-blur">
      <div className="mx-auto flex h-14 max-w-5xl items-center justify-between gap-4 px-4 text-sm">
        <div className="flex items-center gap-5">
          <Link href="/" className="flex items-center gap-2 font-semibold">
            <CalendarHeart className="size-5 text-primary" aria-hidden />
            Study Hub
          </Link>
          <nav className="hidden gap-4 text-muted-foreground sm:flex">
            <Link href="/" className="hover:text-foreground">이벤트</Link>
            <Link href="/my" className="hover:text-foreground">내 이벤트</Link>
            <Link href="/events/new" className="hover:text-foreground">이벤트 만들기</Link>
          </nav>
        </div>
        {hasEnvVars ? (
          <Suspense>
            <AuthButton />
          </Suspense>
        ) : (
          <EnvVarWarning />
        )}
      </div>
    </header>
  );
}
