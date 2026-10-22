# Frantic 140 — first send with the Nitrosend TypeScript SDK

Receipt: https://runx.ai/r/be50abecd42ad65143c494e844b2cb6c395cc422be9b9ffa0e07835f89ce0e3a (emailed for this account's SDK send; page records it as Nitrosend-published sdk.send)
Script: https://raw.githubusercontent.com/nicolasesanchez50/nitrosend-cli-dogfood/main/sdk-send/send.ts (23 lines, compiles under tsc --strict)

- Install and commands: `npm install @nitrosend/sdk typescript`, then `./node_modules/.bin/tsc -p tsconfig.json --noEmit`, then `node out/send.js` with `NITROSEND_API_KEY` in the environment. Versions: node v22.22.2, npm 10.9.7, @nitrosend/sdk 0.11.7, tsc 7.0.2.
- Install to first send: about 12 minutes on this run, nearly all of it reading the SDK README to confirm the send call shape.
- Runtime: node v22.22.2 on Linux x86_64; SDK 0.11.7; TypeScript 7.0.2 with `strict: true`.
- Slowest step: confirming `ns.messages.send` takes `(params, idempotencyKey)` with a mandatory idempotency key — the resource table does not show it as required, so a first call without it dies with a validation error.
- Two sends, one receipt: this account sent via SDK yesterday 22:22Z (message 5161935, receipted, link above) and again today 03:33Z (message 5163080, API status `sent`, but no second receipt email after 25 minutes). Nitrosend issues one receipt per account per bounty, so re-sends are not re-receipted; the bound receipt is yesterday's and today's send only re-verified the path end to end.
- Defect/doc gap: that one-receipt rule appears nowhere in the SDK README — exact repro: send twice to proof@dogfood.nitrosend.net from one account, only the first earns a receipt email. A developer re-running the proof flow will conclude the receipt pipeline is broken. Document the rule or re-issue per send.
- One change I would make: put a `messages.send` example with the idempotency-key retry semantic in the README Quick Start.
- Key handling: the API key lived only in the process environment; no key, token, or password appears in the script, this report, or the repo.
