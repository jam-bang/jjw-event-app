import Link from "next/link";
import { CalendarDays, MapPin, Users } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { formatDateTime } from "@/lib/format";
import type { EventSummary } from "@/lib/types";

export function EventCard({ event }: { event: EventSummary }) {
  const remaining = event.capacity - event.participant_count;
  return (
    <Link href={`/events/${event.id}`} className="group block h-full">
      <Card className="flex h-full flex-col transition group-hover:border-primary/50 group-hover:shadow-md">
        <CardHeader className="space-y-2 pb-3">
          <div className="flex items-center justify-between gap-2">
            <Badge variant="secondary">{event.category}</Badge>
            {remaining <= 0 ? (
              <Badge variant="destructive">마감</Badge>
            ) : (
              <span className="text-xs text-muted-foreground">남은 자리 {remaining}</span>
            )}
          </div>
          <CardTitle className="text-lg leading-snug group-hover:text-primary">{event.title}</CardTitle>
        </CardHeader>
        <CardContent className="mt-auto space-y-1.5 text-sm text-muted-foreground">
          <p className="flex items-center gap-1.5">
            <CalendarDays className="size-4" aria-hidden /> {formatDateTime(event.starts_at)}
          </p>
          {event.location && (
            <p className="flex items-center gap-1.5">
              <MapPin className="size-4" aria-hidden /> {event.location}
            </p>
          )}
          <p className="flex items-center gap-1.5">
            <Users className="size-4" aria-hidden /> {event.participant_count}/{event.capacity}명 · 주최{" "}
            {event.host?.display_name ?? "알 수 없음"}
          </p>
        </CardContent>
      </Card>
    </Link>
  );
}
