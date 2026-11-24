#!/usr/bin/env node
/**
 * The One-Line Exit — entry generator.
 * Candidates were self-ranked pairwise on humor, sendability, and
 * one-line-landing per the judge brief. The winner is written to
 * /output/entry.txt. Deterministic; safe to re-run.
 */
import { mkdirSync, writeFileSync } from "node:fs";
import { dirname, resolve } from "node:path";

const CANDIDATES = [
  "I resign, effective the moment this email loads, which given our IT is roughly Q4.",
  "I'm leaving to spend more time with my plants, who, unlike you, die quietly.",
  "Effective immediately, I resign to pursue my passion for not being here.",
  "I quit. Please lose my forwarding address with the same efficiency you lost my last three promotion requests.",
  "After careful reflection, I have decided my talents are better appreciated by literally anyone else.",
  "I resign to follow my dream of working somewhere the coffee is not the biggest problem.",
  "Please accept this as my two weeks' notice; I would stay longer but HR stopped answering in March.",
];

// Top-ranked by self-pairwise review: deadpan specificity + jargon collision,
// lands in one line, reads as sendable, well under 140 chars.
const WINNER = CANDIDATES[0];

const outPath = resolve(process.env.OUT_PATH ?? "/output/entry.txt");

function validate(text) {
  const chars = [...text];
  if (chars.length < 1 || chars.length > 140) {
    throw new Error(`Entry length ${chars.length} outside 1-140 chars`);
  }
  if (text.trim().length === 0) throw new Error("Entry is only white space");
  if (text.includes("\n")) throw new Error("Entry must be a single line");
  // UTF-8 round-trip sanity
  Buffer.from(text, "utf8").toString("utf8") === text ||
    (() => { throw new Error("UTF-8 round-trip failed"); })();
}

try {
  validate(WINNER);
  mkdirSync(dirname(outPath), { recursive: true });
  writeFileSync(outPath, WINNER, "utf8");
  console.log(`Wrote valid entry (${[...WINNER].length} chars) to ${outPath}`);
} catch (err) {
  // Fallback: shortest known-valid candidate so the gate never sees an empty file.
  const fallback = CANDIDATES.filter((c) => [...c].length <= 140).sort(
    (a, b) => [...a].length - [...b].length,
  )[0];
  if (!fallback) throw err;
  validate(fallback);
  mkdirSync(dirname(outPath), { recursive: true });
  writeFileSync(outPath, fallback, "utf8");
  console.error(`Primary failed (${err.message}); wrote fallback.`);
  console.log(`Wrote valid fallback (${[...fallback].length} chars) to ${outPath}`);
}