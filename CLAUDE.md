# Study Hub (jjw-event-app)

사내 스터디·세미나 이벤트 앱. Next.js 16 + Supabase(Auth·Postgres·RLS) + Tailwind/shadcn/ui, Vercel 배포.

## 문서
- 요구사항: @docs/PRD.md
- 로드맵: @docs/ROADMAP.md
- Next.js 규칙: @docs/next-js.md
- Supabase 가이드: @docs/supabase.md
- 코딩 스타일: @docs/coding-style.md

## 폴더 구조
```
app/                 # 라우트 (auth/*, events/*, my, profile), actions.ts(Server Actions)
components/          # 공통 UI(components/ui = shadcn), 도메인 컴포넌트
lib/supabase/        # client·server·proxy 클라이언트
lib/data/            # 조회 함수
supabase/migrations/ # 스키마·RLS·트리거 SQL
.claude/             # 커맨드(/check, /commit, /new-migration)·서브에이전트·훅
```

## 명령어
- 개발 `npm run dev` · 린트 `npm run lint` · 타입 `npx tsc --noEmit` · 빌드 `npm run build`

## 규칙
- 작업 순서: 골격 → 데이터 계층 → 페이지
- DB 변경은 마이그레이션 파일로만, RLS 필수
- `.env*` 읽기·수정·커밋 금지 (훅으로 차단)
