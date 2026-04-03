const { WebcastPushConnection } = require("tiktok-live-connector");
const WebSocket = require("ws");

// ── GIFT MAP ──
const GIFT_BOY_ADD = 5583; // 🔥 Fire     → +2 Boys
const GIFT_GIRL_ADD = 5655; // 🌹 Rose     → +2 Girls
const GIFT_SAB_GIRLS = 8913; // 🌸 Rosa     → -5 Girls (Sabotage)
const GIFT_SAB_BOYS = 9947; // 📿 Necklace → -5 Boys  (Sabotage)

const wss = new WebSocket.Server({ port: 8080 });

console.log("⚡ Boys vs Girls bridge ready on ws://localhost:8080");
console.log(`   🔥 Fire (ID:${GIFT_BOY_ADD})     → +2 BOYS`);
console.log(`   🌹 Rose (ID:${GIFT_GIRL_ADD})     → +2 GIRLS`);
console.log(`   🌸 Rosa (ID:${GIFT_SAB_GIRLS})     → -5 GIRLS (Sabotage)`);
console.log(`   📿 Necklace (ID:${GIFT_SAB_BOYS}) → -5 BOYS (Sabotage)`);
console.log(`   💬 Chat "B" or "G"          → +0.5 points`);

wss.on("connection", (ws) => {
   let tiktok = null;
   console.log("✅ Browser connected!");

   ws.on("message", async (raw) => {
      try {
         const data = JSON.parse(raw);

         if (data.action === "connect") {
            const username = data.username.replace("@", "");
            console.log(`Connecting to @${username}...`);

            tiktok = new WebcastPushConnection(username);

            try {
               await tiktok.connect();
               console.log(`🎉 Connected to @${username} LIVE!`);
            } catch (e) {
               console.error("Failed to connect to TikTok:", e.message);
               return;
            }

            // ── GIFTS ──
            tiktok.on("gift", (g) => {
               // Only trigger on repeatEnd for streakable gifts (Type 1)
               // This prevents the tower from exploding with 100 individual small updates
               if (g.giftType === 1 && !g.repeatEnd) return;

               const payload = {
                  type: "gift",
                  giftId: g.giftId,
                  giftName: g.giftName,
                  user: g.uniqueId,
                  repeat: g.repeatCount || 1,
               };
               ws.send(JSON.stringify(payload));

               // Console Logging Logic
               let target = "?";
               if (g.giftId == GIFT_BOY_ADD) target = "BOYS (+)";
               if (g.giftId == GIFT_GIRL_ADD) target = "GIRLS (+)";
               if (g.giftId == GIFT_SAB_GIRLS) target = "SABOTAGE GIRLS (-)";
               if (g.giftId == GIFT_SAB_BOYS) target = "SABOTAGE BOYS (-)";

               console.log(
                  `🎁 ${g.giftName} x${payload.repeat} from @${g.uniqueId} → ${target}`,
               );
            });

            // ── CHAT (B/G) ──
            tiktok.on("chat", (c) => {
               ws.send(
                  JSON.stringify({
                     type: "chat",
                     msg: c.comment,
                     user: c.uniqueId,
                  }),
               );
            });

            // ── VIEWERS ──
            tiktok.on("roomUser", (r) => {
               ws.send(
                  JSON.stringify({
                     type: "viewer",
                     count: r.viewerCount,
                  }),
               );
            });

            tiktok.on("error", (e) => console.error("TikTok error:", e));
            tiktok.on("disconnected", () =>
               console.warn("⚠️ TikTok Stream disconnected."),
            );
         }
      } catch (err) {
         console.error("Server error:", err);
      }
   });

   ws.on("close", () => {
      if (tiktok) tiktok.disconnect();
      console.log("Browser disconnected.");
   });
});