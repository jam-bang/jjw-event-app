import Link from "next/link";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { EventGrid } from "@/components/events/event-grid";
import { listEvents } from "@/lib/data/events";
import { hasEnvVars } from "@/lib/utils";

export const dynamic = "force-dynamic";

export default async function HomePage() {
  if (!hasEnvVars) {
    return <p className="text-muted-foreground">Supabase 환경 변수를 설정하면 이벤트가 표시됩니다.</p>;
  }
  const [upcoming, past] = await Promise.all([listEvents("upcoming"), listEvents("past")]);

  return (
    <div className="space-y-10">
      <section className="flex flex-wrap items-end justify-between gap-4">
        <div className="space-y-1">
          <h1 className="text-2xl font-bold">다가오는 이벤트</h1>
          <p className="text-sm text-muted-foreground">팀 스터디·세미나·코드리뷰에 참여 신청하세요.</p>
        </div>
        <Button asChild>
          <Link href="/events/new">
            <Plus className="size-4" /> 이벤트 만들기
          </Link>
        </Button>
      </section>
      <EventGrid events={upcoming} empty="예정된 이벤트가 없습니다. 첫 이벤트를 만들어 보세요." />

      <section className="space-y-4">
        <h2 className="text-lg font-semibold text-muted-foreground">지난 이벤트</h2>
        <EventGrid events={past} empty="지난 이벤트가 없습니다." />
      </section>
    </div>
  );
}
