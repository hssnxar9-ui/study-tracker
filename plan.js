/* بيانات الخطة — الترم الأول 2026–2027 */
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
    "مطالعة/إنشاء": "#8f7a4f",
    "تفسير": "#4f7a7a",
    "أدب ونصوص": "#7a5f7a",
    "اختبار": "#8a5f5f",
    "راحة": "#8a8a80",
    "نحو وفقه": "#4f7a6a"
  };

  const SUBJECT_ORDER = [
    "حفظ قرآن",
    "نحو", "صرف", "فقه", "حديث", "توحيد", "رياضيات", "فيزياء", "كيمياء",
    "تاريخ", "بلاغة", "إنجليزي", "مطالعة/إنشاء", "تفسير", "أدب ونصوص",
    "اختبار", "نحو وفقه"
  ];

  const rawPlan = [
    {
      id: "w1",
      title: "الأسبوع الأول",
      range: "17/11 – 20/11",
      days: [
        {
          id: "w1-d1", name: "الثلاثاء", date: "2026-11-17", dateLabel: "17/11", hours: 6, lesson: false,
          tasks: [
            ["نحو", "نحو 1", 90],
            ["صرف", "صرف 1", 90],
            ["فقه", "فقه 1", 90],
            ["حديث", "حديث 1", 90]
          ]
        },
        {
          id: "w1-d2", name: "الأربعاء", date: "2026-11-18", dateLabel: "18/11", hours: 4, lesson: true,
          tasks: [
            ["رياضيات", "رياضيات 1", 80],
            ["فيزياء", "فيزياء 1", 80],
            ["كيمياء", "كيمياء 1", 80]
          ]
        },
        {
          id: "w1-d3", name: "الخميس", date: "2026-11-19", dateLabel: "19/11", hours: 6, lesson: false,
          tasks: [
            ["نحو", "نحو 2", 90],
            ["توحيد", "توحيد 1", 90],
            ["فقه", "فقه 2", 90],
            ["حديث", "حديث 2", 90]
          ]
        },
        {
          id: "w1-d4", name: "الجمعة", date: "2026-11-20", dateLabel: "20/11", hours: 4, lesson: false,
          tasks: [
            ["تاريخ", "تاريخ 1", 90],
            ["بلاغة", "بلاغة 1", 90],
            ["اختبار", "اختبار تراكمي خفيف", 60]
          ]
        }
      ]
    },
    {
      id: "w2",
      title: "الأسبوع الثاني",
      range: "21/11 – 27/11",
      days: [
        {
          id: "w2-d1", name: "السبت", date: "2026-11-21", dateLabel: "21/11", hours: 6, lesson: false,
          tasks: [
            ["نحو", "نحو 3", 90],
            ["صرف", "صرف 2", 90],
            ["فقه", "فقه 3", 90],
            ["توحيد", "توحيد 2", 90]
          ]
        },
        {
          id: "w2-d2", name: "الأحد", date: "2026-11-22", dateLabel: "22/11", hours: 4, lesson: true,
          tasks: [
            ["رياضيات", "رياضيات 2", 80],
            ["إنجليزي", "إنجليزي 1", 80],
            ["كيمياء", "كيمياء 2", 80]
          ]
        },
        {
          id: "w2-d3", name: "الإثنين", date: "2026-11-23", dateLabel: "23/11", hours: 6, lesson: false,
          tasks: [
            ["فيزياء", "فيزياء 2", 90],
            ["كيمياء", "كيمياء 3", 90],
            ["حديث", "حديث 3", 90],
            ["نحو", "نحو 4", 90]
          ]
        },
        {
          id: "w2-d4", name: "الثلاثاء", date: "2026-11-24", dateLabel: "24/11", hours: 6, lesson: false,
          tasks: [
            ["فقه", "فقه 4", 90],
            ["توحيد", "توحيد 3", 90],
            ["تاريخ", "تاريخ 2", 90],
            ["بلاغة", "بلاغة 2", 90]
          ]
        },
        {
          id: "w2-d5", name: "الأربعاء", date: "2026-11-25", dateLabel: "25/11", hours: 4, lesson: true,
          tasks: [
            ["رياضيات", "رياضيات 3", 80],
            ["فيزياء", "فيزياء 3", 80],
            ["صرف", "صرف 3", 80]
          ]
        },
        {
          id: "w2-d6", name: "الخميس", date: "2026-11-26", dateLabel: "26/11", hours: 6, lesson: false,
          tasks: [
            ["نحو", "نحو 5", 90],
            ["مطالعة/إنشاء", "مطالعة/إنشاء 1", 90],
            ["تفسير", "تفسير 1", 90],
            ["إنجليزي", "إنجليزي 2", 90]
          ]
        },
        {
          id: "w2-d7", name: "الجمعة", date: "2026-11-27", dateLabel: "27/11", hours: 2.75, lesson: false,
          tasks: [
            ["اختبار", "اختبار تراكمي على ما سبق", 120],
            ["راحة", "راحة", 45]
          ]
        }
      ]
    },
    {
      id: "w3",
      title: "الأسبوع الثالث",
      range: "28/11 – 4/12",
      days: [
        {
          id: "w3-d1", name: "السبت", date: "2026-11-28", dateLabel: "28/11", hours: 6, lesson: false,
          tasks: [
            ["نحو", "نحو 6", 90],
            ["فقه", "فقه 5", 90],
            ["حديث", "حديث 4", 90],
            ["فيزياء", "فيزياء 4", 90]
          ]
        },
        {
          id: "w3-d2", name: "الأحد", date: "2026-11-29", dateLabel: "29/11", hours: 4, lesson: true,
          tasks: [
            ["رياضيات", "رياضيات 4", 80],
            ["إنجليزي", "إنجليزي 3", 80],
            ["كيمياء", "كيمياء 4", 80]
          ]
        },
        {
          id: "w3-d3", name: "الإثنين", date: "2026-11-30", dateLabel: "30/11", hours: 6, lesson: false,
          tasks: [
            ["فيزياء", "فيزياء 5", 90],
            ["كيمياء", "كيمياء 5", 90],
            ["نحو", "نحو 7", 90],
            ["توحيد", "توحيد 4", 90]
          ]
        },
        {
          id: "w3-d4", name: "الثلاثاء", date: "2026-12-01", dateLabel: "1/12", hours: 6, lesson: false,
          tasks: [
            ["فقه", "فقه 6", 90],
            ["حديث", "حديث 5", 90],
            ["تاريخ", "تاريخ 3", 90],
            ["بلاغة", "بلاغة 3", 90]
          ]
        },
        {
          id: "w3-d5", name: "الأربعاء", date: "2026-12-02", dateLabel: "2/12", hours: 4, lesson: true,
          tasks: [
            ["رياضيات", "رياضيات 5", 80],
            ["فيزياء", "فيزياء 6", 80],
            ["صرف", "صرف 4", 80]
          ]
        },
        {
          id: "w3-d6", name: "الخميس", date: "2026-12-03", dateLabel: "3/12", hours: 6, lesson: false,
          tasks: [
            ["نحو", "نحو 8", 90],
            ["مطالعة/إنشاء", "مطالعة/إنشاء 2", 90],
            ["تفسير", "تفسير 2", 90],
            ["إنجليزي", "إنجليزي 4", 90]
          ]
        },
        {
          id: "w3-d7", name: "الجمعة", date: "2026-12-04", dateLabel: "4/12", hours: 2.75, lesson: false,
          tasks: [
            ["اختبار", "اختبار تراكمي على ما سبق", 120],
            ["راحة", "راحة", 45]
          ]
        }
      ]
    },
    {
      id: "w4",
      title: "الأسبوع الرابع",
      range: "5/12 – 11/12",
      days: [
        {
          id: "w4-d1", name: "السبت", date: "2026-12-05", dateLabel: "5/12", hours: 6, lesson: false,
          tasks: [
            ["نحو", "نحو 9", 90],
            ["فقه", "فقه 7", 90],
            ["حديث", "حديث 6", 90],
            ["فيزياء", "فيزياء 7", 90]
          ]
        },
        {
          id: "w4-d2", name: "الأحد", date: "2026-12-06", dateLabel: "6/12", hours: 4, lesson: true,
          tasks: [
            ["رياضيات", "رياضيات 6", 80],
            ["كيمياء", "كيمياء 6", 80],
            ["إنجليزي", "إنجليزي 5", 80]
          ]
        },
        {
          id: "w4-d3", name: "الإثنين", date: "2026-12-07", dateLabel: "7/12", hours: 6, lesson: false,
          tasks: [
            ["نحو", "نحو 10", 90],
            ["تاريخ", "تاريخ 4", 90],
            ["فقه", "فقه 8", 90],
            ["توحيد", "توحيد 5", 90]
          ]
        },
        {
          id: "w4-d4", name: "الثلاثاء", date: "2026-12-08", dateLabel: "8/12", hours: 6, lesson: false,
          tasks: [
            ["فقه", "فقه 9", 90],
            ["حديث", "حديث 7", 90],
            ["تاريخ", "تاريخ 5", 90],
            ["بلاغة", "بلاغة 4", 90]
          ]
        },
        {
          id: "w4-d5", name: "الأربعاء", date: "2026-12-09", dateLabel: "9/12", hours: 4, lesson: true,
          tasks: [
            ["رياضيات", "رياضيات 7", 80],
            ["كيمياء", "كيمياء 7", 80],
            ["صرف", "صرف 5", 80]
          ]
        },
        {
          id: "w4-d6", name: "الخميس", date: "2026-12-10", dateLabel: "10/12", hours: 6, lesson: false,
          tasks: [
            ["نحو", "نحو 11", 90],
            ["فقه", "فقه 10", 90],
            ["مطالعة/إنشاء", "مطالعة/إنشاء 3", 90],
            ["تفسير", "تفسير 3", 90]
          ]
        },
        {
          id: "w4-d7", name: "الجمعة", date: "2026-12-11", dateLabel: "11/12", hours: 2.75, lesson: false,
          tasks: [
            ["اختبار", "اختبار تراكمي على ما سبق", 120],
            ["راحة", "راحة", 45]
          ]
        }
      ]
    },
    {
      id: "w5",
      title: "الأسبوع الخامس",
      range: "12/12 – 18/12",
      days: [
        {
          id: "w5-d1", name: "السبت", date: "2026-12-12", dateLabel: "12/12", hours: 6, lesson: false,
          tasks: [
            ["نحو", "نحو 12", 90],
            ["حديث", "حديث 8", 90],
            ["توحيد", "توحيد 6", 90],
            ["فيزياء", "فيزياء 8", 90]
          ]
        },
        {
          id: "w5-d2", name: "الأحد", date: "2026-12-13", dateLabel: "13/12", hours: 4, lesson: true,
          tasks: [
            ["رياضيات", "رياضيات 8", 80],
            ["إنجليزي", "إنجليزي 6", 80],
            ["كيمياء", "كيمياء 8", 80]
          ]
        },
        {
          id: "w5-d3", name: "الإثنين", date: "2026-12-14", dateLabel: "14/12", hours: 6, lesson: false,
          tasks: [
            ["تاريخ", "تاريخ 6", 90],
            ["فقه", "فقه 11", 90],
            ["أدب ونصوص", "أدب ونصوص 1", 90],
            ["صرف", "صرف 6", 90]
          ]
        },
        {
          id: "w5-d4", name: "الثلاثاء", date: "2026-12-15", dateLabel: "15/12", hours: 6, lesson: false,
          tasks: [
            ["تاريخ", "تاريخ 7", 90],
            ["بلاغة", "بلاغة 5", 90],
            ["أدب ونصوص", "أدب ونصوص 2", 90],
            ["تفسير", "تفسير 4", 90]
          ]
        },
        {
          id: "w5-d5", name: "الأربعاء", date: "2026-12-16", dateLabel: "16/12", hours: 4, lesson: true,
          tasks: [
            ["رياضيات", "رياضيات 9", 80],
            ["حديث", "حديث 9-10", 80],
            ["توحيد", "توحيد 7-8", 80]
          ]
        },
        {
          id: "w5-d6", name: "الخميس", date: "2026-12-17", dateLabel: "17/12", hours: 6, lesson: false,
          tasks: [
            ["تاريخ", "تاريخ 8", 120],
            ["أدب ونصوص", "أدب ونصوص 3-4", 120],
            ["نحو وفقه", "حل وتطبيق نحو وفقه", 120]
          ]
        },
        {
          id: "w5-d7", name: "الجمعة", date: "2026-12-18", dateLabel: "18/12", hours: 2.75, lesson: false,
          tasks: [
            ["اختبار", "آخر اختبار شامل", 120],
            ["راحة", "راحة", 45]
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
      // ربع ساعة حفظ قرآن يومياً، أول كل يوم، بمعرّف ثابت لا يغيّر معرّفات المهام القديمة.
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
