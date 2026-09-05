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
    careerOffices: {
      title: "наши офисы",
      description:
        "Работа в BIV компании предполагает офисный формат. Для этого мы обустраивает комфортные зоны, заботимся об условиях. Офис — это место, куда хочется приходить. У нас 5 филиалов: Москва, Казань, Рыбинск, Санкт-Петербург, Череповец.",
      items: [
        {
          image: "/images/career-offices/1.webp",
          imageAlt: "Зона отдыха в офисе BIV",
          caption: "Обед в нашем кафе в г.. Рыбинск",
        },
        {
          image: "/images/career-offices/2.webp",
          imageAlt: "Рабочее пространство офиса BIV",
          caption:
            "Где рождаются идеи: от мозгового штурма до тихой фокусировки",
        },
        {
          image: "/images/career-offices/3.webp",
          imageAlt: "Общая зона офиса BIV",
          caption:
            "Сердце офиса. Перезагрузка за кружкой кофе и разговором не о работе",
        },
        {
          image: "/images/career-offices/4.webp",
          imageAlt: "Переговорная зона офиса BIV",
          caption: "Вид, который вдохновляет каждый день",
        },
      ],
    },
    careerSupport: {
      title: "поддержка и забота",
      items: [
        {
          type: "health",
          title: "ДМС со стоматологией после ИС",
          description: "Чтобы заботиться о здоровье было легко и комфортно",
          image: "/images/career-support/umbrella.webp",
        },
        {
          type: "photo",
          image: "/images/career-support/balloons.webp",
        },
        {
          type: "lunch",
          title: "Вкусные оплачиваемые обеды",
          description:
            "Чтобы подзарядиться полезной энергией на весь день, не думая о бытовых вопросах",
          image: "/images/career-support/meal.webp",
        },
        {
          type: "gifts",
          title: "Подарки на значимые события",
          description:
            "Чтобы подчеркнуть: мы рядом и помним о ваших важных днях",
          image: "/images/career-support/gifts.webp",
        },
        {
          type: "events",
          title: "Дополнительные выходные на важные события",
          description: "Чтобы быть рядом с близкими в ключевые моменты",
          image: "/images/career-support/event.webp",
        },
        {
          type: "schedule",
          title: "Гибкий график работы",
          description:
            "Чтобы выстроить идеальный баланс между работой и личной жизнью",
          image: "/images/career-support/headphones.webp",
        },
        {
          type: "mentor",
          title: "Индивидуальный план развития и наставник",
          description: "Чтобы ты чётко видел свои цели и траекторию роста",
          avatars: [
            "/images/career-support/mentor-1.webp",
            "/images/career-support/mentor-2.webp",
            "/images/career-support/mentor-3.webp",
          ],
        },
      ],
    },
    careerBlog: {
      title: "блог сотрудников",
      moreLink: {
        label: "Больше новостей",
        href: "/news.html",
      },
      items: [
        {
          type: "football",
          image: "/images/career-blog/football.webp",
          imageAlt: "Команда BIV на турнире по футболу",
          title: "Турнир по футболу",
          date: "13.01.2026",
          isoDate: "2026-01-13",
        },
        {
          type: "birthday",
          image: "/images/career-blog/birthday.webp",
          imageAlt: "Событие из жизни команды BIV",
          title: "День рождения компании",
          mobileImage: "/images/career-blog/conference.webp",
          mobileTitle: "Конференция 2025",
          date: "10.01.2026",
          isoDate: "2026-01-10",
        },
      ],
    },
    careerApplication: {
      titleLines: ["не нашёл свою вакансию?", "отправь резюме"],
      button: {
        label: "Заполнить форму",
        href: "#",
      },
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
