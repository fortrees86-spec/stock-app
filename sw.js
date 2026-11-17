// 재고조회 앱 서비스 워커
// - 앱 화면 파일만 저장해 두어 빨리 열리게 한다 (재고 데이터는 저장하지 않음)
// - 화면을 고치면 CACHE 이름의 숫자를 올린다 → 팀원 앱이 다음에 열 때 새 화면으로 바뀜
const CACHE = "stock-app-v1";
const SHELL = [
  "./",
  "./index.html",
  "./config.js",
  "./manifest.webmanifest",
  "./icons/icon-192.png",
  "./icons/icon-512.png",
  "./icons/maskable-512.png",
  "./icons/apple-touch-icon.png",
];

self.addEventListener("install", (event) => {
  event.waitUntil(caches.open(CACHE).then((c) => c.addAll(SHELL)));
  self.skipWaiting();
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(keys.filter((k) => k !== CACHE).map((k) => caches.delete(k)))
    )
  );
  self.clients.claim();
});

self.addEventListener("fetch", (event) => {
  const url = new URL(event.request.url);
  // 다른 주소(재고 데이터 API 등)와 GET 아닌 요청은 건드리지 않음
  if (event.request.method !== "GET" || url.origin !== self.location.origin) return;
  // 화면 파일: 네트워크 우선(최신 화면), 실패하면 저장본
  event.respondWith(
    fetch(event.request)
      .then((res) => {
        const copy = res.clone();
        caches.open(CACHE).then((c) => c.put(event.request, copy));
        return res;
      })
      .catch(() => caches.match(event.request).then((r) => r || caches.match("./index.html")))
  );
});
