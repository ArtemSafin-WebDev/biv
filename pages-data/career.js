export default {
  "/career.html": {
    title: "Карьера",
    careerAbout: {
      title: "о компании",
      description:
        "Компания BIV аккредитованная российская компания, предоставляющая полный цикл цифровых услуг на рынке ИТ. 5 филиалов в городах России.",
      stats: [
        {
          count: "16",
          suffix: "+",
          label: "лет на рынке ИТ",
        },
        {
          count: "250",
          suffix: "+",
          label: "сотрудников",
        },
        {
          count: "750",
          suffix: "+",
          label: "проектов",
        },
        {
          count: "25",
          suffix: "%",
          label: "рост компании за 2025 год",
        },
        {
          displayValue: "РБК",
          kicker: "Выбор",
          label: "Топ-Работодатель по версии РБК-2025",
        },
      ],
    },
    careerReasons: {
      title: "почему нас выбирают",
      description:
        "По данным внутреннего исследования с несколькими вариантами выбора среди новых сотрудников BIV",
      stats: [
        {
          value: "64%",
          label: "пришли по рекомендациям и положительным отзывам",
        },
        {
          value: "53%",
          label: "отметили тёплый приём и слаженную работу команды с первых дней",
        },
        {
          value: "47%",
          label: "вдохновились нашими идеями и продуктами",
          light: true,
        },
        {
          value: "53%",
          label: "видят здесь реальные возможности для карьеры",
          mobileDuplicate: true,
        },
        {
          value: "41%",
          label: "почувствовали, что наши ценности совпадают с их личными",
          light: true,
        },
      ],
    },
    careerInterview: {
      title: "этапы собеседования",
      shortTitle: "этапы",
      description:
        "Привет, я Алина, тут расскажу о первых этапах собеседований и дам несколько рекомендаций, как лучше подготовиться",
      video: {
        href: "#career-interview-video",
        ariaLabel: "Смотреть видео об этапах собеседования",
        image: "/images/career-interview/video-preview.webp",
        imageAlt: "Алина рассказывает об этапах собеседования",
      },
      steps: [
        {
          number: "1",
          title: "Отклик на вакансию",
          description: "Вы отправляете резюме, наша hr-команда его изучает",
        },
        {
          number: "2",
          title: "Знакомство с HR",
          description:
            "Онлайн-созвон (30–40 минут). На этом этапе я или мои коллеги из филиалов с вами пообщаются",
        },
        {
          number: "3",
          title: "Техническое интервью",
          description:
            "Встреча с будущим руководителем и коллегами (1–1,5 часа). Обсуждаем профессиональные задачи",
        },
        {
          number: "4",
          title: "Приглашение в команду",
        },
      ],
    },
    careerHeroLinks: [
      {
        title: "Вакансии",
        href: "#vacancies",
        position: "vacancies",
      },
      {
        title: "Сотрудники",
        href: "#employees",
        position: "employees",
      },
      {
        title: "Офисы",
        href: "#offices",
        position: "offices",
      },
      {
        title: "Контакты",
        href: "#contacts",
        position: "contacts",
      },
    ],
  },
};
