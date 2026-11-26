(function () {
  "use strict";

  const data = window.STUDY_PLAN;
  const plan = data.plan;
  const allDays = data.allDays;
  const allTasks = data.allTasks;
  const totalMinutes = data.totalMinutes;
  const totalTasks = data.totalTasks;
  const dayById = data.dayById;
  const taskById = data.taskById;
  const taskDayId = data.taskDayId;
  const subjectColors = data.subjectColors;
  const subjectOrder = data.subjectOrder;
  const STORAGE_KEY = "study-plan-2026-2027-v2";
  const RING_CIRCUMFERENCE = 2 * Math.PI * 58;

  const state = loadState();
  const todayISO = localISO();
  const taskEls = new Map();
  const dayEls = new Map();
  const weekEls = new Map();
  const subjectEls = new Map();

  const els = {
    themeBtn: document.getElementById("themeBtn"),
    todayBtn: document.getElementById("todayBtn"),
    focusBtn: document.getElementById("focusBtn"),
    nextBtn: document.getElementById("nextBtn"),
    heroTitle: document.getElementById("heroTitle"),
    heroSubtitle: document.getElementById("heroSubtitle"),
    heroNote: document.getElementById("heroNote"),
    ringFg: document.getElementById("ringFg"),
    overallPercent: document.getElementById("overallPercent"),
    statTasks: document.getElementById("statTasks"),
    statTasksSub: document.getElementById("statTasksSub"),
    statHours: document.getElementById("statHours"),
    statHoursSub: document.getElementById("statHoursSub"),
    statDays: document.getElementById("statDays"),
    statDaysSub: document.getElementById("statDaysSub"),
    statStreak: document.getElementById("statStreak"),
    statStreakSub: document.getElementById("statStreakSub"),
    nextCard: document.getElementById("nextCard"),
    nextTitle: document.getElementById("nextTitle"),
    nextMeta: document.getElementById("nextMeta"),
    nextGoBtn: document.getElementById("nextGoBtn"),
    subjectsGrid: document.getElementById("subjectsGrid"),
    weekNav: document.getElementById("weekNav"),
    weeks: document.getElementById("weeks"),
    exportBtn: document.getElementById("exportBtn"),
    importBtn: document.getElementById("importBtn"),
    importFile: document.getElementById("importFile"),
    resetBtn: document.getElementById("resetBtn"),
    toast: document.getElementById("toast"),
    celebrateModal: document.getElementById("celebrateModal"),
    celebrateTitle: document.getElementById("celebrateTitle"),
    celebrateText: document.getElementById("celebrateText"),
    celebrateStats: document.getElementById("celebrateStats"),
    celebrateClose: document.getElementById("celebrateClose")
  };

  function loadState() {
    const fallback = { tasks: {}, days: {}, theme: null };
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (!raw) return fallback;
      const parsed = JSON.parse(raw);
      const tasks = {};
      if (parsed && parsed.tasks && typeof parsed.tasks === "object") {
        Object.keys(parsed.tasks).forEach(function (id) {
          if (parsed.tasks[id] && taskById.has(id)) tasks[id] = true;
        });
      }
      const days = {};
      if (parsed && parsed.days && typeof parsed.days === "object") {
        Object.keys(parsed.days).forEach(function (id) {
          if (!parsed.days[id] || !dayById.has(id)) return;
          const day = dayById.get(id);
          if (day.tasks.every(function (task) { return tasks[task.id]; })) days[id] = true;
        });
      }
      return {
        tasks: tasks,
        days: days,
        theme: parsed && (parsed.theme === "dark" || parsed.theme === "light") ? parsed.theme : null
      };
    } catch (error) {
      return fallback;
    }
  }

  function saveState() {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    } catch (error) {
      // Private mode or storage full: the UI still works for this session.
    }
  }

  function localISO(date) {
    const d = date || new Date();
    const year = d.getFullYear();
    const month = String(d.getMonth() + 1).padStart(2, "0");
    const day = String(d.getDate()).padStart(2, "0");
    return year + "-" + month + "-" + day;
  }

  function formatDuration(minutes) {
    if (minutes < 60) return minutes + " د";
    const hours = Math.floor(minutes / 60);
    const rest = minutes % 60;
    return rest ? hours + " س " + rest + " د" : hours + " س";
  }

  function formatHours(hours) {
    const rounded = Math.round(hours * 100) / 100;
    return Number.isInteger(rounded) ? String(rounded) : String(rounded).replace(/0+$/, "").replace(/\.$/, "");
  }

  function formatHoursValue(minutes) {
    return formatHours(minutes / 60);
  }

  function taskCountLabel(count) {
    if (count === 1) return "مهمة";
    if (count === 2) return "مهمتان";
    return count + " مهام";
  }

  function subjectColor(subject) {
    return subjectColors[subject] || "#64748b";
  }

  function escapeHtml(value) {
    return String(value).replace(/[&<>"']/g, function (character) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[character];
    });
  }

  function getDayStats(day) {
    let doneTasks = 0;
    let doneMinutes = 0;
    day.tasks.forEach(function (task) {
      if (state.tasks[task.id]) {
        doneTasks += 1;
        doneMinutes += task.minutes;
      }
    });
    return {
      doneTasks: doneTasks,
      doneMinutes: doneMinutes,
      totalTasks: day.tasks.length,
      totalMinutes: day.minutes,
      allDone: doneTasks === day.tasks.length,
      dayDone: Boolean(state.days[day.id])
    };
  }

  function getOverall() {
    let doneTasks = 0;
    let doneMinutes = 0;
    let doneDays = 0;
    allTasks.forEach(function (task) {
      if (state.tasks[task.id]) {
        doneTasks += 1;
        doneMinutes += task.minutes;
      }
    });
    allDays.forEach(function (day) {
      if (state.days[day.id]) doneDays += 1;
    });
    return {
      doneTasks: doneTasks,
      doneMinutes: doneMinutes,
      doneDays: doneDays,
      percent: totalMinutes ? Math.round((doneMinutes / totalMinutes) * 100) : 0
    };
  }

  function getWeekStats(week) {
    let doneTasks = 0;
    let doneMinutes = 0;
    let doneDays = 0;
    let total = 0;
    week.days.forEach(function (day) {
      const stats = getDayStats(day);
      doneTasks += stats.doneTasks;
      doneMinutes += stats.doneMinutes;
      total += stats.totalMinutes;
      if (stats.dayDone) doneDays += 1;
    });
    return {
      doneTasks: doneTasks,
      doneMinutes: doneMinutes,
      doneDays: doneDays,
      totalMinutes: total,
      percent: total ? Math.round((doneMinutes / total) * 100) : 0
    };
  }

  function getSubjectStats() {
    const stats = {};
    subjectOrder.forEach(function (subject) {
      stats[subject] = { done: 0, total: 0 };
    });
    allTasks.forEach(function (task) {
      if (!stats[task.subject]) stats[task.subject] = { done: 0, total: 0 };
      stats[task.subject].total += 1;
      if (state.tasks[task.id]) stats[task.subject].done += 1;
    });
    return stats;
  }

  function getStreak() {
    let best = 0;
    let run = 0;
    let lastDone = -1;
    allDays.forEach(function (day, index) {
      if (state.days[day.id]) {
        run += 1;
        lastDone = index;
        if (run > best) best = run;
      } else {
        run = 0;
      }
    });

    // The streak breaks only when a day that is already due was skipped.
    // Finishing tomorrow's day today still counts as a streak of one.
    let current = 0;
    if (lastDone >= 0) {
      let missedDueDay = false;
      for (let index = lastDone + 1; index < allDays.length; index += 1) {
        if (allDays[index].date <= todayISO && !state.days[allDays[index].id]) {
          missedDueDay = true;
          break;
        }
      }
      if (!missedDueDay) {
        for (let index = lastDone; index >= 0; index -= 1) {
          if (state.days[allDays[index].id]) current += 1;
          else break;
        }
      }
    }
    return { current: current, best: best };
  }

  function getNextDay() {
    return allDays.find(function (day) { return !state.days[day.id]; }) || null;
  }

  function getTodayDay() {
    return allDays.find(function (day) { return day.date === todayISO; }) || null;
  }

  function getNextTask(day) {
    if (!day) return null;
    return day.tasks.find(function (task) { return !state.tasks[task.id]; }) || null;
  }

  function buildWeekNav() {
    plan.forEach(function (week) {
      const button = document.createElement("button");
      button.type = "button";
      button.className = "week-chip";
      button.dataset.weekId = week.id;
      button.style.setProperty("--week-color", week.color);
      button.innerHTML = '<span class="week-chip-dot" aria-hidden="true"></span>' + escapeHtml(week.title);
      button.addEventListener("click", function () { scrollToWeek(week.id); });
      els.weekNav.appendChild(button);
    });
  }

  function buildWeeks() {
    plan.forEach(function (week) {
      const section = document.createElement("section");
      section.className = "week";
      section.id = week.id;
      section.style.setProperty("--week-color", week.color);
      section.innerHTML =
        '<div class="week-head">' +
          '<div class="week-title-wrap">' +
            '<span class="week-dot" aria-hidden="true"></span>' +
            '<div><h3>' + escapeHtml(week.title) + '</h3><p>' + escapeHtml(week.range) + '</p></div>' +
          '</div>' +
          '<div class="week-progress-wrap">' +
            '<div class="week-progress" aria-hidden="true"><span></span></div>' +
            '<span class="week-progress-label"></span>' +
          '</div>' +
        '</div>' +
        '<div class="days-grid"></div>';

      const grid = section.querySelector(".days-grid");
      week.days.forEach(function (day) { grid.appendChild(createDay(day)); });
      weekEls.set(week.id, {
        section: section,
        bar: section.querySelector(".week-progress span"),
        label: section.querySelector(".week-progress-label")
      });
      els.weeks.appendChild(section);
    });
  }

  function createDay(day) {
    const card = document.createElement("article");
    card.className = "day-card";
    card.id = day.id;
    card.dataset.dayId = day.id;
    card.innerHTML =
      '<div class="day-head">' +
        '<div>' +
          '<div class="day-name-row">' +
            '<h4 class="day-name">' + escapeHtml(day.name) + '</h4>' +
            '<span class="day-date">' + escapeHtml(day.dateLabel) + '</span>' +
            (day.lesson ? '<span class="badge badge-lesson">دروس</span>' : '') +
            '<span class="badge badge-today" data-badge="today" hidden>اليوم</span>' +
            '<span class="badge badge-next" data-badge="next" hidden>التالي</span>' +
            '<span class="badge badge-done" data-badge="done" hidden>تم</span>' +
          '</div>' +
          '<p class="day-meta">' + taskCountLabel(day.tasks.length) + '</p>' +
        '</div>' +
        '<span class="day-hours">' + formatDuration(day.minutes) + '</span>' +
      '</div>' +
      '<div class="tasks"></div>' +
      '<div class="day-progress" aria-hidden="true"><span></span></div>' +
      '<div class="day-footer">' +
        '<span class="day-status"></span>' +
        '<button class="day-done-btn" type="button" data-day-id="' + day.id + '" disabled>أكمل المهام</button>' +
        '<span class="done-pill" hidden>' +
          '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="m5 12 4.2 4.2L19 6"/></svg>' +
          'تم إنهاء اليوم' +
        '</span>' +
      '</div>';

    const tasksEl = card.querySelector(".tasks");
    day.tasks.forEach(function (task) { tasksEl.appendChild(createTask(task)); });
    dayEls.set(day.id, {
      card: card,
      bar: card.querySelector(".day-progress span"),
      status: card.querySelector(".day-status"),
      button: card.querySelector(".day-done-btn"),
      donePill: card.querySelector(".done-pill"),
      todayBadge: card.querySelector('[data-badge="today"]'),
      nextBadge: card.querySelector('[data-badge="next"]'),
      doneBadge: card.querySelector('[data-badge="done"]')
    });
    return card;
  }

  function createTask(task) {
    const label = document.createElement("label");
    label.className = "task";
    label.dataset.taskId = task.id;
    label.style.setProperty("--subject-color", subjectColor(task.subject));
    label.innerHTML =
      '<input type="checkbox" data-task-id="' + task.id + '" aria-label="' + escapeHtml(task.label) + ' — ' + formatDuration(task.minutes) + '">' +
      '<span class="check" aria-hidden="true"></span>' +
      '<span class="task-main">' +
        '<span class="task-title">' + escapeHtml(task.label) + '</span>' +
        '<span class="task-subject">' + escapeHtml(task.subject) + '</span>' +
      '</span>' +
      '<span class="task-time">' + formatDuration(task.minutes) + '</span>';
    taskEls.set(task.id, { label: label, input: label.querySelector("input") });
    return label;
  }

  function buildSubjects() {
    subjectOrder.forEach(function (subject) {
      const card = document.createElement("div");
      card.className = "subject-card";
      card.style.setProperty("--subject-color", subjectColor(subject));
      card.innerHTML =
        '<div class="subject-top">' +
          '<span class="subject-dot" aria-hidden="true"></span>' +
          '<span class="subject-name">' + escapeHtml(subject) + '</span>' +
          '<span class="subject-count" data-role="count" dir="ltr"></span>' +
        '</div>' +
        '<div class="subject-bar" aria-hidden="true"><span data-role="bar"></span></div>' +
        '<span class="subject-percent" data-role="percent"></span>';
      subjectEls.set(subject, {
        count: card.querySelector('[data-role="count"]'),
        bar: card.querySelector('[data-role="bar"]'),
        percent: card.querySelector('[data-role="percent"]')
      });
      els.subjectsGrid.appendChild(card);
    });
  }

  function updateUI() {
    const overall = getOverall();
    const streak = getStreak();
    const nextDay = getNextDay();
    const todayDay = getTodayDay();

    els.ringFg.style.strokeDashoffset = String(RING_CIRCUMFERENCE * (1 - overall.percent / 100));
    els.overallPercent.textContent = overall.percent + "%";

    els.statTasks.textContent = overall.doneTasks + " / " + totalTasks;
    els.statTasksSub.textContent = overall.doneTasks === totalTasks ? "كل المهام مكتملة" : "مهمة منجزة";
    els.statHours.textContent = formatHoursValue(overall.doneMinutes) + " / " + formatHoursValue(totalMinutes);
    els.statHoursSub.textContent = "ساعة مذاكرة";
    els.statDays.textContent = overall.doneDays + " / " + allDays.length;
    els.statDaysSub.textContent = "يوم مكتمل";
    els.statStreak.textContent = String(streak.current);
    els.statStreakSub.textContent = "أفضل سلسلة: " + streak.best;

    updateHero(overall, nextDay, todayDay);
    updateNextCard(nextDay, todayDay);
    updateSubjects();
    updateWeeks(nextDay);

    allTasks.forEach(function (task) {
      const refs = taskEls.get(task.id);
      const done = Boolean(state.tasks[task.id]);
      refs.label.classList.toggle("done", done);
      refs.input.checked = done;
    });
  }

  function updateHero(overall, nextDay, todayDay) {
    let title = "ابدأ أول يوم";
    let subtitle = "الخطة جاهزة. أول مهمة هي أصعب خطوة.";

    if (overall.percent === 100) {
      title = "أنهيت الخطة كلها";
      subtitle = "كل يوم وكل مهمة خلصت. ده إنجاز كبير.";
    } else if (todayDay) {
      if (state.days[todayDay.id]) {
        title = "أنجزت يوم اليوم";
        subtitle = "اليوم " + todayDay.name + " " + todayDay.dateLabel + " — " + taskCountLabel(todayDay.tasks.length) + " خلصت. خد راحتك.";
      } else {
        title = "اليوم: " + todayDay.name + " " + todayDay.dateLabel;
        subtitle = "أمامك " + taskCountLabel(todayDay.tasks.length) + " و" + formatDuration(todayDay.minutes) + ". ابدأ بأول مهمة.";
      }
    } else if (todayISO < allDays[0].date) {
      title = "غداً نبدأ";
      subtitle = "أول يوم: " + allDays[0].name + " " + allDays[0].dateLabel + " — " + allDays[0].tasks.map(function (task) { return task.label; }).join("، ") + ".";
    } else if (todayISO > allDays[allDays.length - 1].date) {
      title = "انتهت مدة الخطة";
      subtitle = "تقدر تراجع إنجازك أو تصدّر تقدمك وتحتفظ به.";
    } else if (overall.percent < 50) {
      title = "أنت في الطريق";
      subtitle = "أنجزت " + formatHoursValue(overall.doneMinutes) + " ساعة من " + formatHoursValue(totalMinutes) + "، و" + overall.doneDays + " يوم من " + allDays.length + ".";
    } else {
      title = "استمر، النتيجة قريبة";
      subtitle = "أنجزت " + overall.percent + "% من الخطة. باقي " + formatHoursValue(totalMinutes - overall.doneMinutes) + " ساعة.";
    }

    els.heroTitle.textContent = title;
    els.heroSubtitle.textContent = subtitle;

    if (nextDay) {
      const nextTask = getNextTask(nextDay);
      els.heroNote.textContent = "التالي: " + nextDay.name + " " + nextDay.dateLabel + " — " + (nextTask ? nextTask.label : "كل المهام جاهزة") + ".";
    } else {
      els.heroNote.textContent = "كل الأيام مكتملة. مبروك.";
    }
  }

  function updateNextCard(nextDay, todayDay) {
    if (!nextDay) {
      els.nextCard.classList.add("is-complete");
      els.nextTitle.textContent = "أنهيت كل الأيام";
      els.nextMeta.textContent = "ما فيش مهام متبقية. إنجاز رائع.";
      els.nextGoBtn.hidden = true;
      return;
    }

    const nextTask = getNextTask(nextDay);
    els.nextCard.classList.remove("is-complete");
    els.nextTitle.textContent = nextTask ? nextTask.label : "كل مهام اليوم جاهزة";
    const dayLabel = nextDay.date === todayISO ? "اليوم" : nextDay.name + " " + nextDay.dateLabel;
    els.nextMeta.textContent = dayLabel + " · " + taskCountLabel(nextDay.tasks.length) + " · " + formatDuration(nextDay.minutes);
    els.nextGoBtn.hidden = false;
    els.nextGoBtn.dataset.dayId = nextDay.id;
    els.nextGoBtn.textContent = "اذهب إلى اليوم";
  }

  function updateSubjects() {
    const stats = getSubjectStats();
    subjectOrder.forEach(function (subject) {
      const refs = subjectEls.get(subject);
      const subjectStats = stats[subject] || { done: 0, total: 0 };
      const percent = subjectStats.total ? Math.round((subjectStats.done / subjectStats.total) * 100) : 0;
      refs.count.textContent = subjectStats.done + " / " + subjectStats.total;
      refs.bar.style.width = percent + "%";
      refs.percent.textContent = percent + "%";
    });
  }

  function updateWeeks(nextDay) {
    plan.forEach(function (week) {
      const weekStats = getWeekStats(week);
      const refs = weekEls.get(week.id);
      refs.bar.style.width = weekStats.percent + "%";
      refs.label.textContent = weekStats.doneDays + " من " + week.days.length + " أيام · " + weekStats.percent + "%";
      week.days.forEach(function (day) { updateDay(day, nextDay); });
    });
  }

  function updateDay(day, nextDay) {
    const refs = dayEls.get(day.id);
    const stats = getDayStats(day);
    const isToday = day.date === todayISO;
    const isNext = nextDay && nextDay.id === day.id;

    refs.card.classList.toggle("today", isToday);
    refs.card.classList.toggle("done", stats.dayDone);
    refs.card.classList.toggle("ready", stats.allDone && !stats.dayDone);
    refs.todayBadge.hidden = !isToday;
    refs.nextBadge.hidden = !(isNext && !isToday);
    refs.doneBadge.hidden = !stats.dayDone;
    refs.bar.style.width = (stats.totalMinutes ? Math.round((stats.doneMinutes / stats.totalMinutes) * 100) : 0) + "%";
    refs.status.textContent = stats.dayDone ? "اليوم مكتمل" : stats.doneTasks + " من " + stats.totalTasks + " مهام";
    refs.button.hidden = stats.dayDone;
    refs.donePill.hidden = !stats.dayDone;

    if (!stats.dayDone) {
      refs.button.disabled = !stats.allDone;
      refs.button.classList.toggle("ready", stats.allDone);
      refs.button.textContent = stats.allDone ? "أنهيت اليوم" : "أكمل المهام";
    }
  }

  function setActiveWeek(weekId) {
    els.weekNav.querySelectorAll(".week-chip").forEach(function (button) {
      button.classList.toggle("active", button.dataset.weekId === weekId);
    });
  }

  function scrollToWeek(weekId) {
    const week = weekEls.get(weekId);
    if (!week) return;
    setActiveWeek(weekId);
    week.section.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  function scrollToDay(dayId) {
    const refs = dayEls.get(dayId);
    if (!refs) return;
    refs.card.scrollIntoView({ behavior: "smooth", block: "center" });
    refs.card.classList.remove("flash");
    void refs.card.offsetWidth;
    refs.card.classList.add("flash");
    setTimeout(function () { refs.card.classList.remove("flash"); }, 1300);
  }

  function applyTheme(theme, persist) {
    document.documentElement.dataset.theme = theme;
    if (persist) {
      state.theme = theme;
      saveState();
    }
    const dark = theme === "dark";
    els.themeBtn.setAttribute("aria-label", dark ? "التبديل إلى الوضع الفاتح" : "التبديل إلى الوضع الداكن");
    els.themeBtn.title = dark ? "الوضع الفاتح" : "الوضع الداكن";
  }

  let toastTimer = null;
  function showToast(message) {
    els.toast.textContent = message;
    els.toast.classList.add("show");
    clearTimeout(toastTimer);
    toastTimer = setTimeout(function () { els.toast.classList.remove("show"); }, 2800);
  }

  function init() {
    const prefersDark = window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches;
    applyTheme(state.theme || (prefersDark ? "dark" : "light"), false);
    buildWeekNav();
    buildWeeks();
    buildSubjects();
    updateUI();
    setActiveWeek(plan[0].id);
  }

  window.StudyApp = {
    plan: plan,
    allDays: allDays,
    allTasks: allTasks,
    totalMinutes: totalMinutes,
    totalTasks: totalTasks,
    dayById: dayById,
    taskById: taskById,
    taskDayId: taskDayId,
    state: state,
    saveState: saveState,
    updateUI: updateUI,
    init: init,
    getDayStats: getDayStats,
    getOverall: getOverall,
    getWeekStats: getWeekStats,
    getSubjectStats: getSubjectStats,
    getStreak: getStreak,
    getNextDay: getNextDay,
    getTodayDay: getTodayDay,
    getNextTask: getNextTask,
    formatDuration: formatDuration,
    formatHours: formatHours,
    formatHoursValue: formatHoursValue,
    taskCountLabel: taskCountLabel,
    escapeHtml: escapeHtml,
    applyTheme: applyTheme,
    scrollToDay: scrollToDay,
    scrollToWeek: scrollToWeek,
    setActiveWeek: setActiveWeek,
    showToast: showToast,
    els: els
  };
})();
