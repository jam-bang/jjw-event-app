const fmt = new Intl.DateTimeFormat("ko-KR", {
  dateStyle: "medium",
  timeStyle: "short",
  timeZone: "Asia/Seoul",
});

export function formatDateTime(iso: string) {
  return fmt.format(new Date(iso));
}

/** ISO → datetime-local 입력값 (한국 시간) */
export function toLocalInput(iso: string) {
  const d = new Date(new Date(iso).getTime() + 9 * 60 * 60 * 1000);
  return d.toISOString().slice(0, 16);
}
