import { createClient } from "@/lib/supabase/server";
import type { EventSummary, Participant, Profile } from "@/lib/types";

const SUMMARY_SELECT = "*, host:profiles!events_host_id_fkey(display_name), event_participants(count)";

type SummaryRow = Omit<EventSummary, "participant_count"> & { event_participants: { count: number }[] };

function toSummary(row: SummaryRow): EventSummary {
  const { event_participants, ...rest } = row;
  return { ...rest, participant_count: event_participants?.[0]?.count ?? 0 };
}

/** 현재 로그인 사용자 id (없으면 null) */
export async function getCurrentUserId(): Promise<string | null> {
  const supabase = await createClient();
  const { data } = await supabase.auth.getClaims();
  return (data?.claims?.sub as string | undefined) ?? null;
}

/** 다가오는 / 지난 이벤트 */
export async function listEvents(when: "upcoming" | "past"): Promise<EventSummary[]> {
  const supabase = await createClient();
  const now = new Date().toISOString();
  const query = supabase.from("events").select(SUMMARY_SELECT);
  const { data, error } =
    when === "upcoming"
      ? await query.gte("starts_at", now).order("starts_at", { ascending: true })
      : await query.lt("starts_at", now).order("starts_at", { ascending: false }).limit(20);
  if (error) throw new Error(error.message);
  return (data as SummaryRow[]).map(toSummary);
}

export async function getEvent(id: string): Promise<EventSummary | null> {
  const supabase = await createClient();
  const { data, error } = await supabase.from("events").select(SUMMARY_SELECT).eq("id", id).maybeSingle();
  if (error) throw new Error(error.message);
  return data ? toSummary(data as SummaryRow) : null;
}

export async function listParticipants(eventId: string): Promise<Participant[]> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("event_participants")
    .select("user_id, created_at, profile:profiles(display_name)")
    .eq("event_id", eventId)
    .order("created_at", { ascending: true });
  if (error) throw new Error(error.message);
  return data as unknown as Participant[];
}

/** 내가 주최한 / 참여 신청한 이벤트 */
export async function listMyEvents(userId: string) {
  const supabase = await createClient();
  const [hosted, joined] = await Promise.all([
    supabase.from("events").select(SUMMARY_SELECT).eq("host_id", userId).order("starts_at", { ascending: false }),
    supabase
      .from("event_participants")
      .select(`event:events(${SUMMARY_SELECT})`)
      .eq("user_id", userId),
  ]);
  if (hosted.error) throw new Error(hosted.error.message);
  if (joined.error) throw new Error(joined.error.message);
  return {
    hosted: (hosted.data as SummaryRow[]).map(toSummary),
    joined: (joined.data as unknown as { event: SummaryRow | null }[])
      .flatMap((r) => (r.event ? [toSummary(r.event)] : []))
      .sort((a, b) => b.starts_at.localeCompare(a.starts_at)),
  };
}

export async function getProfile(userId: string): Promise<Profile | null> {
  const supabase = await createClient();
  const { data } = await supabase.from("profiles").select("id, display_name").eq("id", userId).maybeSingle();
  return data;
}
