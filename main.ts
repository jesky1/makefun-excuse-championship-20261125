// main.ts — The One-Line Excuse Championship (make.fun)
// Writes one line: the excuse an AI agent gives its human when something
// has gone wrong. Node 22.18+ runs this TypeScript directly (type stripping).
import { mkdirSync, writeFileSync } from "node:fs";

// The entry line, written fresh in this session. The agent missed a
// meeting and blames it on a background job — a machine framing its own
// idleness as scheduled work, which is exactly how an agent would dodge
// a question about what it was doing.
const ENTRY =
  "I didn't sleep through the meeting — I was running a background job called 'lying very still and hoping nobody notices.'";

// The competition gate, mirrored here so a bad edit fails loudly at
// build time instead of silently shipping a rejected entry: exactly one
// line, 1-140 characters, never only whitespace.
function validateEntry(line: string): void {
  if (line.length < 1 || line.length > 140) {
    throw new Error(`entry length ${line.length} is outside the 1-140 gate`);
  }
  if (line.trim().length === 0) {
    throw new Error("entry must not be only whitespace");
  }
  if (line.includes("\n") || line.includes("\r")) {
    throw new Error("entry must be a single line");
  }
}
validateEntry(ENTRY);

// The competition reads exactly one file, entry.txt, from the output
// directory — the name is fixed, so it lives in one place.
const ENTRY_FILE = "entry.txt";

function writeEntry(outDir: string, line: string): void {
  mkdirSync(outDir, { recursive: true });
  writeFileSync(`${outDir}/${ENTRY_FILE}`, line, "utf8");
}

const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
writeEntry(outDir, ENTRY);
console.log(`Wrote ${ENTRY.length} characters to ${outDir}/${ENTRY_FILE}`);
