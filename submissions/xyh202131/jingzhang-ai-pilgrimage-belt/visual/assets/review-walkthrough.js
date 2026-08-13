(() => {
  document.documentElement.classList.add("js");
  const root = document.querySelector(".review-walk-shell");
  if (!root) return;

  const steps = [...root.querySelectorAll("[data-step]")];
  const links = [...root.querySelectorAll("[data-step-link]")];
  const live = root.querySelector("[data-live]");
  if (!steps.length) return;

  const valid = new Set(steps.map((step) => step.id));
  const initialHash = location.hash.slice(1);
  let current = valid.has(initialHash) ? initialHash : steps[0].id;

  function show(id, focus = false, updateHash = true) {
    current = valid.has(id) ? id : steps[0].id;
    steps.forEach((step, index) => {
      const active = step.id === current;
      step.hidden = !active;
      step.setAttribute("aria-hidden", String(!active));
      const previous = step.querySelector("[data-prev]");
      const next = step.querySelector("[data-next]");
      if (previous) previous.disabled = index === 0;
      if (next) next.disabled = index === steps.length - 1;
      if (active && focus) step.querySelector("h3")?.focus();
    });
    links.forEach((link) => {
      link.setAttribute(
        "aria-current",
        link.getAttribute("href") === `#${current}` ? "step" : "false",
      );
    });
    const number = steps.findIndex((step) => step.id === current) + 1;
    if (live) live.textContent = `${number} / ${steps.length}`;
    if (updateHash) history.replaceState(null, "", `#${current}`);
  }

  steps.forEach((step, index) => {
    step.querySelector("[data-prev]")?.addEventListener("click", () => {
      show(steps[Math.max(0, index - 1)].id, true);
    });
    step.querySelector("[data-next]")?.addEventListener("click", () => {
      show(steps[Math.min(steps.length - 1, index + 1)].id, true);
    });
  });
  links.forEach((link) => {
    link.addEventListener("click", (event) => {
      event.preventDefault();
      show(link.hash.slice(1), true);
    });
  });
  addEventListener("hashchange", () => {
    const id = location.hash.slice(1);
    if (valid.has(id)) show(id, true, false);
  });
  root.addEventListener("keydown", (event) => {
    if (event.target.closest("a, button, summary, details, input, textarea, select")) return;
    const index = steps.findIndex((step) => step.id === current);
    const destinations = {
      ArrowRight: steps[Math.min(steps.length - 1, index + 1)].id,
      ArrowLeft: steps[Math.max(0, index - 1)].id,
      Home: steps[0].id,
      End: steps.at(-1).id,
    };
    if (!destinations[event.key]) return;
    event.preventDefault();
    show(destinations[event.key], true);
  });

  // Preserve valid review-step deep links, but never create one on an
  // unanchored page load: the Round 17 jury entry must remain the first view.
  show(current, false, Boolean(initialHash) && valid.has(initialHash));
})();

(() => {
  const root = document.querySelector("[data-motion-root]");
  if (!root) return;

  const cards = [...root.querySelectorAll("[data-motion-state]")];
  const marker = root.querySelector("[data-motion-marker]");
  const toggle = root.querySelector("[data-motion-toggle]");
  const reset = root.querySelector("[data-motion-reset]");
  const live = root.querySelector("[data-motion-live]");
  const progress = root.querySelector("[data-motion-progress]");
  const reducedMotion = matchMedia("(prefers-reduced-motion: reduce)");
  const isEnglish = document.documentElement.lang.toLowerCase().startsWith("en");
  const labels = isEnglish
    ? ["01 Ordinary", "02 Proof", "03 Failure / stop", "04 Recovery"]
    : ["01 普通", "02 验证", "03 故障／停止", "04 恢复"];
  const startLabel = isEnglish ? "Start 48-second journey" : "开始 48 秒旅程";
  const pauseLabel = isEnglish ? "Pause journey" : "暂停旅程";
  const advanceLabel = isEnglish ? "Advance one state" : "前进一个状态";
  let state = 0;
  let running = false;
  let startedAt = 0;
  let elapsedBeforeStart = 0;
  let timer = null;

  function announce(prefix = "") {
    if (!live) return;
    const stateText = labels[state];
    live.textContent = isEnglish ? `${prefix}${stateText}` : `${prefix}${stateText}`;
  }

  function render(nextState, percent = nextState * 25) {
    state = Math.max(0, Math.min(cards.length - 1, nextState));
    root.dataset.activeState = String(state);
    cards.forEach((card, index) => {
      const active = index === state;
      card.classList.toggle("is-active", active);
      card.setAttribute("aria-current", active ? "step" : "false");
    });
    if (marker) marker.dataset.state = String(state);
    if (progress) progress.style.width = `${Math.max(0, Math.min(100, percent))}%`;
  }

  function stop(complete = false) {
    running = false;
    if (timer) cancelAnimationFrame(timer);
    timer = null;
    if (toggle) toggle.textContent = reducedMotion.matches ? advanceLabel : startLabel;
    if (complete) {
      render(cards.length - 1, 100);
      announce(isEnglish ? "Journey complete at " : "旅程完成：");
      elapsedBeforeStart = 0;
    } else {
      announce(isEnglish ? "Paused at " : "暂停于 ");
    }
  }

  function tick(now) {
    const elapsed = elapsedBeforeStart + (now - startedAt);
    const percent = Math.min(100, (elapsed / 48000) * 100);
    const nextState = Math.min(cards.length - 1, Math.floor(elapsed / 12000));
    if (nextState !== state) {
      render(nextState, percent);
      announce(isEnglish ? "Now at " : "现在进入 ");
    } else {
      render(state, percent);
    }
    if (elapsed >= 48000) {
      stop(true);
      return;
    }
    timer = requestAnimationFrame(tick);
  }

  function start() {
    if (running) {
      elapsedBeforeStart += performance.now() - startedAt;
      stop(false);
      return;
    }
    if (reducedMotion.matches) {
      const nextState = state >= cards.length - 1 ? 0 : state + 1;
      render(nextState, nextState === cards.length - 1 ? 100 : nextState * 25);
      announce(isEnglish ? "Showing " : "当前显示 ");
      return;
    }
    if (state === cards.length - 1) {
      render(0, 0);
      elapsedBeforeStart = 0;
    }
    running = true;
    startedAt = performance.now();
    if (toggle) toggle.textContent = pauseLabel;
    announce(isEnglish ? "Journey started at " : "旅程开始：");
    timer = requestAnimationFrame(tick);
  }

  function resetJourney() {
    running = false;
    if (timer) cancelAnimationFrame(timer);
    timer = null;
    elapsedBeforeStart = 0;
    render(0, 0);
    if (toggle) toggle.textContent = reducedMotion.matches ? advanceLabel : startLabel;
    announce(isEnglish ? "Reset to " : "已复位至 ");
  }

  toggle?.addEventListener("click", start);
  reset?.addEventListener("click", resetJourney);
  reducedMotion.addEventListener?.("change", resetJourney);
  render(0, 0);
  if (toggle && reducedMotion.matches) toggle.textContent = advanceLabel;
})();
