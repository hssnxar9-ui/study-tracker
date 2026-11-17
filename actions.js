(function () {
  "use strict";

  const app = window.StudyApp;
  const state = app.state;
  const els = app.els;
  let closeTimer = null;

  function bindEvents() {
    els.weeks.addEventListener("change", onTaskChange);
    els.weeks.addEventListener("click", onDayAction);

    els.themeBtn.addEventListener("click", function () {
      const nextTheme = document.documentElement.dataset.theme === "dark" ? "light" : "dark";
      app.applyTheme(nextTheme, true);
    });

    els.todayBtn.addEventListener("click", focusNext);
    els.focusBtn.addEventListener("click", focusNext);
    els.nextBtn.addEventListener("click", focusNext);
    els.nextGoBtn.addEventListener("click", function () {
      if (els.nextGoBtn.dataset.dayId) app.scrollToDay(els.nextGoBtn.dataset.dayId);
    });

    els.exportBtn.addEventListener("click", exportProgress);
    els.importBtn.addEventListener("click", function () { els.importFile.click(); });
    els.importFile.addEventListener("change", importProgress);
    els.resetBtn.addEventListener("click", resetProgress);

    els.celebrateClose.addEventListener("click", closeCelebrate);
    els.celebrateModal.addEventListener("click", function (event) {
      if (event.target === els.celebrateModal) closeCelebrate();
    });
    document.addEventListener("keydown", function (event) {
      if (event.key === "Escape" && !els.celebrateModal.hidden) closeCelebrate();
    });

    window.addEventListener("scroll", onScroll, { passive: true });
  }

  function focusNext() {
    const nextDay = app.getNextDay();
    if (nextDay) app.scrollToDay(nextDay.id);
    else app.showToast("كل الأيام مكتملة.");
  }

  function onTaskChange(event) {
    const input = event.target.closest('input[type="checkbox"][data-task-id]');
    if (!input) return;

    const taskId = input.dataset.taskId;
    const task = app.taskById.get(taskId);
    const dayId = app.taskDayId.get(taskId);
    if (!task || !dayId) return;

    if (input.checked) {
      state.tasks[taskId] = true;
    } else {
      delete state.tasks[taskId];
      delete state.days[dayId];
    }

    app.saveState();
    app.updateUI();

    if (input.checked) {
      const day = app.dayById.get(dayId);
      const stats = app.getDayStats(day);
      if (stats.allDone && !stats.dayDone) {
        app.showToast("أكملت مهام اليوم. اضغط «أنهيت اليوم».");
      } else {
        app.showToast("تم تسجيل " + task.label + ".");
      }
    } else {
      app.showToast("تم إلغاء " + task.label + ".");
    }
  }

  function onDayAction(event) {
    const button = event.target.closest(".day-done-btn");
    if (!button) return;

    const day = app.dayById.get(button.dataset.dayId);
    if (!day) return;
    const stats = app.getDayStats(day);
    if (!stats.allDone || stats.dayDone) return;

    state.days[day.id] = true;
    app.saveState();
    app.updateUI();
    celebrate(day);
  }

  function celebrate(day) {
    const overall = app.getOverall();
    const streak = app.getStreak();

    els.celebrateTitle.textContent = "أنجزت " + day.name + " " + day.dateLabel;
    els.celebrateText.textContent = "أتممت " + app.taskCountLabel(day.tasks.length) + " و" + app.formatDuration(day.minutes) + ".";
    els.celebrateStats.innerHTML =
      '<div class="modal-stat"><strong dir="ltr">' + overall.doneDays + " / " + app.allDays.length + '</strong><span>أيام مكتملة</span></div>' +
      '<div class="modal-stat"><strong dir="ltr">' + overall.percent + '%</strong><span>التقدم الكلي</span></div>' +
      '<div class="modal-stat"><strong dir="ltr">' + streak.current + '</strong><span>السلسلة</span></div>';

    clearTimeout(closeTimer);
    els.celebrateModal.hidden = false;
    document.body.classList.add("modal-open");

    // Open synchronously so the dialog still appears when rAF is throttled
    // (background tab, reduced motion, low-power mode).
    void els.celebrateModal.offsetWidth;
    els.celebrateModal.classList.add("open");
    els.celebrateClose.focus({ preventScroll: true });
  }

  function closeCelebrate() {
    els.celebrateModal.classList.remove("open");
    document.body.classList.remove("modal-open");
    clearTimeout(closeTimer);
    closeTimer = setTimeout(function () {
      els.celebrateModal.hidden = true;
    }, 200);
  }

  function exportProgress() {
    const payload = {
      version: 1,
      exportedAt: new Date().toISOString(),
      tasks: state.tasks,
      days: state.days,
      theme: state.theme
    };
    const blob = new Blob([JSON.stringify(payload, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "study-progress-" + new Date().toISOString().slice(0, 10) + ".json";
    document.body.appendChild(link);
    link.click();
    link.remove();
    URL.revokeObjectURL(url);
    app.showToast("تم تصدير نسخة من التقدم.");
  }

  function importProgress(event) {
    const file = event.target.files && event.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = function () {
      try {
        const parsed = JSON.parse(String(reader.result));
        if (!parsed || typeof parsed !== "object" || !parsed.tasks || !parsed.days) {
          throw new Error("invalid");
        }
        if (!window.confirm("سيتم استبدال التقدم الحالي. متابعة؟")) return;

        const tasks = {};
        Object.keys(parsed.tasks).forEach(function (id) {
          if (parsed.tasks[id] && app.taskById.has(id)) tasks[id] = true;
        });
        const days = {};
        Object.keys(parsed.days).forEach(function (id) {
          if (!parsed.days[id] || !app.dayById.has(id)) return;
          // A day only counts as done when every task in it is done.
          const day = app.dayById.get(id);
          if (day.tasks.every(function (task) { return tasks[task.id]; })) days[id] = true;
        });

        state.tasks = tasks;
        state.days = days;
        if (parsed.theme === "dark" || parsed.theme === "light") {
          state.theme = parsed.theme;
          app.applyTheme(parsed.theme, false);
        }
        app.saveState();
        app.updateUI();
        app.showToast("تم استيراد التقدم.");
      } catch (error) {
        window.alert("الملف مش صالح. اختار ملف تقدم تم تصديره من الموقع.");
      } finally {
        event.target.value = "";
      }
    };
    reader.readAsText(file);
  }

  function resetProgress() {
    if (!window.confirm("هل تريد مسح كل التقدم؟ لا يمكن التراجع.")) return;
    state.tasks = {};
    state.days = {};
    app.saveState();
    app.updateUI();
    app.showToast("تم مسح التقدم. بداية جديدة.");
  }

  let scrollTicking = false;
  function onScroll() {
    if (scrollTicking) return;
    scrollTicking = true;
    requestAnimationFrame(function () {
      const threshold = 140;
      let active = app.plan[0].id;
      app.plan.forEach(function (week) {
        const section = document.getElementById(week.id);
        if (section && section.getBoundingClientRect().top <= threshold) active = week.id;
      });
      app.setActiveWeek(active);
      scrollTicking = false;
    });
  }

  function start() {
    app.init();
    bindEvents();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", start);
  } else {
    start();
  }
})();
