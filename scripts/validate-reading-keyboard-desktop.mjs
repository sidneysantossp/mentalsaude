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
  await sleep(100);
};
await send("Page.enable");
await send("Runtime.enable");
await send("Emulation.setDeviceMetricsOverride", { width: 1280, height: 900, deviceScaleFactor: 1, mobile: false });
await send("Page.navigate", { url: previewUrl });
await sleep(1600);
const viewport = await evaluate("({ width: innerWidth, height: innerHeight, desktopMedia: matchMedia('(min-width: 1024px)').matches })");
await evaluate("document.activeElement?.blur(); window.scrollTo(0, 0)");
const tabTrace = [];
for (let step = 1; step <= 50; step++) {
  await key({ key: "Tab", code: "Tab", windowsVirtualKeyCode: 9 });
  const active = await evaluate("({ tag: document.activeElement?.tagName, text: document.activeElement?.textContent?.trim().slice(0, 80), href: document.activeElement?.getAttribute('href'), ariaCurrent: document.activeElement?.getAttribute('aria-current') })");
  tabTrace.push({ step, ...active });
  if (active?.href === "#o-que-e-ansiedade") break;
}
const indexLinkFocusedByTab = tabTrace.some(item => item.href === "#o-que-e-ansiedade");
const focusStyle = await evaluate("(() => { const link = document.activeElement; const style = getComputedStyle(link); return { active: link?.textContent?.trim(), href: link?.getAttribute('href'), outlineStyle: style.outlineStyle, outlineWidth: style.outlineWidth, outlineColor: style.outlineColor, ariaCurrent: link?.getAttribute('aria-current') }; })()");
await key({ key: "Enter", code: "Enter", windowsVirtualKeyCode: 13 });
const afterEnter = await evaluate("({ hash: location.hash, activeText: document.activeElement?.textContent?.trim(), href: document.activeElement?.getAttribute('href') })");
await key({ key: "Shift", code: "Tab", windowsVirtualKeyCode: 9, modifiers: 8 });
const afterShiftTab = await evaluate("({ tag: document.activeElement?.tagName, text: document.activeElement?.textContent?.trim().slice(0, 80), href: document.activeElement?.getAttribute('href') })");
console.log(JSON.stringify({ viewport, indexLinkFocusedByTab, tabTrace, focusStyle, afterEnter, afterShiftTab }, null, 2));
socket.close();
