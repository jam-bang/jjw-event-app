-- 테이블 권한(GRANT) 보완: RLS와 별개로 anon/authenticated 역할에 기본 권한이 필요하다.
-- 실제 접근 범위는 기존 RLS 정책이 계속 제한한다.

grant usage on schema public to anon, authenticated;

-- 조회: 목록·상세는 비로그인도 공개
grant select on public.profiles to anon, authenticated;
grant select on public.events to anon, authenticated;
grant select on public.event_participants to anon, authenticated;

-- 쓰기: 로그인 사용자만 (본인 데이터 제한은 RLS 정책)
grant update on public.profiles to authenticated;
grant insert, update, delete on public.events to authenticated;
grant insert, delete on public.event_participants to authenticated;
