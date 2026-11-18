import type { Metadata } from "next";
import { createEvent } from "@/app/actions";
import { EventForm } from "@/components/events/event-form";
import { FormMessage } from "@/components/events/form-message";

export const metadata: Metadata = { title: "이벤트 만들기" };

export default async function NewEventPage({ searchParams }: { searchParams: Promise<{ error?: string }> }) {
  const { error } = await searchParams;
  return (
    <div className="mx-auto max-w-2xl space-y-6">
      <h1 className="text-2xl font-bold">이벤트 만들기</h1>
      <FormMessage error={error} />
      <EventForm action={createEvent} submitLabel="등록" />
    </div>
  );
}
