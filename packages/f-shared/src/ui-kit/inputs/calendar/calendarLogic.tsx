import React from 'react';

export const calendarLogic: {
  [key: string]: {
    ru: string | React.ReactNode;
    en: string | React.ReactNode;
    lt: string | React.ReactNode;
    uz: string | React.ReactNode;
  };
} = {
  january: {
    ru: `Январь`,
    en: `January`,
    lt: `Sausis`,
    uz: ``
  },
  february: {
    ru: `Февраль`,
    en: `February`,
    lt: `Vasaris`,
    uz: ``
  },
  march: {
    ru: `Март`,
    en: `March`,
    lt: `Kovas`,
    uz: ``
  },
  april: {
    ru: `Апрель`,
    en: `April`,
    lt: `Balandis`,
    uz: ``
  },
  may: {
    ru: `Май`,
    en: `May`,
    lt: `Gegužė`,
    uz: ``
  },
  june: {
    ru: `Июнь`,
    en: `June`,
    lt: `Birželis`,
    uz: ``
  },
  july: {
    ru: `Июль`,
    en: `July`,
    lt: `Liepa`,
    uz: ``
  },
  august: {
    ru: `Август`,
    en: `August`,
    lt: `Rugpjūtis`,
    uz: ``
  },
  september: {
    ru: `Сентябрь`,
    en: `September`,
    lt: `Rugsėjis`,
    uz: ``
  },
  october: {
    ru: `Октябрь`,
    en: `October`,
    lt: `Spalis`,
    uz: ``
  },
  november: {
    ru: `Ноябрь`,
    en: `November`,
    lt: `Lapkritis`,
    uz: ``
  },
  december: {
    ru: `Декабрь`,
    en: `December`,
    lt: `Gruodis`,
    uz: ``
  },


  mon: {
    ru: `ПН`,
    en: `MON`,
    lt: `MON`,
    uz: ''
  },
  tue: {
    ru: `Вт`,
    en: `TUE`,
    lt: `TUE`,
    uz: ``
  },
  wed: {
    ru: `Ср`,
    en: `WED`,
    lt: `WED`,
    uz: ``
  },
  thu: {
    ru: `ЧТ`,
    en: `THU`,
    lt: `THU`, uz: ''
  },
  fri: {
    ru: `ПТ`,
    en: `FRI`,
    lt: `FRI`, uz: ''
  },
  sat: {
    ru: `СБ`,
    en: `SAT`,
    lt: `SAT`,
    uz: ``
  },
  sun: {
    ru: `ВС`,
    en: `SUN`,
    lt: `SUN`,
    uz: ``
  },

  clear: {
    ru: 'Сбросить',
    en: 'Clear',
    lt: 'Nuvalyti',
    uz: ``
  },
  next: {
    ru: 'Вперед',
    en: 'Next',
    lt: 'Kitas',
    uz: ``
  },
  back: {
    ru: 'Назад',
    en: 'Back',
    lt: 'Atgal',
    uz: ``
  }
};

export const calendarFields = {
  january: `january`,
  february: `february`,
  march: `march`,
  april: `april`,
  june: `june`,
  may: `may`,
  july: `july`,
  august: `august`,
  september: `september`,
  october: `october`,
  november: `november`,
  december: `december`,

  mon: `mon`,
  tue: `tue`,
  wed: `wed`,
  thu: `thu`,
  fri: `fri`,
  sat: `sat`,
  sun: `sun`,

  clear: `clear`
};
