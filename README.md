# Proton Mail Footer Remover

A lightweight browser extension that automatically removes the promotional footer ("Sent with Proton Mail secure email") from outgoing emails on Proton Mail's free tier.

Instead of manually deleting the footer every time you compose an email, this extension does it for you.

## How It Works

When you open the compose window on Proton Mail, the extension detects the promotional footer block and removes it from the editor before you send. It uses a MutationObserver to catch new compose windows, replies, and forwards — so you never have to think about it.

The footer removal is something Proton already allows manually. This just automates it.

## Installation

### Option 1: Browser Extension (Brave / Chrome / Edge)

1. Download or clone this repo:
   ```
   git clone https://github.com/lectorsalamanca/protonmail-footer-remover.git
   ```
2. Open `brave://extensions` (or `chrome://extensions` / `edge://extensions`)
3. Enable **Developer mode** (toggle in the top right)
4. Click **Load unpacked** and select the cloned folder
5. Done — the extension is now active on Proton Mail

### Option 2: Userscript (Tampermonkey / Violentmonkey)

If you already use a userscript manager:

1. Click the raw link to [`proton-footer-remover.user.js`](https://github.com/lectorsalamanca/protonmail-footer-remover/raw/main/proton-footer-remover.user.js)
2. Your userscript manager will prompt you to install — click **Install**
3. Done

You can toggle the script on/off from the Tampermonkey/Violentmonkey menu.

## Compatibility

- **Browsers:** Brave, Chrome, Edge, or any Chromium-based browser
- **Proton Mail:** Works on `mail.proton.me` (web client)
- **Languages:** Works regardless of your Proton Mail language setting — the detection is based on DOM structure, not text

## Permissions

The extension only runs on `https://mail.proton.me/*`. It cannot access any other website, make network requests, or read your email content. The only permission used is `storage` for the enable/disable toggle.

## Toggle

Click the extension icon in your toolbar to enable or disable footer removal without uninstalling.

## License

MIT
