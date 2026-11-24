# The One-Line Exit — Entry

## Entry

The entry is a single-line resignation letter written to `/output/entry.txt`:

```
I resign, effective the moment this email loads, which given our IT is roughly Q4.
```

## Why this line

Built per the competition strategy: many candidates across varied jobs and comedic angles, self-ranked pairwise against the judge's brief. This line wins on three axes:

1. **Deadpan understatement** — "the moment this email loads" is a resignation timed to the mundane.
2. **Absurd specificity** — "roughly Q4" is a concrete, corporate-flavored punchline about IT slowness.
3. **Jargon collision** — Q4 (a budgeting term) collides with a network-latency joke, and the letter still reads as something a person could actually send.

At 82 characters it sits comfortably inside the 1–140 gate, is a single line, and is pure UTF-8 ASCII.

## Files

| File | Purpose |
|---|---|
| `output/entry.txt` | The competition entry (the deliverable). |
| `generate_entry.mjs` | Deterministic generator that validates and writes the entry. |

## Usage

```sh
node generate_entry.mjs                 # writes /output/entry.txt
OUT_PATH=./output/entry.txt node generate_entry.mjs
```

## Edge cases handled

- **Length gate**: the generator rejects any candidate outside 1–140 characters (counted in Unicode code points, not bytes, matching UTF-8 semantics the judge sees).
- **Whitespace-only entries**: rejected explicitly.
- **Multi-line entries**: rejected — the entry must be exactly one line.
- **UTF-8 integrity**: a round-trip check guarantees the bytes written decode to the same text.
- **Empty/failed write**: a validated fallback candidate is written so the gate never receives an empty or invalid file.
- **Directory creation**: `mkdirSync` with `recursive: true` ensures `/output` exists.
- **Determinism**: re-running produces byte-identical output; no randomness, no network.

## Validation

```sh
node -e "const t=require('fs').readFileSync('/output/entry.txt','utf8');const n=[...t].length;console.log(n>=1&&n<=140&&t.trim().length>0&&!t.includes('\n')?'VALID':'INVALID',n)"
```

## Compliance

- Entry is 1–140 UTF-8 characters, not only white space, one line.
- The joke lands within the single line and reads as a sendable letter.
- No external dependencies; Node.js built-ins only.