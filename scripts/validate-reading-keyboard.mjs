const previewUrl = "https://3000-ifqybvo07ndqqikqf4kwb-05ba63da.us2.manus.computer/conteudos/ansiedade-o-que-e-sintomas-causas";

const sleep = ms => new Promise(resolve => setTimeout(resolve, ms));
const targets = await (await fetch("http://127.0.0.1:9222/json/list")).json();
const target = targets.find(item => item.type === "page");
if (!target?.webSocketDebuggerUrl) throw new Error("Chromium CDP target not available");

const socket = new WebSocket(target.webSocketDebuggerUrl);
await new Promise((resolve, reject) => {
  socket.addEventListener("open", resolve, { once: true });
  socket.addEventListener("error", reject, { once: true });
});

let sequence = 0;
const pending = new Map();
socket.addEventListener("message", event => {
  const message = JSON.parse(event.data);
  if (message.id && pending.has(message.id)) {
    const { resolve, reject } = pending.get(message.id);
    pending.delete(message.id);
    if (message.error) reject(new Error(message.error.message));
    else resolve(message.result);
  }
});

const send = (method, params = {}) => new Promise((resolve, reject) => {
  const id = ++sequence;
  pending.set(id, { resolve, reject });
  socket.send(JSON.stringify({ id, method, params }));
});

const evaluate = async expression => {
  const result = await send("Runtime.evaluate", { expression, returnByValue: true, awaitPromise: true });
  return result.result?.value;
};

const key = async ({ key, code, windowsVirtualKeyCode, modifiers = 0 }) => {
  await send("Input.dispatchKeyEvent", { type: "keyDown", key, code, windowsVirtualKeyCode, nativeVirtualKeyCode: windowsVirtualKeyCode, modifiers });
  await send("Input.dispatchKeyEvent", { type: "keyUp", key, code, windowsVirtualKeyCode, nativeVirtualKeyCode: windowsVirtualKeyCode, modifiers });
  await sleep(120);
};

await send("Page.enable");
await send("Runtime.enable");
await send("Emulation.setDeviceMetricsOverride", { width: 390, height: 844, deviceScaleFactor: 1, mobile: true });
await send("Page.navigate", { url: previewUrl });
await sleep(1600);

const viewport = await evaluate("({ width: innerWidth, height: innerHeight, mobileMedia: matchMedia('(max-width: 1023px)').matches })");
await evaluate("document.activeElement?.blur(); window.scrollTo(0, 0)");

const tabTrace = [];
for (let step = 1; step <= 40; step++) {
  await key({ key: "Tab", code: "Tab", windowsVirtualKeyCode: 9 });
  const active = await evaluate("({ tag: document.activeElement?.tagName, text: document.activeElement?.textContent?.trim().slice(0, 80), ariaControls: document.activeElement?.getAttribute('aria-controls'), href: document.activeElement?.getAttribute('href') })");
  tabTrace.push({ step, ...active });
  if (active?.ariaControls === "article-mobile-toc") break;
}

const mobileButtonFocusedByTab = tabTrace.some(item => item.ariaControls === "article-mobile-toc");
const mobileFocusStyle = await evaluate("(() => { const button = document.activeElement; const style = getComputedStyle(button); return { active: button?.textContent?.trim(), outlineStyle: style.outlineStyle, outlineWidth: style.outlineWidth, outlineColor: style.outlineColor, ariaExpanded: button?.getAttribute('aria-expanded'), ariaControls: button?.getAttribute('aria-controls') }; })()");

await key({ key: " ", code: "Space", windowsVirtualKeyCode: 32 });
const afterSpace = await evaluate("({ expanded: document.querySelector('button[aria-controls=\\\"article-mobile-toc\\\"]')?.getAttribute('aria-expanded'), links: document.querySelectorAll('#article-mobile-toc a').length })");

await key({ key: "Enter", code: "Enter", windowsVirtualKeyCode: 13 });
const afterEnter = await evaluate("({ expanded: document.querySelector('button[aria-controls=\\\"article-mobile-toc\\\"]')?.getAttribute('aria-expanded'), focused: document.activeElement?.getAttribute('aria-controls') })");

await key({ key: "Tab", code: "Tab", windowsVirtualKeyCode: 9 });
const afterTab = await evaluate("({ tag: document.activeElement?.tagName, text: document.activeElement?.textContent?.trim().slice(0, 80), href: document.activeElement?.getAttribute('href') })");
await key({ key: "Shift", code: "Tab", windowsVirtualKeyCode: 9, modifiers: 8 });
const afterShiftTab = await evaluate("({ tag: document.activeElement?.tagName, text: document.activeElement?.textContent?.trim().slice(0, 80), ariaControls: document.activeElement?.getAttribute('aria-controls') })");

console.log(JSON.stringify({ viewport, mobileButtonFocusedByTab, tabTrace, mobileFocusStyle, afterSpace, afterEnter, afterTab, afterShiftTab }, null, 2));
socket.close();
