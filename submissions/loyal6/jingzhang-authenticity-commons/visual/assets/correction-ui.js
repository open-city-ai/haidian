(function () {
  "use strict";
  const state = document.getElementById("state");
  const en = document.documentElement.lang.startsWith("en");
  const paths = [
    "case_dossier.pause_receipt",
    "case_dossier.independent_review_record",
    "case_dossier.same_channel_correction_receipt",
    "case_dossier.retest_ticket",
    "case_dossier.adoption_consequence",
    "case_dossier.recovery_retirement_receipt"
  ];
  const messages = {
    synthetic_complete: en ? "SYNTHETIC RECEIPTS COMPLETE. Not authorized for field use." : "合成回执完整；不代表现场已获授权或恢复。",
    pause: en ? "PAUSED: missing evidence or channel acknowledgement." : "暂停：必要证据或渠道签收不完整。",
    retire: en ? "RETIRE: recovery evidence is missing or incomplete." : "退役：恢复证据缺失或未完成。"
  };
  state.setAttribute("aria-live", "polite");
  let current = JSON.parse(JSON.stringify(window.JZACDemo));
  function show() {
    const result = window.JZACCorrection.evaluate(current);
    state.textContent = messages[result.state];
    state.className = "state " + (result.state === "synthetic_complete" ? "" : result.state);
    state.dataset.result = result.state;
    state.dataset.reason = result.reason;
  }
  document.querySelectorAll("button.fault").forEach(button => button.addEventListener("click", () => {
    current = window.JZACCorrection.removePath(current, paths[Number(button.dataset.index)]);
    show();
  }));
  document.getElementById("reset").addEventListener("click", () => {
    current = JSON.parse(JSON.stringify(window.JZACDemo));
    show();
  });
  show();
})();
