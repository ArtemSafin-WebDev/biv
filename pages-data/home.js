const technologyReferenceSlide = [
  { modifier: 1, label: "WEBPACK" },
  { modifier: 2, label: "JAVA / JAVA EE" },
  { modifier: 3, label: "RUBY<br>RUBY ON RAILS" },
  { modifier: 4, label: "JAVASCRIPT" },
  { modifier: 5, label: "HTML" },
  { modifier: 6, label: "BLITZ" },
  { modifier: 7, label: "ANDROID<br>STUDIO" },
  { modifier: 8, label: "CSS" },
  { modifier: 9, label: "C#" },
  { modifier: 10, label: "CHROME<br>DEVTOOLS" },
  { modifier: 11, label: "ORACLE" },
  { modifier: 12, label: "JENKINS" },
  { modifier: 13, label: "VUE.JS" },
  { modifier: 14, label: "SELENIUM<br>IDE" },
  { modifier: 15, label: "PHP" },
  { modifier: 16, label: "SPRING<br>BOOT" },
  { modifier: 17, label: "RXJS" },
  { modifier: 18, label: "SPRING" },
  { modifier: 19, label: "MYSQL" },
  { modifier: 20, label: "REACT" },
  { modifier: 21, label: "KARMA" },
  { modifier: 22, label: "SWAGGER" },
  { modifier: 23, label: "INSOMNIA" },
];

const technologyCircleSlots = [
  { modifier: 1, x: 157, y: 252, diameter: 142 },
  { modifier: 2, x: 221, y: 403, diameter: 142 },
  { modifier: 3, x: 375, y: 339, diameter: 142 },
  { modifier: 4, x: 363, y: 507, diameter: 142 },
  { modifier: 5, x: 573, y: 442, diameter: 100 },
  { modifier: 6, x: 440, y: 171, diameter: 142 },
  { modifier: 7, x: 603, y: 84, diameter: 142 },
  { modifier: 8, x: 786, y: 207, diameter: 100 },
  { modifier: 9, x: 938, y: 302, diameter: 72 },
  { modifier: 10, x: 1069, y: 10, diameter: 142 },
  { modifier: 11, x: 1211, y: 97, diameter: 142 },
  { modifier: 12, x: 1096, y: 206, diameter: 142 },
  { modifier: 13, x: 1394, y: 202, diameter: 100 },
  { modifier: 14, x: 1573, y: 186, diameter: 142 },
  { modifier: 15, x: 1356, y: 303, diameter: 72 },
  { modifier: 16, x: 1431, y: 313, diameter: 142 },
  { modifier: 17, x: 1262, y: 422, diameter: 100 },
  { modifier: 18, x: 1549, y: 421, diameter: 142 },
  { modifier: 19, x: 1431, y: 575, diameter: 105 },
  { modifier: 20, x: 830, y: 511, diameter: 145 },
  { modifier: 21, x: 607, y: 592, diameter: 142 },
  { modifier: 22, x: 985, y: 572, diameter: 142 },
  { modifier: 23, x: 1155, y: 640, diameter: 142 },
];

const technologiesNameSets = [
  [
    "Angular",
    "HTML",
    "Angular Material",
    "React (TypeScript)",
    "Webpack",
    "CSS",
    "Node.js",
    "Vue.js",
    "TypeScript",
    "RxJS",
    "SASS",
    "Karma",
    "Jasmine",
  ],
  [
    "Java / Java EE",
    "C#",
    "Spring Boot",
    ".NET 8",
    "Spring",
    "ASP.NET MVC",
    "Quarkus",
    "ASP.NET Web API",
    "Hibernate (для ORM)",
    "Camunda",
    "Maven",
    "Android Studio",
    "Vault",
  ],
  ["Blitz", "Keycloak"],
  ["RabbitMQ", "Kafka", "REST API", "SOAP (WebServices)", "Gravitee"],
  [
    "Docker",
    "Kubernetes",
    "OpenShift",
    "GitLab CI/CD",
    "Jenkins",
    "SonarQube",
    "Zabbix",
    "Prometheus + Grafana",
    "bitbucket",
  ],
  [
    "Postman",
    "Swagger",
    "Insomnia",
    "kibana",
    "Java",
    "TestNG",
    "selenium",
    "Selenide",
    "Playwright",
    "Rest-assured",
  ],
  ["draw.io"],
  ["Microsoft SQLServer", "Oracle", "PostgreSQL", "MySQL"],
];

function getCircleTier(diameter) {
  if (diameter >= 140) return 3;
  if (diameter >= 95) return 2;
  return 1;
}

function getPreferredTier(weight) {
  if (weight >= 14) return 3;
  if (weight >= 8) return 2;
  return 1;
}

function getTechnologyWeight(label) {
  const plainLabel = label.replace(/<[^>]+>/g, " ").replace(/\s+/g, " ").trim();
  return plainLabel.length;
}

function getSlotDistance(firstSlot, secondSlot) {
  const dx = firstSlot.centerX - secondSlot.centerX;
  const dy = firstSlot.centerY - secondSlot.centerY;
  return Math.hypot(dx, dy);
}

function pickBestSlot(availableSlots, pickedSlots, preferredTier) {
  const preferredSlots = availableSlots.filter(
    (slot) => slot.tier >= preferredTier
  );
  const candidateSlots = preferredSlots.length > 0 ? preferredSlots : availableSlots;

  let bestSlot = null;
  let bestScore = -Infinity;

  candidateSlots.forEach((slot) => {
    const tierScore = 160 - Math.abs(slot.tier - preferredTier) * 70;
    const spreadScore =
      pickedSlots.length === 0
        ? getSlotDistance(slot, { centerX: 960, centerY: 400 })
        : Math.min(...pickedSlots.map((pickedSlot) => getSlotDistance(slot, pickedSlot)));
    const score = tierScore + spreadScore;

    if (score > bestScore) {
      bestScore = score;
      bestSlot = slot;
    }
  });

  return bestSlot;
}

function distributeTechnologiesBySlots(technologyNames) {
  const labels = technologyNames
    .filter((label) => typeof label === "string" && label.trim().length > 0)
    .map((label) => label.trim());

  if (labels.length === 0) {
    return [];
  }

  const slots = technologyCircleSlots.map((slot) => ({
    ...slot,
    tier: getCircleTier(slot.diameter),
    centerX: slot.x + slot.diameter / 2,
    centerY: slot.y + slot.diameter / 2,
  }));
  const technologiesByWeight = labels
    .map((label) => ({ label, weight: getTechnologyWeight(label) }))
    .sort((a, b) => b.weight - a.weight)
    .slice(0, slots.length);
  const placedItems = [];

  technologiesByWeight.forEach(({ label, weight }) => {
    const preferredTier = getPreferredTier(weight);
    const bestSlot = pickBestSlot(slots, placedItems, preferredTier);

    if (!bestSlot) return;

    placedItems.push({ ...bestSlot, label });

    const slotIndex = slots.findIndex((slot) => slot.modifier === bestSlot.modifier);
    if (slotIndex >= 0) {
      slots.splice(slotIndex, 1);
    }
  });

  return placedItems
    .map(({ modifier, label }) => ({ modifier, label }))
    .sort((a, b) => a.modifier - b.modifier);
}

const technologiesSlides = technologiesNameSets.map((technologyNames) => ({
  items: distributeTechnologiesBySlots(technologyNames),
}));

export default {
  "/index.html": {
    title: "Главная страница",
    leaders: [
      "/images/leaders/1.svg",
      "/images/leaders/2.svg",
      "/images/leaders/3.svg",
      "/images/leaders/4.svg",
      "/images/leaders/5.svg",
      "/images/leaders/6.svg",
      "/images/leaders/7.svg",
      "/images/leaders/8.svg",
      "/images/leaders/9.svg",
      "/images/leaders/10.svg",
      "/images/leaders/11.png",
      "/images/leaders/12.svg",
      "/images/leaders/13.png",
      "/images/leaders/14.svg",
      "/images/leaders/15.svg",
      "/images/leaders/16.webp",
    ],
    services: [
      {
        title: "Заказная разработка ПО",
        image: "/images/services/1.webp",
        items: [
          "Рефакторинг и реструктуризация кода",
          "Декомпозиции монолитных архитектур (Software Re-architecturing)",
          "Модернизация технологического стека и перенос приложений в современные среды",
        ],
      },
      {
        title: "Мобильная разработка",
        image: "/images/services/5.webp",
        imageOffset: "35%",
        items: [
          "Рефакторинг и реструктуризация кода",
          "Декомпозиции монолитных архитектур (Software Re-architecturing)",
          "Модернизация технологического стека и перенос приложений в современные среды",
        ],
      },
      {
        title: "Модернизация ИТ-систем",
        image: "/images/services/3.webp",
        items: [
          "Рефакторинг и реструктуризация кода",
          "Декомпозиции монолитных архитектур (Software Re-architecturing)",
          "Модернизация технологического стека и перенос приложений в современные среды",
        ],
      },
      {
        title: "Управление качеством ПО",
        image: "/images/services/4.webp",
        imageOffset: "35%",
        items: [
          "Рефакторинг и реструктуризация кода",
          "Декомпозиции монолитных архитектур (Software Re-architecturing)",
          "Модернизация технологического стека и перенос приложений в современные среды",
        ],
      },
      {
        title: "Заказная разработка ПО",
        image: "/images/services/1.webp",
        items: [
          "Рефакторинг и реструктуризация кода",
          "Декомпозиции монолитных архитектур (Software Re-architecturing)",
          "Модернизация технологического стека и перенос приложений в современные среды",
        ],
      },
      {
        title: "Мобильная разработка",
        image: "/images/services/5.webp",
        imageOffset: "35%",
        items: [
          "Рефакторинг и реструктуризация кода",
          "Декомпозиции монолитных архитектур (Software Re-architecturing)",
          "Модернизация технологического стека и перенос приложений в современные среды",
        ],
      },
    ],
    solutions: [
      {
        title: "Автоматизация страховых продуктов",
        image: "/images/services/1.webp",
        isReversed: true,
        items: [
          "Клиентские порталы",
          "Экстранет-порталы и партнёрские кабинеты (B2B)",
          "Интранет-порталы",
          "Системы управления доступом (IAM)",
        ],
      },
      {
        title: "Импортозамещение",
        image: "/images/services/2.webp",
        imageOffset: "35%",
        isReversed: true,
        items: [
          "Клиентские порталы",
          "Экстранет-порталы и партнёрские кабинеты (B2B)",
          "Интранет-порталы",
          "Системы управления доступом (IAM)",
        ],
      },
      {
        title: "Разработка личных кабинетов",
        image: "/images/services/3.webp",
        isReversed: true,
        items: [
          "Клиентские порталы",
          "Экстранет-порталы и партнёрские кабинеты (B2B)",
          "Интранет-порталы",
          "Системы управления доступом (IAM)",
        ],
      },
      {
        title: "Разработка HR-порталов",
        image: "/images/services/4.webp",
        imageOffset: "35%",
        isReversed: true,
        items: [
          "Клиентские порталы",
          "Экстранет-порталы и партнёрские кабинеты (B2B)",
          "Интранет-порталы",
          "Системы управления доступом (IAM)",
        ],
      },
      {
        title: "Автоматизация страховых продуктов",
        image: "/images/services/1.webp",
        isReversed: true,
        items: [
          "Клиентские порталы",
          "Экстранет-порталы и партнёрские кабинеты (B2B)",
          "Интранет-порталы",
          "Системы управления доступом (IAM)",
        ],
      },
      {
        title: "Импортозамещение",
        image: "/images/services/2.webp",
        imageOffset: "35%",
        isReversed: true,
        items: [
          "Клиентские порталы",
          "Экстранет-порталы и партнёрские кабинеты (B2B)",
          "Интранет-порталы",
          "Системы управления доступом (IAM)",
        ],
      },
    ],
    technologiesSlides,
    platformCards: [
      {
        image: "/images/platform/1.png",
        title: "Low code + Pro Code",
        text: "Относится к классу low code-платформа с расширенными PRO Code возможностями",
      },
      {
        image: "/images/platform/2.png",
        title: "Технологический суверенитет",
        text: "Включен в реестр российского ПО: 19858",
      },
      {
        image: "/images/platform/3.png",
        title: "Свобода от vendor lock-in",
        text: "Передаём исходный код, вы сохраняете полный контроль над проектом",
      },
      {
        image: "/images/platform/4.png",
        title: "Single-stack подход",
        text: "Ускорение работы команды разработки: один разработчик = один микросервис от логики до интерфейса",
      },
      {
        image: "/images/platform/5.png",
        title: "Гибкость на фронтенде",
        text: "Часть интерфейса формируется посредством SDUI, часть — классическим способом на Angular",
      },
    ],
    portfolio: [
      {
        href: "#",
        title: "Оптимизация маршрутов транспортной компании",
        image: "/images/portfolio-card/1.webp",
        hoveredImage: "/images/portfolio-card/1-hovered.webp",
      },
      {
        href: "#",
        title: "Автоматизация ОСАГО",
        image: "/images/portfolio-card/2.webp",
      },
      {
        href: "#",
        title: "Разработка личного кабинета для страховой компании",
        image: "/images/portfolio-card/3.webp",
      },
    ],
    newsCards: [
      {
        href: "#",
        image: "/images/news/news-1.webp",
        alt: "Турнир по футболу",
        title: "Турнир по футболу",
        date: "13.01.2026",
      },
      {
        href: "#",
        image: "/images/news/news-2.webp",
        alt: "Конференция 2025",
        title: "Конференция 2025",
        date: "10.01.2026",
      },
      {
        href: "#",
        image: "/images/news/news-3.webp",
        alt: "Разработчики взяли награду",
        title: "Разработчики взяли награду",
        date: "20.11.2025",
      },
    ],
  },
};
