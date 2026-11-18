export const EVENT_CATEGORIES = ["스터디", "세미나", "코드리뷰", "기타"] as const;
export type EventCategory = (typeof EVENT_CATEGORIES)[number];

export interface Profile {
  id: string;
  display_name: string;
}

export interface EventRow {
  id: string;
  host_id: string;
  title: string;
  description: string;
  category: EventCategory;
  location: string;
  starts_at: string;
  capacity: number;
  created_at: string;
}

/** 목록·상세 화면용: 주최자 이름과 참여자 수 포함 */
export interface EventSummary extends EventRow {
  host: Pick<Profile, "display_name"> | null;
  participant_count: number;
}

export interface Participant {
  user_id: string;
  created_at: string;
  profile: Pick<Profile, "display_name"> | null;
}
