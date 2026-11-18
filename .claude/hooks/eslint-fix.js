#!/usr/bin/env node
// PostToolUse(Edit|Write|MultiEdit): 수정한 TS/TSX 파일에 eslint --fix 실행, 남은 오류는 Claude에게 피드백
const { execFileSync } = require("node:child_process");
let input = "";
process.stdin.on("data", (c) => (input += c));
process.stdin.on("end", () => {
  let filePath = "";
  try {
    filePath = JSON.parse(input).tool_input?.file_path ?? "";
  } catch {
    process.exit(0);
  }
  if (!/\.(ts|tsx)$/.test(filePath)) process.exit(0);
  try {
    execFileSync("npx", ["eslint", "--fix", filePath], { stdio: "pipe", shell: process.platform === "win32" });
  } catch (e) {
    console.error(`ESLint 오류가 남아 있습니다 (${filePath}):\n${e.stdout?.toString() ?? ""}`);
    process.exit(2);
  }
  process.exit(0);
});
