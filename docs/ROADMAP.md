# ROADMAP — Study Hub

> 순서 원칙: 골격 → 공통(데이터 계층) → 개별 기능 → 검증·배포

## Phase 1: MVP
### 1-1. 골격
- [x] 템플릿 정리(cacheComponents 끄기, 폰트 로컬화), 한국어 레이아웃·헤더
- [x] proxy: 보호 경로(/my, /profile, /events/new, /events/[id]/edit)만 로그인 리다이렉트
### 1-2. 데이터 계층
- [x] 마이그레이션: profiles·events·event_participants + RLS + 트리거(가입 시 프로필, 정원 초과 차단)
- [x] 타입 정의(`lib/types.ts`), 조회 함수(`lib/data/events.ts`), Server Actions(`app/actions.ts`)
### 1-3. 기능
- [x] 이벤트 목록(다가오는/지난), 상세 + 참여자
- [x] 참여 신청·취소
- [x] 이벤트 생성·수정·삭제 (주최자)
- [x] 내 이벤트, 프로필 수정
### 1-4. 검증·배포
- [x] lint · typecheck · build
- [ ] RLS 확인(비로그인 쓰기 차단), Vercel 배포, Auth Site URL·Redirect URL 설정

## Phase 2: 기능 확장
- [ ] 카테고리 필터, 검색
- [ ] 출석 체크(주최자), 이벤트 후기·자료 링크
- [ ] 캘린더(.ics) 내보내기
- [ ] 신청 마감 알림
