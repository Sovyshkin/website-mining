// src/i18n/index.js
import { createI18n } from "vue-i18n";

const messages = {
  EN: {
    services: "Our services",
    business: "Ready business",
    equipment: "Equipment",
    test: "Test mode",
  },
  RU: {
    services: "Наши сервисы",
    business: "Готовый бизнес",
    equipment: "Оборудование",
    test: "Тест режим",
  },
};

const i18n = createI18n({
  locale: "RU", // Задайте здесь язык по умолчанию
  messages,
});

export default i18n;
