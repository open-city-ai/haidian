(() => {
  const configNode = document.getElementById("commons-walk-config");
  const canvas = document.getElementById("commons-walk-canvas");
  if (!configNode || !canvas) return;
  let config;
  try {
    config = JSON.parse(configNode.textContent);
  } catch (_) {
    return;
  }
  const language = document.documentElement.lang.startsWith("zh") ? "zh" : "en";
  const ui = config.ui[language];
  const context = canvas.getContext("2d");
  const buttons = Array.from(document.querySelectorAll("[data-commons-step]"));
  const description = document.getElementById("commons-walk-description");
  const status = document.getElementById("commons-walk-status");
  let active = 0;

  function roundedRect(x, y, w, h, r, fill, stroke) {
    const radius = Math.min(r, w / 2, h / 2);
    context.beginPath();
    context.moveTo(x + radius, y);
    context.arcTo(x + w, y, x + w, y + h, radius);
    context.arcTo(x + w, y + h, x, y + h, radius);
    context.arcTo(x, y + h, x, y, radius);
    context.arcTo(x, y, x + w, y, radius);
    context.closePath();
    if (fill) {
      context.fillStyle = fill;
      context.fill();
    }
    if (stroke) {
      context.strokeStyle = stroke;
      context.lineWidth = 1.2;
      context.stroke();
    }
  }

  function label(text, x, y, color, size, align = "left", weight = 500) {
    context.fillStyle = color;
    context.font = `${weight} ${size}px -apple-system, BlinkMacSystemFont, "PingFang SC", "Microsoft YaHei", sans-serif`;
    context.textAlign = align;
    context.textBaseline = "alphabetic";
    context.fillText(text, x, y);
  }

  function tree(x, y, accent) {
    context.fillStyle = "#9AAF4A";
    context.beginPath();
    context.arc(x, y - 22, 17, 0, Math.PI * 2);
    context.fill();
    context.fillStyle = "#758B38";
    context.fillRect(x - 2.5, y - 7, 5, 25);
    context.fillStyle = accent;
    context.fillRect(x - 16, y + 17, 32, 4);
  }

  function person(x, y, accent) {
    context.fillStyle = accent;
    context.beginPath();
    context.arc(x, y - 12, 5, 0, Math.PI * 2);
    context.fill();
    context.fillRect(x - 3, y - 5, 6, 16);
  }

  function drawScene(scene, index, layout) {
    const selected = index === active;
    const { x, y, w, h } = layout;
    const pale = `${scene.color}1F`;
    roundedRect(x, y, w, h, 20, selected ? `${scene.color}2B` : "#FCFBF8", selected ? scene.color : "#D6DCD7");
    if (selected) {
      context.strokeStyle = scene.color;
      context.lineWidth = 4;
      context.beginPath();
      context.moveTo(x + 18, y + 4);
      context.lineTo(x + w - 18, y + 4);
      context.stroke();
    }
    label(String(scene.order).padStart(2, "0"), x + 22, y + 38, scene.color, 13, "left", 700);
    label(scene[`label_${language}`], x + 52, y + 38, "#112D3C", 15, "left", 700);
    context.fillStyle = pale;
    context.fillRect(x + 18, y + 62, w - 36, h - 96);
    context.strokeStyle = "#D6DCD7";
    context.lineWidth = 1;
    context.strokeRect(x + 18, y + 62, w - 36, h - 96);

    const base = y + h - 53;
    context.strokeStyle = "#112D3C";
    context.lineWidth = 5;
    context.beginPath();
    context.moveTo(x + 34, base);
    context.lineTo(x + w - 34, base);
    context.stroke();
    context.strokeStyle = "#167C80";
    context.lineWidth = 2;
    context.beginPath();
    context.moveTo(x + 34, base - 6);
    context.lineTo(x + w - 34, base - 6);
    context.stroke();

    tree(x + 62, base - 10, scene.color);
    if (index === 0) {
      roundedRect(x + w * 0.45, base - 50, 22, 46, 5, "#FCFBF8", "#167C80");
      person(x + w * 0.68, base - 8, scene.color);
      person(x + w * 0.77, base - 8, "#167C80");
    } else if (index === 1) {
      context.fillStyle = "#ECE9F7";
      roundedRect(x + w * 0.42, base - 26, w * 0.30, 16, 8, "#ECE9F7", null);
      [0.48, 0.57, 0.66].forEach((offset, personIndex) => person(x + w * offset, base - 12, personIndex === 1 ? "#167C80" : scene.color));
      roundedRect(x + w * 0.79, base - 56, 27, 52, 5, "#FCFBF8", scene.color);
    } else {
      roundedRect(x + w * 0.45, base - 52, 24, 48, 5, "#FCFBF8", "#167C80");
      [0.62, 0.71, 0.80].forEach((offset, personIndex) => person(x + w * offset, base - 12, personIndex === 0 ? scene.color : personIndex === 1 ? "#167C80" : "#665EC8"));
      roundedRect(x + w * 0.86, base - 58, 28, 54, 5, "#FCFBF8", scene.color);
    }
    const indicator = selected ? ui.selected : ui.select;
    roundedRect(x + 22, y + h - 28, Math.min(w - 44, indicator.length * 8 + 28), 18, 9, scene.color, null);
    label(indicator, x + 34, y + h - 14, "#FFFFFF", 10, "left", 700);
  }

  function draw() {
    const width = canvas.clientWidth;
    const height = canvas.clientHeight;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    canvas.width = Math.max(1, Math.floor(width * dpr));
    canvas.height = Math.max(1, Math.floor(height * dpr));
    context.setTransform(dpr, 0, 0, dpr, 0, 0);
    context.clearRect(0, 0, width, height);
    context.fillStyle = "#F4F1EA";
    context.fillRect(0, 0, width, height);
    const compact = width < 680;
    const side = 24;
    const top = 42;
    const gap = compact ? 14 : 18;
    const cardWidth = (width - side * 2 - gap * 2) / 3;
    const cardHeight = Math.min(height - top - 42, compact ? 235 : 260);
    const lineY = top - 16;
    context.strokeStyle = "#DDEDEA";
    context.lineWidth = 12;
    context.beginPath();
    context.moveTo(side + 10, lineY);
    context.lineTo(width - side - 10, lineY);
    context.stroke();
    context.strokeStyle = "#112D3C";
    context.lineWidth = 4;
    context.beginPath();
    context.moveTo(side + 10, lineY);
    context.lineTo(width - side - 10, lineY);
    context.stroke();
    context.strokeStyle = "#167C80";
    context.lineWidth = 2;
    context.beginPath();
    context.moveTo(side + 10, lineY - 5);
    context.lineTo(width - side - 10, lineY - 5);
    context.stroke();
    config.scenes.forEach((scene, index) => {
      const center = side + cardWidth * (index + 0.5) + gap * index;
      context.fillStyle = scene.color;
      context.beginPath();
      context.arc(center, lineY, 10, 0, Math.PI * 2);
      context.fill();
      drawScene(scene, index, { x: side + index * (cardWidth + gap), y: top, w: cardWidth, h: cardHeight });
    });
    const footer = `${ui.footer} · ${ui.notScale}`;
    label(footer, side, height - 12, "#586D73", 11, "left", 500);
  }

  function select(index, focus = false) {
    active = (index + config.scenes.length) % config.scenes.length;
    const scene = config.scenes[active];
    buttons.forEach((button, buttonIndex) => {
      const chosen = buttonIndex === active;
      button.setAttribute("aria-pressed", String(chosen));
      button.classList.toggle("is-active", chosen);
    });
    const label = scene[`label_${language}`];
    const action = scene[`action_${language}`];
    const gate = scene[`gate_${language}`];
    description.textContent = `${label} — ${action} ${ui.gate}: ${gate}`;
    status.textContent = `${ui.status}: ${label}`;
    if (focus) buttons[active].focus();
    draw();
  }

  buttons.forEach((button, index) => {
    button.addEventListener("click", () => select(index));
    button.addEventListener("keydown", (event) => {
      if (!["ArrowLeft", "ArrowRight", "Home", "End"].includes(event.key)) return;
      event.preventDefault();
      const next = event.key === "Home" ? 0 : event.key === "End" ? config.scenes.length - 1 : index + (event.key === "ArrowRight" ? 1 : -1);
      select(next, true);
    });
  });
  canvas.addEventListener("keydown", (event) => {
    if (event.key === "ArrowLeft" || event.key === "ArrowUp") select(active - 1);
    if (event.key === "ArrowRight" || event.key === "ArrowDown") select(active + 1);
  });
  const observer = typeof ResizeObserver === "undefined" ? null : new ResizeObserver(draw);
  if (observer) observer.observe(canvas);
  window.addEventListener("resize", draw, { passive: true });
  select(0);
})();
