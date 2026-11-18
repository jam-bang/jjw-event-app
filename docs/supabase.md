# Supabase 사용 가이드

## 클라이언트
| 위치 | 파일 | 용도 |
|------|------|------|
| 서버 컴포넌트·Server Action | `lib/supabase/server.ts` | `await createClient()` (요청마다 새로 생성) |
| 클라이언트 컴포넌트 | `lib/supabase/client.ts` | 브라우저 인증 폼 |
| proxy | `lib/supabase/proxy.ts` | 세션 갱신 + 보호 경로 리다이렉트 |

## 테이블
| 테이블 | 설명 | RLS |
|--------|------|-----|
| `profiles` | 사용자 표시 이름 (가입 시 트리거로 생성) | 조회: 모두 / 수정: 본인 |
| `events` | 이벤트 | 조회: 모두 / 생성·수정·삭제: host_id = auth.uid() |
| `event_participants` | 참여 신청 | 조회: 모두 / 신청·취소: 본인 |

## 규칙
- 스키마 변경은 `supabase/migrations`에 새 SQL 파일로만 (`/new-migration` 커맨드)
- 정원 초과는 `check_event_capacity` 트리거가 차단 → 앱은 에러 메시지만 표시
- 환경 변수: `NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY` (공개용). service role 키는 사용·커밋 금지
- Auth URL 설정: Site URL = 배포 주소, Redirect URLs = `https://<배포 주소>/**`, `http://localhost:3000/**`
