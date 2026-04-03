# 👦 BOYS VS GIRLS 👧 — TikTok LIVE Tower Battle

A real-time tower-building battle game powered by your TikTok LIVE stream. Viewers send gifts or type in chat to stack blocks for their team (Boys 💙 or Girls 💗). Sabotage gifts can tear down the opponent's tower. First team to reach **200 blocks** wins!

---

## 📋 Table of Contents

- [How It Works](#how-it-works)
- [Requirements](#requirements)
- [Setup & Installation](#setup--installation)
- [Running the Game](#running-the-game)
- [How to Play (For Streamers)](#how-to-play-for-streamers)
- [How Viewers Participate](#how-viewers-participate)
- [Gift & Chat Reference](#gift--chat-reference)
- [Game Features](#game-features)
- [Troubleshooting](#troubleshooting)
- [File Structure](#file-structure)

---

## How It Works

```
TikTok LIVE Stream
       │
       ▼
  server.js  ←── Listens for gifts & chat via tiktok-live-connector
       │
       ▼
 WebSocket (ws://localhost:8080)
       │
       ▼
  index.html  ←── Live tower battle UI in your browser
```

The bridge server (`server.js`) connects to your TikTok LIVE and listens for gifts and chat messages. It relays events in real time over a local WebSocket to the browser game (`index.html`), which animates the towers live on screen.

---

## Requirements

- **Node.js** v16 or higher
- An active **TikTok LIVE** session (you must be live when connecting)
- A modern web browser (Chrome recommended for OBS capture)

---

## Setup & Installation

**1. Install dependencies**

```bash
npm install
```

This installs:
- `tiktok-live-connector` — reads live gifts, chat, and viewer count from TikTok
- `ws` — WebSocket server for browser communication

**2. No extra configuration needed.** Gift IDs and team assignments are already set in both files.

---

## Running the Game

**Step 1 — Go LIVE on TikTok** from your phone or PC.

**Step 2 — Start the bridge server**

```bash
node server.js
```

You should see:
```
⚡ Boys vs Girls bridge ready on ws://localhost:8080
   🔥 Fire (ID:5583)      → +2 BOYS
   🌹 Rose (ID:5655)      → +2 GIRLS
   🌸 Rosa (ID:8913)      → -5 GIRLS (Sabotage)
   📿 Necklace (ID:9947)  → -5 BOYS  (Sabotage)
   💬 Chat "B" or "G"     → +0.5 points
```

**Step 3 — Open the game in your browser**

Open `index.html` directly in Chrome (double-click or drag it into the browser).

**Step 4 — Connect to your stream**

In the bottom-right panel:
1. Enter your TikTok username (with or without `@`)
2. Click **▶ GO LIVE**
3. The green dot lights up and shows `@yourusername` when connected

**Step 5 — The game is live!**

The towers start empty. Every gift or chat command adds or removes blocks in real time.

---

## How to Play (For Streamers)

- **Explain the gifts to your viewers** using the Gift Reference table below.
- **Display the game on stream** via OBS Browser Source or Window Capture (the dark background works well as an overlay).
- The game **auto-starts a new round** 5 seconds after each winner is declared.
- Click **⚡ PLAY AGAIN!** on the winner screen to manually restart immediately.

### Announce to your viewers:
> *"Send 🔥 Fire to add blocks for BOYS! Send 🌹 Rose for GIRLS! Use 🌸 Rosa or 📿 Necklace to SABOTAGE the other team! Or just type B or G in the chat!"*

### Suggested OBS Setup
1. Add a **Window Capture** or **Browser Source** pointed at `index.html`
2. The game fills the screen — crop or scale to fit your layout
3. The animated aurora/night sky background looks great as a full overlay

---

## How Viewers Participate

### 🎁 Gifts (Strongest Effect)

| Gift | Icon | Gift ID | Effect |
|---|---|---|---|
| Fire | 🔥 | 5583 | **+2 blocks** for Boys |
| Rose | 🌹 | 5655 | **+2 blocks** for Girls |
| Rosa | 🌸 | 8913 | **−5 blocks** from Girls *(sabotage!)* |
| Necklace | 📿 | 9947 | **−5 blocks** from Boys *(sabotage!)* |

> Streakable gifts (combos) are counted at the **end of the streak**, so a x10 Fire adds +20 blocks at once.

### 💬 Chat Commands (Free, anyone can use)

Viewers just type in the TikTok chat — no gift required:

| Type in chat | Effect |
|---|---|
| `B`, `BOY`, `BOYS` | **+0.5 blocks** for Boys |
| `G`, `GIRL`, `GIRLS` | **+0.5 blocks** for Girls |

Chat commands work with or without a leading `/`.

---

## Gift & Chat Reference

### 📊 Scoring Summary

| Action | Team | Change |
|---|---|---|
| 🔥 Fire gift | Boys | +2 blocks |
| 🌹 Rose gift | Girls | +2 blocks |
| 🌸 Rosa gift | Girls | −5 blocks (sabotage) |
| 📿 Necklace gift | Boys | −5 blocks (sabotage) |
| 💬 Chat B/BOY/BOYS | Boys | +0.5 blocks |
| 💬 Chat G/GIRL/GIRLS | Girls | +0.5 blocks |

### 🏆 Win Condition

First team to reach **200 blocks** wins the round. A winner screen appears, confetti fires, and the next round starts automatically after 5 seconds.

---

## Game Features

- **🏗️ Live tower building** — blocks stack up in real time as gifts come in; the character jumps on every new block
- **💥 Sabotage system** — Rosa and Necklace gifts explode blocks off the opponent's tower
- **🌠 Animated background** — aurora, twinkling stars, shooting stars, floating particles, and emoji confetti
- **📹 Dual camera view** — Boys CAM on the left, Girls CAM on the right, divided by a glowing VS line
- **🎯 Goal tracker** — goal displayed at the top center so viewers always know how far each team has to go
- **📡 Live feed panel** — scrolling log of every gift and chat boost in real time
- **🏆 Win Board** — tracks cumulative wins per team across all rounds in the session
- **👥 Viewer count** — live viewer count shown in the header
- **⚡ Surge banners** — when a team pulls far ahead, a surge banner flashes on screen
- **🔬 Test buttons** — the bottom bar lets you manually trigger each gift (useful for testing without being live)
- **Auto-restart** — new round begins 5 seconds after a winner, no streamer action needed

---

## Troubleshooting

**"Bridge not found on ws://localhost:8080"**
→ Make sure `node server.js` is running in your terminal *before* clicking GO LIVE in the browser.

**"Failed to connect to TikTok"**
→ You must be actively LIVE on TikTok when connecting. The stream cannot be pending or ended.

**Gifts are received but towers don't move**
→ The Gift ID from TikTok may differ from what's configured (IDs can vary by region). Check the server terminal — it prints the actual `giftId` for every gift received. Update the IDs in both `server.js` and `index.html` if they don't match.

**Chat commands aren't working**
→ Viewers must type exactly `B`, `G`, `BOY`, `GIRL`, `BOYS`, or `GIRLS` (not a sentence). The game strips leading `/` and ignores surrounding spaces.

**The page is blank or not loading**
→ Open `index.html` directly from the project folder. Both `index.html` and the running `server.js` must be in the same directory.

**Viewer count shows 0**
→ Viewer count updates on the `roomUser` TikTok event, which fires periodically. It will update within a minute of going live.

---

## File Structure

```
project/
├── index.html        ← Game UI — open this in your browser
├── server.js         ← TikTok bridge server — run with: node server.js
├── package.json      ← Node.js dependencies
└── package-lock.json ← Dependency lock file
```

---

*Built for TikTok LIVE streamers. Keep the energy high — tell your viewers to spam gifts and flood the chat!* 🔥💙💗
