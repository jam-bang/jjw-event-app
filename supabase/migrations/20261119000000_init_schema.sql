-- Study Hub 초기 스키마: profiles · events · event_participants + RLS + 트리거

-- 1) profiles
create table public.profiles (
  id uuid primary key references auth.users (id) on delete cascade,
  display_name text not null default '',
  created_at timestamptz not null default now()
);
alter table public.profiles enable row level security;
create policy "profiles_select_all" on public.profiles for select using (true);
create policy "profiles_update_own" on public.profiles for update using (auth.uid() = id) with check (auth.uid() = id);

-- 가입 시 프로필 자동 생성
create or replace function public.handle_new_user()
returns trigger language plpgsql security definer set search_path = public as $$
begin
  insert into public.profiles (id, display_name)
  values (new.id, coalesce(new.raw_user_meta_data ->> 'display_name', split_part(new.email, '@', 1)));
  return new;
end;
$$;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_user();

-- 2) events
create table public.events (
  id uuid primary key default gen_random_uuid(),
  host_id uuid not null references public.profiles (id) on delete cascade,
  title text not null check (char_length(title) between 1 and 100),
  description text not null default '',
  category text not null default '스터디' check (category in ('스터디', '세미나', '코드리뷰', '기타')),
  location text not null default '',
  starts_at timestamptz not null,
  capacity int not null default 10 check (capacity between 1 and 500),
  created_at timestamptz not null default now()
);
create index events_starts_at_idx on public.events (starts_at);
alter table public.events enable row level security;
create policy "events_select_all" on public.events for select using (true);
create policy "events_insert_own" on public.events for insert with check (auth.uid() = host_id);
create policy "events_update_own" on public.events for update using (auth.uid() = host_id) with check (auth.uid() = host_id);
create policy "events_delete_own" on public.events for delete using (auth.uid() = host_id);

-- 3) event_participants
create table public.event_participants (
  event_id uuid not null references public.events (id) on delete cascade,
  user_id uuid not null references public.profiles (id) on delete cascade,
  created_at timestamptz not null default now(),
  primary key (event_id, user_id)
);
alter table public.event_participants enable row level security;
create policy "participants_select_all" on public.event_participants for select using (true);
create policy "participants_insert_own" on public.event_participants for insert with check (auth.uid() = user_id);
create policy "participants_delete_own" on public.event_participants for delete using (auth.uid() = user_id);

-- 정원 초과 차단
create or replace function public.check_event_capacity()
returns trigger language plpgsql security definer set search_path = public as $$
declare
  cap int;
  cnt int;
begin
  select capacity into cap from public.events where id = new.event_id for update;
  select count(*) into cnt from public.event_participants where event_id = new.event_id;
  if cnt >= cap then
    raise exception '정원이 마감되었습니다' using errcode = 'P0001';
  end if;
  return new;
end;
$$;
create trigger before_participant_insert
  before insert on public.event_participants
  for each row execute function public.check_event_capacity();
