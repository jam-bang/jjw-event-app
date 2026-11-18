import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { CalendarDays, MapPin, Pencil, Users } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { FormMessage } from "@/components/events/form-message";
import { deleteEvent, joinEvent, leaveEvent } from "@/app/actions";
import { getCurrentUserId, getEvent, listParticipants } from "@/lib/data/events";
import { formatDateTime } from "@/lib/format";

type Props = { params: Promise<{ id: string }>; searchParams: Promise<{ error?: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const event = await getEvent((await params).id);
  return { title: event?.title ?? "이벤트 없음" };
}

export default async function EventDetailPage({ params, searchParams }: Props) {
  const { id } = await params;
  const { error } = await searchParams;
  const [event, participants, userId] = await Promise.all([getEvent(id), listParticipants(id), getCurrentUserId()]);
  if (!event) notFound();

  const isHost = userId === event.host_id;
  const joined = participants.some((p) => p.user_id === userId);
  const full = event.participant_count >= event.capacity;
  const past = new Date(event.starts_at) < new Date();

  return (
    <article className="mx-auto max-w-3xl space-y-8">
      <header className="space-y-3 border-b pb-6">
        <Badge variant="secondary">{event.category}</Badge>
        <h1 className="text-3xl font-bold tracking-tight">{event.title}</h1>
        <div className="space-y-1 text-sm text-muted-foreground">
          <p className="flex items-center gap-1.5"><CalendarDays className="size-4" aria-hidden /> {formatDateTime(event.starts_at)}</p>
          {event.location && <p className="flex items-center gap-1.5"><MapPin className="size-4" aria-hidden /> {event.location}</p>}
          <p className="flex items-center gap-1.5"><Users className="size-4" aria-hidden /> {event.participant_count}/{event.capacity}명 · 주최 {event.host?.display_name}</p>
        </div>
      </header>

      <FormMessage error={error} />

      <div className="flex flex-wrap gap-2">
        {!past && !userId && (
          <Button asChild>
            <Link href={`/auth/login?next=/events/${id}`}>로그인하고 참여 신청</Link>
          </Button>
        )}
        {!past && userId && !joined && (
          <form action={joinEvent.bind(null, id)}>
            <Button type="submit" disabled={full}>{full ? "정원 마감" : "참여 신청"}</Button>
          </form>
        )}
        {!past && joined && (
          <form action={leaveEvent.bind(null, id)}>
            <Button type="submit" variant="outline">신청 취소</Button>
          </form>
        )}
        {isHost && (
          <>
            <Button asChild variant="outline">
              <Link href={`/events/${id}/edit`}><Pencil className="size-4" /> 수정</Link>
            </Button>
            <form action={deleteEvent.bind(null, id)}>
              <Button type="submit" variant="destructive">삭제</Button>
            </form>
          </>
        )}
      </div>

      {event.description && <p className="whitespace-pre-wrap leading-7">{event.description}</p>}

      <section className="space-y-3">
        <h2 className="font-semibold">참여자 {participants.length}명</h2>
        {participants.length === 0 ? (
          <p className="text-sm text-muted-foreground">아직 신청한 사람이 없습니다.</p>
        ) : (
          <ul className="flex flex-wrap gap-2">
            {participants.map((p) => (
              <li key={p.user_id} className="rounded-full border px-3 py-1 text-sm">{p.profile?.display_name ?? "참여자"}</li>
            ))}
          </ul>
        )}
      </section>
    </article>
  );
}
