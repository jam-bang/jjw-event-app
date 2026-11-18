import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { EventGrid } from "@/components/events/event-grid";
import { getCurrentUserId, listMyEvents } from "@/lib/data/events";

export const metadata: Metadata = { title: "내 이벤트" };

export default async function MyEventsPage() {
  const userId = await getCurrentUserId();
  if (!userId) redirect("/auth/login?next=/my");
  const { hosted, joined } = await listMyEvents(userId);

  return (
    <div className="space-y-10">
      <section className="space-y-4">
        <h1 className="text-2xl font-bold">참여 신청한 이벤트</h1>
        <EventGrid events={joined} empty="신청한 이벤트가 없습니다." />
      </section>
      <section className="space-y-4">
        <h2 className="text-lg font-semibold">내가 주최한 이벤트</h2>
        <EventGrid events={hosted} empty="주최한 이벤트가 없습니다." />
      </section>
    </div>
  );
}
