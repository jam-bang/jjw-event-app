import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toLocalInput } from "@/lib/format";
import { EVENT_CATEGORIES, type EventRow } from "@/lib/types";

const selectClass =
  "flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring";

export function EventForm({
  action,
  event,
  submitLabel,
}: {
  action: (formData: FormData) => Promise<void>;
  event?: EventRow;
  submitLabel: string;
}) {
  return (
    <form action={action} className="space-y-5">
      <div className="space-y-2">
        <Label htmlFor="title">제목</Label>
        <Input id="title" name="title" required maxLength={100} defaultValue={event?.title} placeholder="예: Next.js 16 스터디 3회차" />
      </div>
      <div className="grid gap-5 sm:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="category">카테고리</Label>
          <select id="category" name="category" defaultValue={event?.category ?? "스터디"} className={selectClass}>
            {EVENT_CATEGORIES.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>
        </div>
        <div className="space-y-2">
          <Label htmlFor="capacity">정원</Label>
          <Input id="capacity" name="capacity" type="number" min={1} max={500} required defaultValue={event?.capacity ?? 10} />
        </div>
        <div className="space-y-2">
          <Label htmlFor="starts_at">일시</Label>
          <Input
            id="starts_at"
            name="starts_at"
            type="datetime-local"
            required
            defaultValue={event ? toLocalInput(event.starts_at) : undefined}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="location">장소</Label>
          <Input id="location" name="location" defaultValue={event?.location} placeholder="예: 7층 회의실 / Teams" />
        </div>
      </div>
      <div className="space-y-2">
        <Label htmlFor="description">설명</Label>
        <textarea
          id="description"
          name="description"
          rows={6}
          defaultValue={event?.description}
          className="w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
          placeholder="준비물, 사전 과제, 진행 방식"
        />
      </div>
      <Button type="submit">{submitLabel}</Button>
    </form>
  );
}
