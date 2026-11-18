"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { EVENT_CATEGORIES } from "@/lib/types";

async function requireUser() {
  const supabase = await createClient();
  const { data } = await supabase.auth.getClaims();
  const userId = data?.claims?.sub as string | undefined;
  if (!userId) redirect("/auth/login");
  return { supabase, userId };
}

function back(path: string, error: string): never {
  redirect(`${path}?error=${encodeURIComponent(error)}`);
}

/** 폼 → 이벤트 값 (검증 포함) */
function parseEventForm(formData: FormData) {
  const title = String(formData.get("title") ?? "").trim();
  const description = String(formData.get("description") ?? "").trim();
  const category = String(formData.get("category") ?? "스터디");
  const location = String(formData.get("location") ?? "").trim();
  const startsAtLocal = String(formData.get("starts_at") ?? "");
  const capacity = Number(formData.get("capacity") ?? 0);

  if (!title || title.length > 100) return { error: "제목은 1~100자로 입력하세요." } as const;
  if (!(EVENT_CATEGORIES as readonly string[]).includes(category)) return { error: "카테고리를 확인하세요." } as const;
  if (!startsAtLocal) return { error: "일시를 입력하세요." } as const;
  if (!Number.isInteger(capacity) || capacity < 1 || capacity > 500) return { error: "정원은 1~500명입니다." } as const;

  // datetime-local 값은 한국 시간 기준으로 해석
  const starts_at = new Date(`${startsAtLocal}:00+09:00`).toISOString();
  return { value: { title, description, category, location, starts_at, capacity } } as const;
}

export async function createEvent(formData: FormData) {
  const { supabase, userId } = await requireUser();
  const parsed = parseEventForm(formData);
  if ("error" in parsed) back("/events/new", parsed.error!);

  const { data, error } = await supabase
    .from("events")
    .insert({ ...parsed.value, host_id: userId })
    .select("id")
    .single();
  if (error) back("/events/new", error.message);

  revalidatePath("/");
  redirect(`/events/${data.id}`);
}

export async function updateEvent(id: string, formData: FormData) {
  const { supabase } = await requireUser();
  const parsed = parseEventForm(formData);
  if ("error" in parsed) back(`/events/${id}/edit`, parsed.error!);

  // RLS가 주최자 본인만 수정하도록 보장 (0건이면 권한 없음)
  const { data, error } = await supabase.from("events").update(parsed.value).eq("id", id).select("id");
  if (error) back(`/events/${id}/edit`, error.message);
  if (!data?.length) back(`/events/${id}`, "주최자만 수정할 수 있습니다.");

  revalidatePath("/");
  revalidatePath(`/events/${id}`);
  redirect(`/events/${id}`);
}

export async function deleteEvent(id: string) {
  const { supabase } = await requireUser();
  const { data, error } = await supabase.from("events").delete().eq("id", id).select("id");
  if (error) back(`/events/${id}`, error.message);
  if (!data?.length) back(`/events/${id}`, "주최자만 삭제할 수 있습니다.");

  revalidatePath("/");
  redirect("/my");
}

export async function joinEvent(id: string) {
  const { supabase, userId } = await requireUser();
  const { error } = await supabase.from("event_participants").insert({ event_id: id, user_id: userId });
  if (error) {
    const message = error.code === "23505" ? "이미 신청했습니다." : error.message; // 정원 마감은 트리거 메시지
    back(`/events/${id}`, message);
  }
  revalidatePath(`/events/${id}`);
  revalidatePath("/");
}

export async function leaveEvent(id: string) {
  const { supabase, userId } = await requireUser();
  const { error } = await supabase.from("event_participants").delete().eq("event_id", id).eq("user_id", userId);
  if (error) back(`/events/${id}`, error.message);
  revalidatePath(`/events/${id}`);
  revalidatePath("/");
}

export async function updateProfile(formData: FormData) {
  const { supabase, userId } = await requireUser();
  const displayName = String(formData.get("display_name") ?? "").trim();
  if (!displayName || displayName.length > 30) back("/profile", "이름은 1~30자로 입력하세요.");

  const { error } = await supabase.from("profiles").update({ display_name: displayName }).eq("id", userId);
  if (error) back("/profile", error.message);
  revalidatePath("/", "layout");
  redirect("/profile?saved=1");
}
