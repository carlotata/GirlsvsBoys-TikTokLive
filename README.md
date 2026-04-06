# 👦 Boys vs Girls — TikTok LIVE Game 👧

An interactive, real-time tower-building game powered by TikTok LIVE events. Viewers control the game by sending gifts or typing in chat — helping their team build a tower to the goal, or sabotaging the other side!

---

## 🎮 How It Works

Two teams — **Boys** and **Girls** — compete to build a tower of blocks first. The first team to reach **200 blocks** wins the round.

Viewers on TikTok LIVE influence the game in real time:

| Action | Effect |
|---|---|
| 💬 Type `B` / `BOY` / `BOYS` in chat | +0.5 blocks for Boys |
| 💬 Type `G` / `GIRL` / `GIRLS` in chat | +0.5 blocks for Girls |
| 🔥 Send a **Fire** gift (ID: 5583) | +2 blocks for Boys |
| 🌹 Send a **Rose** gift (ID: 5655) | +2 blocks for Girls |
| 🌸 Send a **Rosa** gift (ID: 8913) | 💥 Sabotage — -5 blocks from Girls |
| 📿 Send a **Necklace** gift (ID: 9947) | 💥 Sabotage — -5 blocks from Boys |

Sending a gift multiple times in a streak multiplies its effect.

---

## ✨ Features

- Real-time TikTok LIVE integration via a local WebSocket bridge
- Animated tower building with block slam-in and removal effects
- Live feed panel showing who contributed or sabotaged, and by how much
- Win board tracking round wins per team across the session
- Auto-restart — new rounds begin automatically after each win with a 5-second countdown
- Visual effects — animated aurora sky, shooting stars, floating particles, and confetti on win
- Manual boost buttons for testing or host-side overrides during streams
- Responsive layout for both desktop and mobile

---

## 🛠️ Tech Stack

- **Frontend:** HTML, Vanilla JavaScript, CSS, Tailwind CSS v4
- **Backend:** Node.js with [`tiktok-live-connector`](https://github.com/zerodytrash/TikTok-Live-Connector) and `ws` (WebSocket server)

---

## 📦 Installation

### Prerequisites

- [Node.js](https://nodejs.org/) v16 or higher
- A TikTok account that is currently live to connect to

### Steps

1. **Clone the repository**
```bash
   git clone https://github.com/carlotata/GirlsvsBoys-TikTokLive.git
   cd GirlsvsBoys-TikTokLive
```

2. **Install dependencies**
```bash
   npm install
```

3. **Build Tailwind CSS** (required for styling)
```bash
   npm run build
```
   Or watch for changes during development:
```bash
   npm run dev
```

4. **Start the WebSocket bridge server**
```bash
   node server.js
```
   The server runs on `ws://localhost:8080`.

5. **Open the game** — open `index.html` in your browser directly, or serve it with any static file server.

---

## 🚀 Usage

1. Make sure `server.js` is running.
2. Open `index.html` in your browser.
3. In the right panel, enter the TikTok username of the streamer (without `@`).
4. Click **▶ GO LIVE** to connect.
5. The game will now respond live to gifts and chat from the TikTok stream!

> **Note:** The streamer must be **currently live** on TikTok for the connection to work.

---

## 🗂️ Project Structure
```
GirlsvsBoys-TikTokLive/
├── index.html          # Main game UI and all client-side logic
├── server.js           # Node.js WebSocket bridge to TikTok LIVE
├── src/
│   └── input.css       # Tailwind CSS source file
├── tailwind.config.js  # Tailwind configuration
├── package.json        # Dependencies and npm scripts
└── .gitignore
```

---

## ⚙️ Configuration

Gift IDs and game settings can be adjusted directly in `index.html`:
```js
const GOAL           = 200;   // Blocks needed to win a round
const GIFT_BOY_ADD   = 5583;  // Gift ID → +2 blocks for Boys
const GIFT_GIRL_ADD  = 5655;  // Gift ID → +2 blocks for Girls
const GIFT_SAB_GIRLS = 8913;  // Gift ID → -5 blocks from Girls (sabotage)
const GIFT_SAB_BOYS  = 9947;  // Gift ID → -5 blocks from Boys (sabotage)
```

To find custom gift IDs for your region, log incoming gift events from your stream or refer to the [TikTok Live Connector documentation](https://github.com/zerodytrash/TikTok-Live-Connector).

---

## 🙏 Credits

Built with [tiktok-live-connector](https://github.com/zerodytrash/TikTok-Live-Connector) by zerodytrash.

---

## 📄 License

This project does not currently include a license. All rights reserved by the author unless otherwise stated.
