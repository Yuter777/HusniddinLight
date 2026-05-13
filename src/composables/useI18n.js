import { reactive, computed } from 'vue'

const state = reactive({
  lang: localStorage.getItem('lang') || 'uz'
})

const messages = {
  uz: {
    nav: {
      services: "Xizmatlar",
      showcase: "Ko'rgazma",
      beforeAfter: "Oldin va Keyin",
      location: "Joylashuv",
      contact: "Aloqa",
    },
    hero: {
      tagline: "Sergeli · Toshkent · O'zbekiston",
      headline1: "Yorug'lik",
      headline2: "Shaxsiyat",
      headline3: "Yaratadi.",
      sub: "Premium fara ustasi",
      scroll: "Aylantiring",
      pillars: [
        { label: "Fara Remont", desc: "Tiklash · Linza · LED" },
        { label: "Fara Sotish", desc: "Yangi · Original · Sifatli" },
        { label: "Fara Sotib Olish", desc: "Tez · Adolatli Narx" },
      ],
    },
    services: {
      label: "Biz Nima Qilamiz",
      heading1: "Aniq Ish.",
      heading2: "Ko'rinadigan Natija.",
      learnMore: "Batafsil",
      items: [
        {
          name: "Linza Almashtirish",
          desc: "OEM sifatidagi optika bilan to'liq proyektor linzasini almashtirish. Kristal aniqlik, mukammal nurlanish.",
          features: ["Bosch va Valeo optikasi", "Nur yo'nalishi sozlash", "12 oylik kafolat"]
        },
        {
          name: "LED O'rnatish",
          desc: "Standart galogen lampalarga nisbatan 5 baravar yorqin premium LED konversiya tizimlari.",
          features: ["6000K sof oq rang", "CANbus mos keladi", "Ulash va ishlatish"]
        },
        {
          name: "DRL Sozlash",
          desc: "Maxsus DRL dizayni. Ketma-ket, statik yoki nafas oluvchi yorug'lik — sizning imzongiz.",
          features: ["Ketma-ket animatsiya", "Maxsus imzo", "RGB mavjud"]
        },
        {
          name: "Fara Tiklash",
          desc: "Ko'p bosqichli jarayonimiz bilan loyqa, sariq, oksidlangan linzalarni kristal-toza optikaga aylantirish.",
          features: ["Ko'p bosqichli sayqallash", "UV himoya qoplamasi", "Natija kafolatlangan"]
        },
        {
          name: "Premium Sayqallash",
          desc: "Professional linzani sayqallash xizmati — bir seansdagi g'adir-budurdan oynaga o'xshash silliqlikka.",
          features: ["3 bosqichli tizim", "Keramik muhrlash", "Bir kunlik xizmat"]
        },
        {
          name: "To'liq Yangilash",
          desc: "Proyektordan simlashgacha to'liq yoritish tizimini modernizatsiya qilish. Ultimate yangilanish.",
          features: ["To'liq bi-ksenon / LED", "Elektr simlash", "Adaptiv yoritish"]
        }
      ],
      stats: [
        { value: "2000+", label: "Tuzatilgan faralar" },
        { value: "8yil", label: "Yillik tajriba" },
        { value: "100%", label: "Mijoz mamnuniyati" },
        { value: "50+", label: "Avtomobil modellari" }
      ]
    },
    beforeAfter: {
      label: "O'zgarish",
      heading1: "Oldin.",
      heading2: "Keyin.",
      desc: "Slayderini torting va professional mahorat qanday ko'rinishini ko'ring.",
      caption: "Professional fara tiklash · Sergeli Avtobozor, Toshkent",
      beforeLabel: "Oldin",
      afterLabel: "Keyin",
      beforeSpec: "Galogen · 2800K",
      beforeStatus: "Oksidlangan · So'ngan",
      afterSpec: "6000K · LED",
      afterStatus: "Kristal Toza",
    },
    contact: {
      label: "Bog'laning",
      heading1: "Faralaringizni",
      heading2: "Porlating.",
      callLabel: "Qo'ng'iroq",
      locationLabel: "Joylashuv",
      locationName: "Sergeli Avtobozor",
      locationAddress: "Sergeli tumani, Toshkent, O'zbekiston",
      locationHours: "Ish vaqti: Sesh–Yak · 09:00–18:00",
      copyright: "© 2026 Barcha huquqlar himoyalangan",
    },
    scrollExplode: {
      label: "Muhandislik · Aniqlik · Mahorat",
    },
    showcase: {
      label: "Fara Ko'rgazmasi",
      heading1: "Har bir Avtomobil.",
      heading2: "Har bir Nur.",
    }
  },

  ru: {
    nav: {
      services: "Услуги",
      showcase: "Витрина",
      beforeAfter: "До и После",
      location: "Местоположение",
      contact: "Контакт",
    },
    hero: {
      tagline: "Сергели · Ташкент · Узбекистан",
      headline1: "Свет",
      headline2: "Создаёт",
      headline3: "Образ.",
      sub: "Мастерство фар премиум класса",
      scroll: "Прокрутите",
      pillars: [
        { label: "Ремонт фар", desc: "Восстановление · Линзы · LED" },
        { label: "Продажа фар", desc: "Новые · Оригинал · Качество" },
        { label: "Скупка фар", desc: "Быстро · Честная цена" },
      ],
    },
    services: {
      label: "Что мы делаем",
      heading1: "Точная работа.",
      heading2: "Видимый результат.",
      learnMore: "Подробнее",
      items: [
        {
          name: "Замена линзы",
          desc: "Полная замена проекторной линзы с OEM-качественной оптикой. Кристальная чёткость, идеальная диаграмма.",
          features: ["Оптика Bosch и Valeo", "Регулировка луча включена", "Гарантия 12 месяцев"]
        },
        {
          name: "Установка LED",
          desc: "Премиальные LED системы с яркостью в 5 раз выше стандартных галогеновых ламп.",
          features: ["6000K чистый белый", "Совместимость с CANbus", "Plug & play"]
        },
        {
          name: "Настройка DRL",
          desc: "Индивидуальный дизайн DRL. Последовательный, статичный или дышащий световой узор — ваша подпись.",
          features: ["Последовательная анимация", "Индивидуальный стиль", "RGB доступен"]
        },
        {
          name: "Восстановление фар",
          desc: "Превратите мутные, пожелтевшие, окислённые линзы в кристально чистую оптику с нашим многоэтапным процессом.",
          features: ["Многоэтапная шлифовка", "УФ-защитное покрытие", "Результат гарантирован"]
        },
        {
          name: "Премиум полировка",
          desc: "Профессиональная полировка линз — от шершавой до стеклянно-гладкой поверхности за один сеанс.",
          features: ["3-этапная система", "Керамическое запечатывание", "Услуга за один день"]
        },
        {
          name: "Полная модернизация",
          desc: "Полная модернизация системы освещения — от проектора до проводки. Максимальное обновление.",
          features: ["Полный би-ксенон / LED", "Проводной жгут", "Адаптивное освещение"]
        }
      ],
      stats: [
        { value: "2000+", label: "Восстановлено фар" },
        { value: "8лет", label: "Лет мастерства" },
        { value: "100%", label: "Довольных клиентов" },
        { value: "50+", label: "Моделей авто" }
      ]
    },
    beforeAfter: {
      label: "Трансформация",
      heading1: "До.",
      heading2: "После.",
      desc: "Перетащите ползунок, чтобы увидеть профессиональное мастерство.",
      caption: "Профессиональное восстановление фар · Сергели Авторынок, Ташкент",
      beforeLabel: "До",
      afterLabel: "После",
      beforeSpec: "Галоген · 2800K",
      beforeStatus: "Окислённый · Потускневший",
      afterSpec: "6000K · LED",
      afterStatus: "Кристально чисто",
    },
    contact: {
      label: "Свяжитесь",
      heading1: "Заставим ваши",
      heading2: "фары сиять.",
      callLabel: "Позвонить",
      locationLabel: "Местоположение",
      locationName: "Сергели Авторынок",
      locationAddress: "Сергелийский район, Ташкент, Узбекистан",
      locationHours: "Работает: Вт–Вс · 09:00–18:00",
      copyright: "© 2026 Все права защищены",
    },
    scrollExplode: {
      label: "Инжиниринг · Точность · Мастерство",
    },
    showcase: {
      label: "Витрина фар",
      heading1: "Каждый автомобиль.",
      heading2: "Каждый свет.",
    }
  }
}

export function useI18n() {
  const t = computed(() => messages[state.lang])

  function setLang(lang) {
    state.lang = lang
    localStorage.setItem('lang', lang)
  }

  return { lang: computed(() => state.lang), t, setLang }
}
