import type { EventSummary } from "@/lib/types";
import { EventCard } from "./event-card";

export function EventGrid({ events, empty }: { events: EventSummary[]; empty: string }) {
  if (events.length === 0) {
    return <p className="rounded-lg border border-dashed py-10 text-center text-sm text-muted-foreground">{empty}</p>;
  }
  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {events.map((e) => (
        <EventCard key={e.id} event={e} />
      ))}
    </div>
  );
}
