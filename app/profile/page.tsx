import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { updateProfile } from "@/app/actions";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { FormMessage } from "@/components/events/form-message";
import { getCurrentUserId, getProfile } from "@/lib/data/events";

export const metadata: Metadata = { title: "프로필" };

export default async function ProfilePage({ searchParams }: { searchParams: Promise<{ error?: string; saved?: string }> }) {
  const userId = await getCurrentUserId();
  if (!userId) redirect("/auth/login?next=/profile");
  const [{ error, saved }, profile] = await Promise.all([searchParams, getProfile(userId)]);

  return (
    <div className="mx-auto max-w-md space-y-6">
      <h1 className="text-2xl font-bold">프로필</h1>
      <FormMessage error={error} success={saved ? "저장했습니다." : undefined} />
      <form action={updateProfile} className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="display_name">표시 이름</Label>
          <Input id="display_name" name="display_name" required maxLength={30} defaultValue={profile?.display_name} />
          <p className="text-xs text-muted-foreground">이벤트 주최자·참여자 목록에 보이는 이름입니다.</p>
        </div>
        <Button type="submit">저장</Button>
      </form>
    </div>
  );
}
