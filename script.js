// 모바일 네비게이션 토글
const headerEl = document.querySelector(".site-header");
const navToggleBtn = document.querySelector(".nav-toggle");

if (headerEl && navToggleBtn) {
  navToggleBtn.addEventListener("click", () => {
    headerEl.classList.toggle("nav-open");
  });
}

// 꽃이 필요한 순간 — 탭 전환
const momentsTabs = document.querySelectorAll(".moments-tab");
const momentsPanels = document.querySelectorAll(".moments-panel");

momentsTabs.forEach((tab) => {
  tab.addEventListener("click", () => {
    const momentId = tab.getAttribute("data-moment");
    if (!momentId) return;

    momentsTabs.forEach((t) => {
      t.classList.remove("is-active");
      t.setAttribute("aria-selected", "false");
    });
    tab.classList.add("is-active");
    tab.setAttribute("aria-selected", "true");

    momentsPanels.forEach((panel) => {
      const isTarget = panel.id === "panel-" + momentId;
      panel.classList.toggle("is-active", isTarget);
      panel.hidden = !isTarget;
    });
  });
});

// 부드러운 스크롤 (same-page anchor)
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", (event) => {
    const targetId = anchor.getAttribute("href");
    if (!targetId || targetId === "#") return;

    const targetEl = document.querySelector(targetId);
    if (!targetEl) return;

    event.preventDefault();
    targetEl.scrollIntoView({ behavior: "smooth", block: "start" });
  });
});

