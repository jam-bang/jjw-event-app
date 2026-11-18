---
description: 변경 사항을 검토하고 한국어 Conventional Commits 메시지로 커밋
allowed-tools: Bash(git status:*), Bash(git diff:*), Bash(git add:*), Bash(git commit:*)
---

1. `git status`, `git diff`로 변경 사항을 확인한다
2. `.env*`, 비밀 값이 포함된 파일은 절대 스테이징하지 않는다
3. 변경을 논리 단위로 나눌 수 있으면 나눠서 커밋을 제안한다
4. 메시지 형식: `<type>: <요약>` (feat, fix, refactor, docs, chore, test) + 본문에 변경 이유
5. 커밋 후 `git log --oneline -3`으로 결과를 보여준다
