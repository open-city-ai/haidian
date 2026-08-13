(function () {
  const lang = document.documentElement.lang.toLowerCase().startsWith("zh") ? "zh" : "en";
  const q = (s) => document.querySelector(s);
  const qa = (s) => Array.from(document.querySelectorAll(s));
  const t = (x) => x[lang] || x.en || x.zh || "";

  fetch("assets/evidence-model.json")
    .then((r) => {
      if (!r.ok) throw new Error("evidence model unavailable");
      return r.json();
    })
    .then((data) => {
      q("[data-warning]").textContent = lang === "zh" ? data.authority.warning_zh : data.authority.warning_en;
      q("[data-tasks]").innerHTML = data.arrival_tasks.map((x) => `<button class="task" data-task="${x.id}"><b>${x.id}</b><span>${t(x)}</span><small>${lang === "zh" ? x.place_zh : x.place_en}</small></button>`).join("");
      q("[data-states]").innerHTML = data.states.map((x, i) => `<button class="state s${i + 1}" data-state="${x.id}"><i></i><b>${x.id}</b><span>${t(x)}</span></button>`).join("");
      q("[data-areas]").innerHTML = data.key_areas.map((x) => `<article class="area" style="--accent:${x.color}"><p>${x.short} / ${x.id}</p><h3>${t(x)}</h3><strong>${lang === "zh" ? x.position_zh : x.position_en}</strong><span>${x.task} · ${x.scenarios.join(" · ")}</span></article>`).join("");
      q("[data-scenarios]").innerHTML = data.scenarios.map((x) => `<article class="scenario ${x.kind}"><b>${x.id}</b><span>${t(x)}</span><small>${x.kind === "test" ? (lang === "zh" ? "测试验证" : "TEST / VALIDATE") : (lang === "zh" ? "运营场景" : "OPERATE")}</small></article>`).join("");
      q("[data-landmarks]").innerHTML = data.landmarks.map((x) => `<article class="landmark"><b>${x.id}</b><h3>${t(x)}</h3><p>${lang === "zh" ? x.function_zh : x.function_en}</p></article>`).join("");
      q("[data-metrics]").innerHTML = data.metrics.map((x) => `<article class="metric ${x.value === null ? "unknown" : ""}"><span>${x.id}</span><b>${x.value === null ? "UNKNOWN" : x.value}</b><small>${x.status.replaceAll("_", " ")}</small></article>`).join("");

      qa(".task").forEach((button) => button.addEventListener("click", () => {
        qa(".task").forEach((x) => x.classList.remove("active"));
        button.classList.add("active");
        q("[data-current-task]").textContent = button.dataset.task + " · " + button.querySelector("span").textContent;
      }));
      qa(".state").forEach((button) => button.addEventListener("click", () => {
        qa(".state").forEach((x) => x.classList.remove("active"));
        button.classList.add("active");
        q("[data-current-state]").textContent = button.dataset.state + " · " + button.querySelector("span").textContent;
      }));
      q(".task").click();
      q(".state").click();
    })
    .catch((error) => {
      q("[data-warning]").textContent = `${lang === "zh" ? "证据模型读取失败" : "Evidence model failed to load"}: ${error.message}`;
    });
})();
