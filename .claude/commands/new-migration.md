---
description: RLS 정책을 포함한 Supabase 마이그레이션 SQL 파일 생성
argument-hint: <마이그레이션 이름> [설명]
---

`supabase/migrations/<YYYYMMDDHHmmss>_$1.sql` 파일을 만들어줘. 설명: $2

규칙:
1. 테이블을 만들면 반드시 `alter table ... enable row level security;`와 select/insert/update/delete 정책을 함께 작성한다
2. 정책은 `auth.uid()` 기준으로 작성하고, 공개 조회가 필요한 경우에만 `using (true)`를 쓴다
3. `created_at timestamptz default now()`를 기본으로 두고, FK에는 `on delete cascade` 여부를 명시한다
4. 기존 마이그레이션 파일은 수정하지 않는다 (항상 새 파일)
5. 마지막에 docs/supabase.md의 테이블 목록을 갱신한다
