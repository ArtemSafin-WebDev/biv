// HTML описания приходит из CMS; вложенным тегам классы не нужны.
const careerVacancyIntro = `<p>BIV — разработчик ИТ-решений для федеральных страховых и финансовых компаний. Результатами нашего труда пользуются миллионы людей. Мы создаём продукты, которые меняют к лучшему такие отрасли, как финансы, страхование, промышленность, логистика и ритейл.</p>
<p>Среди наших клиентов — такие компании, как СберСтрахование, СберНПФ, Т-страхование, СК Согласие, СК ВСК и многие другие.</p>
<p>Нас рекомендуют друзьям, к нам приходят за интересными проектами и остаются надолго благодаря атмосфере доверия и общим ценностям.</p>
`;

const careerVacancyTeam = "За 15 лет мы не растеряли вкус к сложным задачам, укрепили экспертизу и создали среду, где более 200 ИТ-талантов из разных филиалов чувствуют себя частью одной команды.";

const careerQaDescription = `${careerVacancyIntro}
<p>${careerVacancyTeam}<br>В связи с расширением команды, приглашаем Инженера по тестированию для работы в офисе г. Череповец</p>
<h4>Чем предстоит заниматься:</h4>
<ul>
<li>формирование и описание тест-кейсов, а также участие в корректировке функциональных и нефункциональных требований;</li>
<li>проверка реализации требований пользователей;</li>
<li>взаимодействие с командой разработки по задачам, участвовать в создании и развитии продукта на всех этапах;</li>
<li>оценка задач на тестирование и планирование работы, исходя из приоритетов команды;</li>
<li>проведение функционального и интеграционного тестирования мобильного приложения;</li>
<li>участие в жизни команды: статус митинг, планирование спринта, ретроспективы.</li>
</ul>
<h4>Для этого вам потребуется:</h4>
<ul>
<li>знание методологий тестирования: понимание различных видов тестирования;</li>
<li>Умение разрабатывать стратегии тестирования для сложных проектов</li>
<li>Навыки работы с баг-трекинговыми системами</li>
<li>Понимание архитектуры ПО</li>
<li>Работа с базами данных (PostgreSQL)</li>
<li>Анализ требований и проектирование тестов: способность анализировать требования к продукту и создавать тестовые сценарии на их основе. Разработка тестовых кейсов, чек-листов и матриц</li>
<li>Использование систем логирования (Elasticsearch, Graylog, Kibana, ELK, OpenSearch, Grafana) поиск, фильтрация, локализация дефектов в распределённых системах.</li>
<li>Понимание ООП. Владение языком программирования (начальный уровень): JavaScript, Python, Java или другие языки, для понимания процесса разработки и используемые для написания скриптов, автоматизации процессов.</li>
<li>Тестирование асинхронных систем и очередей сообщений (RabbitMQ, Kafka) — опыт проверки логики передачи транзакций и целостности данных в микросервисах</li>
<li>Анализ технической документации, требований и участие в их уточнении (Shift-Left подход, грумминги)</li>
</ul>
<h4>Мы предлагаем:</h4>
<ul>
<li>работа в аккредитованной ИТ-компании;</li>
<li>официальное трудоустройство по ТК РФ;</li>
<li>конкурентная заработная плата;</li>
<li>гибкое начало рабочего дня;</li>
<li>комфортный офис;</li>
<li>вкусные оплачиваемые обеды;</li>
<li>профессиональное развитие и регулярный пересмотр дохода по результатам работы;</li>
<li>подарки на значимые события и душевные поздравления;</li>
<li>корпоративные мероприятия и праздники, включая праздники для детей наших сотрудников;</li>
<li>бонусная программа «Приведи друга»;</li>
<li>программа наставничества для новых сотрудников;</li>
<li>уютная и продуктивная рабочая атмосфера.</li>
</ul>`;

// Для вакансий без описания в макете пока используется только текст о компании.
const careerVacancies = [
  {
    id: "marketer",
    title: "Маркетолог",
    category: "marketing",
    tags: ["маркетинг", "Москва", "офис", "опыт 1–3 года"],
    description: `${careerVacancyIntro}<p>${careerVacancyTeam}</p>`,
  },
  {
    id: "qa",
    title: "Тестировщик QA Engineer",
    category: "qa",
    tags: ["тестирование", "Рыбинск", "офис", "опыт 1–3 года"],
    description: `${careerVacancyIntro}<p>${careerVacancyTeam}</p>`,
  },
  {
    id: "qa-middle",
    title: "Тестировщик — QA Engineer Junior+ / Middle",
    category: "qa",
    tags: ["тестирование", "Череповец", "офис", "опыт 1–3 года"],
    description: careerQaDescription,
  },
  {
    id: "java",
    title: "Backend-разработчик Java",
    category: "backend",
    tags: ["бекенд", "Рыбинск", "офис", "опыт 1–3 года"],
    description: `${careerVacancyIntro}<p>${careerVacancyTeam}</p>`,
  },
  {
    id: "devops",
    title: "DevOps-инженер",
    category: "devops",
    tags: ["DevOps", "Рыбинск", "офис", "опыт 1–3 года"],
    description: `${careerVacancyIntro}<p>${careerVacancyTeam}</p>`,
  },
  {
    id: "analyst",
    title: "Системный аналитик",
    category: "analytics",
    tags: ["аналитика", "Рыбинск", "офис", "опыт 3–6 лет"],
    description: `${careerVacancyIntro}<p>${careerVacancyTeam}</p>`,
  },
];

// Временная вторая страница для демонстрации «Показать еще».
// При подключении CMS заменить повторные карточки реальными вакансиями.
const careerVacanciesWithDemoPage = [
  ...careerVacancies,
  ...careerVacancies.map((vacancy) => ({
    ...vacancy,
    id: `${vacancy.id}-demo`,
  })),
];

const careerVacancyCategories = [
  { id: "all", label: "все вакансии" },
  { id: "frontend", label: "фронтенд" },
  { id: "backend", label: "бекенд" },
  { id: "qa", label: "тестирование" },
  { id: "analytics", label: "аналитика" },
  { id: "devops", label: "DevOps" },
  { id: "marketing", label: "маркетинг" },
];

const careerStoryPhotos = [
  {
    image: "/images/career-stories/1.webp",
    imageWidth: 800,
    imageHeight: 1200,
    portrait: "woman",
    imageAlt: "Сотрудница с короткими кудрявыми волосами",
    text:
      "Всегда хотела создавать технологии, которые меняют жизнь к лучшему. Пришла в компанию 4 года назад как junior-разработчик после университета. Меня сразу погрузили в реальный проект с поддержкой наставника. Уже через год я вела свой первый серьёзный модуль, а ещё через два — возглавила новое направление. Самое крутое достижение — видеть, как нашим продуктом ежедневно пользуются тысячи людей. Тем, кто ищет себя, советую не бояться пробовать. Здесь точно помогут раскрыть ваш потенциал и поверят в вас, даже когда вы сами ещё сомневаетесь",
  },
  {
    image: "/images/career-stories/2.webp",
    imageWidth: 800,
    imageHeight: 1200,
    portrait: "man",
    imageAlt: "Сотрудник в сером свитере",
    text:
      "В BIV я пришёл начинающим разработчиком и сразу попал в команду, где можно задавать вопросы и предлагать свои решения. Первые задачи делал вместе с наставником, а со временем стал сам помогать новым коллегам. Больше всего ценю доверие: здесь дают возможность отвечать за результат и видеть, как твоя работа становится частью большого продукта. Если не бояться сложных задач, рост происходит очень быстро",
  },
  {
    image: "/images/career-stories/3.webp",
    imageWidth: 1200,
    imageHeight: 1200,
    portrait: "profile",
    imageAlt: "Сотрудник с кудрявыми волосами в профиль",
    text:
      "Мне важно работать над задачами, в которых есть место и точному расчёту, и новым идеям. В компании я нашёл именно такую среду: мы обсуждаем решения всей командой, проверяем гипотезы и не боимся пересматривать привычные подходы. Каждый проект помогает узнать что-то новое, а поддержка коллег даёт уверенность браться за то, что вчера казалось слишком сложным. Для меня это и есть настоящее профессиональное развитие",
  },
];

export default {
  "/career.html": {
    title: "Карьера",
    careerVacancies: {
      title: "вакансии",
      tabs: careerVacancyCategories.map((category) => ({
        ...category,
        items: careerVacanciesWithDemoPage.filter((vacancy) =>
          category.id === "all" || vacancy.category === category.id
        ),
      })),
    },
    careerStories: {
      title: "истории сотрудников",
      // Временные данные: набор из трёх историй повторён дважды.
      items: Array.from({ length: 6 }, (_, index) => ({
        ...careerStoryPhotos[index % careerStoryPhotos.length],
        href: "#",
        // Временное видео Rutube; заменить на embed-ссылку истории сотрудника.
        videoSrc: "https://rutube.ru/play/embed/da0cf5079b3ffab3cef0e436a3f9a0c7/?autoplay=1",
        number: index + 1,
      })),
    },
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
    careerTeam: {
      title: "Команда — это не только работа",
      // columns: ширина карточки в колонках сетки (1–24), по умолчанию 12.
      // Порядок массива задает общую последовательность на всех экранах.
      items: [
        {
          image: "/images/career-team/1.webp",
          columns: 9,
          imageAlt: "Команда BIV на праздничном мероприятии",
        },
        {
          image: "/images/career-team/2.webp",
          columns: 9,
          imageAlt: "Награждение сотрудника BIV",
        },
        {
          image: "/images/career-team/9.webp",
          columns: 6,
          imageAlt: "Творческое выступление сотрудников BIV",
        },
        {
          image: "/images/career-team/4.webp",
          columns: 13,
          imageAlt: "Сотрудники BIV на неформальной встрече",
        },
        {
          image: "/images/career-team/5.webp",
          columns: 11,
          imageAlt: "Команда BIV на корпоративном мероприятии",
        },
        {
          image: "/images/career-team/8.webp",
          columns: 9,
          imageAlt: "Команда BIV играет в лазертаг",
        },
        {
          image: "/images/career-team/7.webp",
          columns: 9,
          imageAlt: "Команда BIV на празднике",
        },
        {
          image: "/images/career-team/10.webp",
          columns: 6,
          imageAlt: "Сотрудники BIV отмечают событие в офисе",
        },
        {
          image: "/images/career-team/3.webp",
          columns: 12,
          imageAlt: "Общая встреча команды BIV",
        },
        {
          image: "/images/career-team/6.webp",
          columns: 12,
          imageAlt: "Друзья общаются на вечеринке",
        },
      ],
    },
    careerInterview: {
      title: "этапы собеседования",
      shortTitle: "этапы",
      description:
        "Привет, я Алина, тут расскажу о первых этапах собеседований и дам несколько рекомендаций, как лучше подготовиться",
      video: {
        // Временное видео Rutube; заменить на embed-ссылку об этапах собеседования.
        href: "https://rutube.ru/play/embed/da0cf5079b3ffab3cef0e436a3f9a0c7/?autoplay=1",
        ariaLabel: "Смотреть видео об этапах собеседования",
        image: "/images/career-interview/video-preview.webp",
        imageAlt: "Алина рассказывает об этапах собеседования",
      },
      steps: [
        {
          number: "1",
          title: "Отклик на вакансию",
          description: "Вы отправляете резюме, наша hr-команда его изучает",
          image: "/images/career-interview/1.webp",
          imageAlt: "Сотрудница BIV работает за ноутбуком",
        },
        {
          number: "2",
          title: "Знакомство с HR",
          description:
            "Онлайн-созвон (30–40 минут). На этом этапе я или мои коллеги из филиалов с вами пообщаются",
          image: "/images/career-interview/2.webp",
          imageAlt: "Коллеги BIV обсуждают рабочие вопросы",
        },
        {
          number: "3",
          title: "Техническое интервью",
          description:
            "Встреча с будущим руководителем и коллегами (1–1,5 часа). Обсуждаем профессиональные задачи",
          image: "/images/career-interview/3.webp",
          imageAlt: "Рабочее пространство офиса BIV",
        },
        {
          number: "4",
          title: "Приглашение в команду",
          image: "/images/career-interview/4.webp",
          imageAlt: "Зона отдыха в офисе BIV",
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
