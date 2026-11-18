#!/usr/bin/env node
// PreToolUse(Edit|Write|MultiEdit): .env 파일과 lock 파일 수정 차단 (exit 2 = 차단)
let input = "";
process.stdin.on("data", (c) => (input += c));
process.stdin.on("end", () => {
  let filePath = "";
  try {
    filePath = JSON.parse(input).tool_input?.file_path ?? "";
  } catch {
    process.exit(0);
  }
  if (/\.env\.example$/.test(filePath)) process.exit(0);
  const blocked = [/(^|[\\/])\.env(\.[^\\/]*)?$/, /(^|[\\/])package-lock\.json$/];
  if (blocked.some((re) => re.test(filePath))) {
    console.error(`🔒 보호 파일은 수정할 수 없습니다: ${filePath}\n.env는 사람이 직접, lock 파일은 npm install로만 변경하세요.`);
    process.exit(2);
  }
  process.exit(0);
});
