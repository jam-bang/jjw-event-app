import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex flex-col items-center gap-3 py-20 text-center">
      <p className="text-5xl font-bold text-primary">404</p>
      <p className="text-muted-foreground">이벤트를 찾을 수 없습니다.</p>
      <Link href="/" className="text-sm underline underline-offset-4">목록으로</Link>
    </div>
  );
}
