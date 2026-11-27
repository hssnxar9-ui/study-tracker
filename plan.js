/* بيانات الخطة — الترم الأول 2026–2027: 30 يوماً + 4 أيام مراجعة */
(function () {
  "use strict";

  const WEEK_COLORS = ["#4f7a6a", "#5b7285", "#7a6a8f", "#9a7b4f", "#8a5f6a"];

  const SUBJECT_COLORS = {
    "حفظ قرآن": "#6b7f4f",
    "نحو": "#4f7a6a",
    "صرف": "#9a7b4f",
    "فقه": "#5b7285",
    "حديث": "#7a6a8f",
    "توحيد": "#8a6a6a",
    "رياضيات": "#4f6f8f",
    "فيزياء": "#6a6f8f",
    "كيمياء": "#5f7a5a",
    "تاريخ": "#9a6a4f",
    "بلاغة": "#8a5f6a",
    "إنجليزي": "#5f6f7a",
    "تفسير": "#4f7a7a",
    "أدب ونصوص": "#7a5f7a",
    "مراجعة": "#8a7a5f"
  };

  const SUBJECT_ORDER = [
    "حفظ قرآن",
    "نحو", "صرف", "فقه", "حديث", "توحيد", "رياضيات", "فيزياء", "كيمياء",
    "تاريخ", "بلاغة", "إنجليزي", "تفسير", "أدب ونصوص", "مراجعة"
  ];

  const rawPlan = [
    {
      id: "w1",
      title: "الأسبوع الأول",
      range: "27/11 – 4/12",
      days: [
        {
          id: "w1-d1", name: "الجمعة", date: "2026-11-27", dateLabel: "27/11", lesson: false,
          tasks: [
            ["فقه", "فقه 1", 90],
            ["حديث", "حديث 1", 90],
            ["صرف", "صرف 1", 90]
          ]
        },
        {
          id: "w1-d2", name: "السبت", date: "2026-11-28", dateLabel: "28/11", lesson: false,
          tasks: [
            ["رياضيات", "رياضيات 1", 90],
            ["إنجليزي", "إنجليزي 1", 90],
            ["توحيد", "توحيد 1-2", 90]
          ]
        },
        {
          id: "w1-d3", name: "الأحد", date: "2026-11-29", dateLabel: "29/11", lesson: false,
          tasks: [
            ["فقه", "فقه 2", 90],
            ["كيمياء", "كيمياء 1", 90],
            ["تفسير", "تفسير 1", 90]
          ]
        },
        {
          id: "w1-d4", name: "الإثنين", date: "2026-11-30", dateLabel: "30/11", lesson: false,
          tasks: [
            ["فيزياء", "فيزياء 1", 90],
            ["نحو", "نحو 1", 90],
            ["صرف", "صرف 2", 90]
          ]
        },
        {
          id: "w1-d5", name: "الثلاثاء", date: "2026-12-01", dateLabel: "1/12", lesson: false,
          tasks: [
            ["رياضيات", "رياضيات 2", 90],
            ["تاريخ", "تاريخ 1", 90],
            ["بلاغة", "بلاغة 1", 90]
          ]
        },
        {
          id: "w1-d6", name: "الأربعاء", date: "2026-12-02", dateLabel: "2/12", lesson: false,
          tasks: [
            ["فيزياء", "فيزياء 2", 90],
            ["كيمياء", "كيمياء 2", 90],
            ["حديث", "حديث 2", 90]
          ]
        },
        {
          id: "w1-d7", name: "الخميس", date: "2026-12-03", dateLabel: "3/12", lesson: false,
          tasks: [
            ["فقه", "فقه 3", 90],
            ["نحو", "نحو 2", 90],
            ["توحيد", "توحيد 3-4", 90]
          ]
        },
        {
          id: "w1-d8", name: "الجمعة", date: "2026-12-04", dateLabel: "4/12", lesson: false,
          tasks: [
            ["تاريخ", "تاريخ 2", 90],
            ["صرف", "صرف 3", 90],
            ["تفسير", "تفسير 2", 90]
          ]
        }
      ]
    },
    {
      id: "w2",
      title: "الأسبوع الثاني",
      range: "5/12 – 11/12",
      days: [
        {
          id: "w2-d1", name: "السبت", date: "2026-12-05", dateLabel: "5/12", lesson: false,
          tasks: [
            ["رياضيات", "رياضيات 3", 90],
            ["إنجليزي", "إنجليزي 2", 90],
            ["حديث", "حديث 3", 90]
          ]
        },
        {
          id: "w2-d2", name: "الأحد", date: "2026-12-06", dateLabel: "6/12", lesson: false,
          tasks: [
            ["فقه", "فقه 4", 90],
            ["كيمياء", "كيمياء 3", 90],
            ["بلاغة", "بلاغة 2", 90]
          ]
        },
        {
          id: "w2-d3", name: "الإثنين", date: "2026-12-07", dateLabel: "7/12", lesson: false,
          tasks: [
            ["فيزياء", "فيزياء 3", 90],
            ["نحو", "نحو 3", 90],
            ["صرف", "صرف 4", 90]
          ]
        },
        {
          id: "w2-d4", name: "الثلاثاء", date: "2026-12-08", dateLabel: "8/12", lesson: false,
          tasks: [
            ["رياضيات", "رياضيات 4", 90],
            ["تاريخ", "تاريخ 3", 90],
            ["توحيد", "توحيد 5-6", 90]
          ]
        },
        {
          id: "w2-d5", name: "الأربعاء", date: "2026-12-09", dateLabel: "9/12", lesson: false,
          tasks: [
            ["فيزياء", "فيزياء 4", 90],
            ["كيمياء", "كيمياء 4", 90],
            ["حديث", "حديث 4", 90]
          ]
        },
        {
          id: "w2-d6", name: "الخميس", date: "2026-12-10", dateLabel: "10/12", lesson: false,
          tasks: [
            ["فقه", "فقه 5", 90],
            ["نحو", "نحو 4", 90],
            ["تفسير", "تفسير 3", 90]
          ]
        },
        {
          id: "w2-d7", name: "الجمعة", date: "2026-12-11", dateLabel: "11/12", lesson: false,
          tasks: [
            ["تاريخ", "تاريخ 4", 90],
            ["صرف", "صرف 5", 90],
            ["بلاغة", "بلاغة 3", 90]
          ]
        }
      ]
    },
    {
      id: "w3",
      title: "الأسبوع الثالث",
      range: "12/12 – 18/12",
      days: [
        {
          id: "w3-d1", name: "السبت", date: "2026-12-12", dateLabel: "12/12", lesson: false,
          tasks: [
            ["رياضيات", "رياضيات 5", 90],
            ["إنجليزي", "إنجليزي 3", 90],
            ["حديث", "حديث 5", 90]
          ]
        },
        {
          id: "w3-d2", name: "الأحد", date: "2026-12-13", dateLabel: "13/12", lesson: false,
          tasks: [
            ["فقه", "فقه 6", 90],
            ["كيمياء", "كيمياء 5", 90],
            ["توحيد", "توحيد 7-8", 90]
          ]
        },
        {
          id: "w3-d3", name: "الإثنين", date: "2026-12-14", dateLabel: "14/12", lesson: false,
          tasks: [
            ["فيزياء", "فيزياء 5", 90],
            ["نحو", "نحو 5", 90],
            ["صرف", "صرف 6", 90]
          ]
        },
        {
          id: "w3-d4", name: "الثلاثاء", date: "2026-12-15", dateLabel: "15/12", lesson: false,
          tasks: [
            ["رياضيات", "رياضيات 6", 90],
            ["إنجليزي", "إنجليزي 4", 90],
            ["تفسير", "تفسير 4", 90]
          ]
        },
        {
          id: "w3-d5", name: "الأربعاء", date: "2026-12-16", dateLabel: "16/12", lesson: false,
          tasks: [
            ["فيزياء", "فيزياء 6", 90],
            ["كيمياء", "كيمياء 6", 90],
            ["حديث", "حديث 6", 90]
          ]
        },
        {
          id: "w3-d6", name: "الخميس", date: "2026-12-17", dateLabel: "17/12", lesson: false,
          tasks: [
            ["فقه", "فقه 7", 90],
            ["نحو", "نحو 6", 90],
            ["بلاغة", "بلاغة 4", 90]
          ]
        },
        {
          id: "w3-d7", name: "الجمعة", date: "2026-12-18", dateLabel: "18/12", lesson: false,
          tasks: [
            ["تاريخ", "تاريخ 5", 90],
            ["نحو", "نحو 7", 90],
            ["حديث", "حديث 7", 90]
          ]
        }
      ]
    },
    {
      id: "w4",
      title: "الأسبوع الرابع",
      range: "19/12 – 26/12",
      days: [
        {
          id: "w4-d1", name: "السبت", date: "2026-12-19", dateLabel: "19/12", lesson: false,
          tasks: [
            ["رياضيات", "رياضيات 7", 90],
            ["إنجليزي", "إنجليزي 5", 90],
            ["حديث", "حديث 8", 90]
          ]
        },
        {
          id: "w4-d2", name: "الأحد", date: "2026-12-20", dateLabel: "20/12", lesson: false,
          tasks: [
            ["فقه", "فقه 8", 90],
            ["كيمياء", "كيمياء 7", 90],
            ["أدب ونصوص", "أدب ونصوص 1", 90]
          ]
        },
        {
          id: "w4-d3", name: "الإثنين", date: "2026-12-21", dateLabel: "21/12", lesson: false,
          tasks: [
            ["فيزياء", "فيزياء 7", 90],
            ["نحو", "نحو 8", 90],
            ["حديث", "حديث 9", 90]
          ]
        },
        {
          id: "w4-d4", name: "الثلاثاء", date: "2026-12-22", dateLabel: "22/12", lesson: false,
          tasks: [
            ["رياضيات", "رياضيات 8", 90],
            ["إنجليزي", "إنجليزي 6", 90],
            ["تاريخ", "تاريخ 6", 90]
          ]
        },
        {
          id: "w4-d5", name: "الأربعاء", date: "2026-12-23", dateLabel: "23/12", lesson: false,
          tasks: [
            ["فيزياء", "فيزياء 8", 90],
            ["كيمياء", "كيمياء 8", 90],
            ["أدب ونصوص", "أدب ونصوص 2", 90]
          ]
        },
        {
          id: "w4-d6", name: "الخميس", date: "2026-12-24", dateLabel: "24/12", lesson: false,
          tasks: [
            ["فقه", "فقه 9", 90],
            ["نحو", "نحو 9", 90],
            ["تاريخ", "تاريخ 7", 90]
          ]
        },
        {
          id: "w4-d7", name: "الجمعة", date: "2026-12-25", dateLabel: "25/12", lesson: false,
          tasks: [
            ["فقه", "فقه 10", 90],
            ["نحو", "نحو 10", 90],
            ["حديث", "حديث 10", 90]
          ]
        },
        {
          id: "w4-d8", name: "السبت", date: "2026-12-26", dateLabel: "26/12", lesson: false,
          tasks: [
            ["فقه", "فقه 11", 90],
            ["نحو", "نحو 11-12", 90],
            ["تاريخ", "تاريخ 8", 90],
            ["بلاغة", "بلاغة 5", 90]
          ]
        }
      ]
    },
    {
      id: "w5",
      title: "المراجعة النهائية",
      range: "27/12 – 30/12",
      days: [
        {
          id: "w5-d1", name: "الأحد", date: "2026-12-27", dateLabel: "27/12", lesson: false,
          tasks: [
            ["مراجعة", "حل امتحانات سابقة — المواد الثقافية والعربية", 180]
          ]
        },
        {
          id: "w5-d2", name: "الإثنين", date: "2026-12-28", dateLabel: "28/12", lesson: false,
          tasks: [
            ["مراجعة", "مراجعة الفقه الشافعي", 180]
          ]
        },
        {
          id: "w5-d3", name: "الثلاثاء", date: "2026-12-29", dateLabel: "29/12", lesson: false,
          tasks: [
            ["مراجعة", "مراجعة الرياضيات البحتة", 180]
          ]
        },
        {
          id: "w5-d4", name: "الأربعاء", date: "2026-12-30", dateLabel: "30/12", lesson: false,
          tasks: [
            ["مراجعة", "مراجعة شاملة — الفقه + الرياضيات", 180]
          ]
        }
      ]
    }
  ];

  const plan = rawPlan.map(function (week, weekIndex) {
    const days = week.days.map(function (day) {
      const tasks = day.tasks.map(function (task, taskIndex) {
        return {
          id: day.id + "-t" + (taskIndex + 1),
          subject: task[0],
          label: task[1],
          minutes: task[2]
        };
      });
      // ربع ساعة حفظ قرآن يومياً، أول كل يوم، بمعرّف ثابت لا يغيّر معرّفات المهام.
      tasks.unshift({
        id: day.id + "-quran",
        subject: "حفظ قرآن",
        label: "حفظ القرآن",
        minutes: 15
      });
      const minutes = tasks.reduce(function (sum, task) { return sum + task.minutes; }, 0);
      return {
        id: day.id,
        name: day.name,
        date: day.date,
        dateLabel: day.dateLabel,
        hours: minutes / 60,
        lesson: day.lesson,
        tasks: tasks,
        minutes: minutes
      };
    });
    return {
      id: week.id,
      title: week.title,
      range: week.range,
      color: WEEK_COLORS[weekIndex % WEEK_COLORS.length],
      days: days
    };
  });

  const allDays = plan.reduce(function (list, week) { return list.concat(week.days); }, []);
  const allTasks = allDays.reduce(function (list, day) { return list.concat(day.tasks); }, []);
  const totalMinutes = allTasks.reduce(function (sum, task) { return sum + task.minutes; }, 0);

  const dayById = new Map(allDays.map(function (day) { return [day.id, day]; }));
  const taskById = new Map(allTasks.map(function (task) { return [task.id, task]; }));
  const taskDayId = new Map();
  allDays.forEach(function (day) {
    day.tasks.forEach(function (task) { taskDayId.set(task.id, day.id); });
  });

  window.STUDY_PLAN = {
    plan: plan,
    allDays: allDays,
    allTasks: allTasks,
    totalMinutes: totalMinutes,
    totalTasks: allTasks.length,
    dayById: dayById,
    taskById: taskById,
    taskDayId: taskDayId,
    subjectColors: SUBJECT_COLORS,
    subjectOrder: SUBJECT_ORDER
  };
})();
