# PRD — Study Hub (사내 스터디·세미나 이벤트 앱)

## 1. 개요
| 항목 | 내용 |
|------|------|
| 프로젝트명 | Study Hub (jjw-event-app) |
| 목적 | 팀 내 기술 스터디·세미나·코드리뷰 데이를 등록하고, 구성원이 참여 신청하는 가벼운 이벤트 앱 |
| 목표 | 메신저 공지 + 엑셀 취합으로 하던 참석 관리를 앱 하나로 대체, 정원 관리 자동화 |
| 대상 | 공공 SI 사업 수행 팀원(개발자·PL·PM) |

## 2. 핵심 기능
| # | 기능 | MVP |
|---|------|-----|
| F1 | 이메일 회원가입·로그인 (Supabase Auth) | ✅ |
| F2 | 이벤트 목록: 다가오는 / 지난 이벤트, 남은 자리 표시 | ✅ |
| F3 | 이벤트 상세: 일시·장소·설명·참여자 목록 | ✅ |
| F4 | 참여 신청 / 취소, 정원 초과 시 자동 마감 | ✅ |
| F5 | 이벤트 생성·수정·삭제 (주최자 본인만) | ✅ |
| F6 | 내 이벤트: 주최한 / 참여 신청한 이벤트 | ✅ |
| F7 | 프로필(표시 이름) 수정 | ✅ |
| F8 | 카테고리 필터(스터디/세미나/코드리뷰/기타) | 확장 |
| F9 | 참석 체크(출석), 이벤트 후기 | 확장 |

## 3. 기술 스택
- Next.js 16 (App Router, Server Components, Server Actions), TypeScript
- Supabase: Auth, PostgreSQL, RLS, 트리거 (`@supabase/ssr` 쿠키 세션)
- Tailwind CSS, shadcn/ui, Lucide, next-themes
- 배포: Vercel

## 4. 데이터 모델
- `profiles` (id = auth.users.id, display_name)
- `events` (id, host_id, title, description, category, location, starts_at, capacity)
- `event_participants` (event_id, user_id, created_at) — PK(event_id, user_id)

## 5. 사용자 스토리
- 팀원으로서, 이번 주 열리는 스터디를 한눈에 보고 싶다 → 다가오는 이벤트 목록
- 팀원으로서, 클릭 한 번으로 참여 신청·취소하고 싶다 → 참여 버튼, 남은 자리
- 주최자로서, 정원을 넘겨 신청받지 않고 싶다 → DB 트리거로 정원 초과 차단
- 주최자로서, 일정이 바뀌면 직접 수정하고 싶다 → 본인 이벤트만 수정·삭제
- 비로그인 사용자로서, 어떤 행사가 있는지는 먼저 보고 싶다 → 목록·상세는 공개, 신청은 로그인 필요

## 6. 비기능 요구사항
- 모든 테이블 RLS 적용, 쓰기는 본인 데이터만
- `NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY`만 클라이언트 노출 (service role 키 사용 금지)
- lint · typecheck · build 통과 상태로만 커밋
