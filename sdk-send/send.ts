import { Nitrosend } from "@nitrosend/sdk";
const apiKey = process.env.NITROSEND_API_KEY;
if (!apiKey) throw new Error("Set NITROSEND_API_KEY");
const ns = new Nitrosend(apiKey);
const TO = "proof@dogfood.nitrosend.net";
const KEY = "frantic-140-sdk-send-20261022";
async function main(): Promise<void> {
  const msg = await ns.messages.send(
    {
      channel: "email",
      to: TO,
      subject: "Frantic 140 SDK first send",
      html: "<p>First send via @nitrosend/sdk.</p>",
      body: "First send via @nitrosend/sdk.",
    },
    KEY
  );
  console.log(JSON.stringify(msg).slice(0, 800));
}
main().catch((e: unknown) => {
  console.error(e instanceof Error ? e.message : e);
  process.exit(1);
});
