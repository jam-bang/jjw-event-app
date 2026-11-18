# Next.js 규칙 (Next.js 16 App Router)

- 기본은 Server Component. 상태·이벤트 핸들러가 필요할 때만 `"use client"`
- 데이터 쓰기는 Server Action(`app/actions.ts`)으로 처리하고, 끝나면 `revalidatePath`
- 페이지 `params`·`searchParams`는 Promise이므로 `await` 후 사용
- 쿠키 기반 세션을 쓰므로 `cacheComponents`는 사용하지 않는다 (동적 렌더링)
- 인증 리다이렉트는 `proxy.ts`(구 middleware)에서 보호 경로에만 적용
- 폼 검증 실패는 `redirect('/path?error=...')` 또는 `useActionState`로 메시지 표시
- 이미지·폰트는 외부 다운로드 없이 빌드되도록 `geist` npm 패키지 사용
