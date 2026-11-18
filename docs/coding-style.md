# 코딩 스타일

- TypeScript strict, `any` 금지, 도메인 타입은 `lib/types.ts`
- 파일명: 컴포넌트 kebab-case(`event-card.tsx`), 컴포넌트명 PascalCase
- import 경로는 `@/` 별칭 사용
- UI 문구·주석·커밋 메시지는 한국어
- 커밋: Conventional Commits (`feat:`, `fix:`, `refactor:`, `docs:`, `chore:`)
- 날짜 표시는 `Intl.DateTimeFormat('ko-KR', { timeZone: 'Asia/Seoul' })`
- 커밋 전 `/check` (lint · typecheck · build) 통과
