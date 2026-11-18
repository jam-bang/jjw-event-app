# Study Hub (jjw-event-app)

사내 스터디·세미나·코드리뷰 이벤트를 만들고 참여 신청하는 앱입니다. Next.js 16 + Supabase(Auth·Postgres·RLS).

- 기획: [docs/PRD.md](docs/PRD.md) · 로드맵: [docs/ROADMAP.md](docs/ROADMAP.md) · Claude 컨텍스트: [CLAUDE.md](CLAUDE.md)

## 기능
- 다가오는/지난 이벤트 목록(남은 자리·마감 표시), 상세 + 참여자
- 참여 신청/취소 (정원 초과는 DB 트리거가 차단)
- 이벤트 생성·수정·삭제 (주최자 본인만, RLS)
- 내 이벤트(신청/주최), 프로필 표시 이름 수정
- 목록·상세는 비로그인 공개, /my·/profile·생성·수정은 로그인 필요

## 실행
1. Supabase 프로젝트 생성 → SQL Editor에서 `supabase/migrations/20261119000000_init_schema.sql` 실행
2. `.env.example`을 `.env.local`로 복사해 `NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY` 입력
3. `npm install && npm run dev`

## 배포 (Vercel)
- 환경 변수 2개 등록 (공개용 값이므로 Sensitive 끄기)
- Supabase › Authentication › URL Configuration: Site URL = 배포 주소, Redirect URLs = `https://<배포 주소>/**`
