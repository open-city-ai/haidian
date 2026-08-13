(() => {
  "use strict";

  const signalOrder = ["entry", "time", "state", "human", "source", "exit"];

  document.querySelectorAll("[data-signal-interface]").forEach((root) => {
    const matrix = root.querySelector("[data-signal-matrix]");
    if (!matrix) return;

    const areaButtons = [...root.querySelectorAll("[data-area-choice]")];
    const stateButtons = [...root.querySelectorAll("[data-state-choice]")];
    const rows = [...matrix.querySelectorAll("tbody tr[data-area][data-state]")];
    const carrierOutput = root.querySelector("[data-carrier-output]");
    const selectionOutput = root.querySelector("[data-selection-output]");
    const carrierPrefix = root.dataset.carrierPrefix || "";
    const selectionPrefix = root.dataset.selectionPrefix || "";
    let area = root.dataset.defaultArea || "zhongzhiyuan";
    let state = root.dataset.defaultState || "ordinary";

    const setPressed = (buttons, attribute, value) => {
      buttons.forEach((button) => {
        button.setAttribute("aria-pressed", String(button.getAttribute(attribute) === value));
      });
    };

    const render = () => {
      const row = rows.find((candidate) => candidate.dataset.area === area && candidate.dataset.state === state);
      if (!row) return;

      setPressed(areaButtons, "data-area-choice", area);
      setPressed(stateButtons, "data-state-choice", state);

      rows.forEach((candidate) => {
        const selected = candidate === row;
        candidate.classList.toggle("is-selected", selected);
        if (selected) candidate.setAttribute("aria-current", "true");
        else candidate.removeAttribute("aria-current");
      });

      if (carrierOutput) carrierOutput.textContent = `${carrierPrefix}${row.dataset.carrier || ""}`;
      if (selectionOutput) selectionOutput.textContent = `${selectionPrefix}${row.dataset.selection || ""}`;

      signalOrder.forEach((signal) => {
        const source = row.querySelector(`[data-signal="${signal}"]`);
        const output = root.querySelector(`[data-signal-output="${signal}"]`);
        if (source && output) output.textContent = source.textContent.trim();
      });
    };

    areaButtons.forEach((button) => {
      button.addEventListener("click", () => {
        area = button.dataset.areaChoice;
        render();
      });
    });

    stateButtons.forEach((button) => {
      button.addEventListener("click", () => {
        state = button.dataset.stateChoice;
        render();
      });
    });

    root.dataset.enhanced = "true";
    render();
  });
})();
