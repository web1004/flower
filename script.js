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

// 고객 문의 폼 — Supabase 제출
const inquiryForm = document.getElementById("inquiry-form");
if (inquiryForm) {
  const phoneInput = document.getElementById("inquiry-phone");
  const messageInput = document.getElementById("inquiry-message");
  const phoneError = document.getElementById("inquiry-phone-error");
  const messageError = document.getElementById("inquiry-message-error");
  const successEl = document.getElementById("inquiry-success");
  const submitErrorEl = document.getElementById("inquiry-submit-error");

  function showSuccess() {
    successEl.classList.remove("hidden");
    submitErrorEl.classList.add("hidden");
    inquiryForm.querySelector('button[type="submit"]').disabled = true;
  }

  function showSubmitError(msg) {
    submitErrorEl.textContent = msg;
    submitErrorEl.classList.remove("hidden");
    successEl.classList.add("hidden");
  }

  function clearFieldErrors() {
    phoneError.textContent = "";
    messageError.textContent = "";
    submitErrorEl.classList.add("hidden");
  }

  inquiryForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    clearFieldErrors();

    const phone = (phoneInput.value || "").trim();
    const message = (messageInput.value || "").trim();
    let valid = true;

    if (!phone) {
      phoneError.textContent = "휴대전화 번호를 입력해 주세요.";
      valid = false;
    }
    if (!message) {
      messageError.textContent = "문의사항을 입력해 주세요.";
      valid = false;
    }
    if (!valid) return;

    const url = window.SUPABASE_URL;
    const key = window.SUPABASE_ANON_KEY;
    if (!url || !key) {
      showSubmitError("문의 설정이 되어 있지 않습니다. 관리자에게 문의해 주세요.");
      return;
    }

    const submitBtn = document.getElementById("inquiry-submit");
    const originalLabel = submitBtn.textContent;
    submitBtn.disabled = true;
    submitBtn.textContent = "전송 중...";

    try {
      const supabase = window.supabase.createClient(url, key);
      const { error } = await supabase.from("customer_inquiries").insert({
        phone,
        message,
      });
      if (error) throw error;
      showSuccess();
      submitBtn.textContent = "접수 완료";
    } catch (err) {
      console.error(err);
      submitBtn.disabled = false;
      submitBtn.textContent = originalLabel;
      showSubmitError(
        err.message || "문의 전송에 실패했습니다. 잠시 후 다시 시도해 주세요."
      );
    }
  });
}

