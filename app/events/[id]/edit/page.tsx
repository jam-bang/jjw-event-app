import type { Metadata } from "next";
import { notFound, redirect } from "next/navigation";
import { updateEvent } from "@/app/actions";
import { EventForm } from "@/components/events/event-form";
import { FormMessage } from "@/components/events/form-message";
import { getCurrentUserId, getEvent } from "@/lib/data/events";

export const metadata: Metadata = { title: "이벤트 수정" };

type Props = { params: Promise<{ id: string }>; searchParams: Promise<{ error?: string }> };

export default async function EditEventPage({ params, searchParams }: Props) {
  const { id } = await params;
  const { error } = await searchParams;
  const [event, userId] = await Promise.all([getEvent(id), getCurrentUserId()]);
  if (!event) notFound();
  if (event.host_id !== userId) redirect(`/events/${id}?error=${encodeURIComponent("주최자만 수정할 수 있습니다.")}`);

  return (
    <div className="mx-auto max-w-2xl space-y-6">
      <h1 className="text-2xl font-bold">이벤트 수정</h1>
      <FormMessage error={error} />
      <EventForm action={updateEvent.bind(null, id)} event={event} submitLabel="저장" />
    </div>
  );
}
