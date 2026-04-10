export const categorizedJobs = {
  IT: [
    {
      id: 101, company: 'Kaspi.kz', role: 'Intern Frontend Developer', 
      location: 'Алматы (Гибрид)', salary: 'от 250 000 ₸', match: 98,
      tags: ['React', 'TypeScript', 'Redux'], logo: 'fa-kickstarter-k', color: '#F93B2F',
      targetUni: 'КазНУ им. аль-Фараби (KAZNU)', targetFaculty: 'Факультет информационных технологий', targetSpecialty: 'Программная инженерия'
    },
    {
      id: 102, company: 'Kolesa Group', role: 'Backend Data Engineer', 
      location: 'Алматы / Удаленно', salary: 'от 300 000 ₸', match: 92,
      tags: ['Python', 'SQL', 'ClickHouse'], logo: 'fa-kaggle', color: '#0070FF',
      targetUni: 'КБТУ (KBTU)', targetFaculty: 'Школа информационных технологий и инженерии', targetSpecialty: 'Информационные системы'
    },
    {
      id: 103, company: 'Beeline IT', role: 'Специалист по кибербезопасности', 
      location: 'Астана (Офис)', salary: 'По результатам', match: 89,
      tags: ['Network Security', 'Linux', 'Pentesting'], logo: 'fa-battle-net', color: '#FFB800',
      targetUni: 'МУИТ (IITU)', targetFaculty: 'Факультет цифровых технологий', targetSpecialty: 'Кибербезопасность'
    },
    {
      id: 104, company: 'Yandex Kazakhstan', role: 'Machine Learning Intern', 
      location: 'Алматы (Офис)', salary: 'от 400 000 ₸', match: 99,
      tags: ['Python', 'PyTorch', 'Math'], logo: 'fa-y-combinator', color: '#eab308',
      targetUni: 'КазНУ им. аль-Фараби (KAZNU)', targetFaculty: 'Механико-математический факультет', targetSpecialty: 'Математическое и компьютерное моделирование'
    },
    {
      id: 105, company: 'EPAM Systems', role: 'Junior Java Developer', 
      location: 'Астана / Алматы (Удаленно)', salary: 'от 200 000 ₸', match: 94,
      tags: ['Java Core', 'Spring Boot', 'SQL'], logo: 'fa-java', color: '#7dd3fc',
      targetUni: 'Назарбаев Университет (NU)', targetFaculty: 'School of Engineering and Digital Sciences (SEDS)', targetSpecialty: 'Computer Science'
    },
    {
      id: 106, company: 'BTS Digital', role: 'Mobile Developer iOS', 
      location: 'Астана (Офис)', salary: 'от 280 000 ₸', match: 88,
      tags: ['Swift', 'UIKit', 'API'], logo: 'fa-apple', color: '#000000',
      targetUni: 'ЕНУ им. Л.Н. Гумилева', targetFaculty: 'Факультет информационных технологий'
    }
  ],
  Finance: [
    {
      id: 201, company: 'Halyk Bank', role: 'Младший финансовый аналитик', 
      location: 'Алматы (Офис)', salary: 'от 200 000 ₸', match: 95,
      tags: ['Excel', 'Risk Management', 'FinModeling'], logo: 'fa-hacker-news', color: '#10b981',
      targetUni: 'КазНУ им. аль-Фараби (KAZNU)', targetFaculty: 'Высшая школа экономики и бизнеса', targetSpecialty: 'Финансы'
    },
    {
      id: 202, company: 'Freedom Broker', role: 'Investment Analyst', 
      location: 'Астана (Гибрид)', salary: 'от 350 000 ₸', match: 88,
      tags: ['Valuation', 'Bloomberg', 'CFA level 1'], logo: 'fa-foursquare', color: '#3b82f6',
      targetUni: 'Назарбаев Университет (NU)', targetFaculty: 'School of Sciences and Humanities (SSH)', targetSpecialty: 'Economics'
    },
    {
      id: 203, company: 'KPMG', role: 'Audit Intern', 
      location: 'Алматы', salary: 'от 180 000 ₸', match: 91,
      tags: ['Audit', 'IFRS', 'ACCA'], logo: 'fa-kickstarter-k', color: '#00338D',
      targetUni: 'КБТУ (KBTU)', targetFaculty: 'Бизнес школа', targetSpecialty: 'Учет и аудит'
    },
    {
      id: 204, company: 'Jusan Bank', role: 'Product Manager Intern', 
      location: 'Алматы (Гибрид)', salary: 'от 220 000 ₸', match: 85,
      tags: ['Product', 'Agile', 'CustDev'], logo: 'fa-jira', color: '#f59e0b',
      targetUni: 'КазНУ им. аль-Фараби (KAZNU)', targetFaculty: 'Высшая школа экономики и бизнеса', targetSpecialty: 'Менеджмент'
    },
    {
      id: 205, company: 'EY (Ernst & Young)', role: 'Intern in Tax', 
      location: 'Астана', salary: 'от 180 000 ₸', match: 93,
      tags: ['Налогообложение', 'Консалтинг'], logo: 'fa-y-combinator', color: '#ffeab6',
      targetUni: 'ЕНУ им. Л.Н. Гумилева', targetFaculty: 'Экономический факультет', targetSpecialty: 'Учет и аудит'
    }
  ],
  Law: [
    {
      id: 301, company: 'PwC Legal', role: 'Юрист-стажер', 
      location: 'Астана / Алматы', salary: '150 000 ₸', match: 94,
      tags: ['Корпоративное право', 'Контракты'], logo: 'fa-p', color: '#D04A02',
      targetUni: 'КазНУ им. аль-Фараби (KAZNU)', targetFaculty: 'Юридический факультет', targetSpecialty: 'Юриспруденция'
    },
    {
      id: 302, company: 'Kaspi Bank', role: 'Специалист по комплаенсу (AML)', 
      location: 'Алматы', salary: 'от 220 000 ₸', match: 86,
      tags: ['Compliance', 'Risk', 'Policy'], logo: 'fa-kickstarter-k', color: '#F93B2F',
      targetUni: 'ЕНУ им. Л.Н. Гумилева', targetFaculty: 'Юридический факультет', targetSpecialty: 'Международное право'
    },
    {
      id: 303, company: 'Grata International', role: 'Младший Юрист', 
      location: 'Алматы', salary: 'Обсуждается', match: 90,
      tags: ['Судебная практика', 'Литигация'], logo: 'fa-gitter', color: '#047857',
      targetUni: 'Назарбаев Университет (NU)', targetFaculty: 'School of Sciences and Humanities (SSH)', targetSpecialty: 'Political Science'
    }
  ],
  General: [
    {
      id: 401, company: 'Chocofamily', role: 'Младший маркетолог / SMM', 
      location: 'Алматы', salary: '150 000 ₸', match: 82,
      tags: ['SMM', 'Copywriting', 'Target'], logo: 'fa-c', color: '#eab308',
      targetUni: 'КазНУ им. аль-Фараби (KAZNU)', targetFaculty: 'Факультет журналистики'
    },
    {
      id: 402, company: 'Air Astana', role: 'Operations Management Trainee', 
      location: 'Астана (Аэропорт)', salary: 'от 250 000 ₸', match: 88,
      tags: ['Operations', 'Logistics', 'English C1'], logo: 'fa-avianex', color: '#b91c1c',
      targetUni: 'Назарбаев Университет (NU)', targetFaculty: 'School of Engineering and Digital Sciences (SEDS)'
    },
    {
      id: 403, company: 'KazMunayGas', role: 'Инженер-стажер', 
      location: 'Атырау / Алматы', salary: 'от 300 000 ₸', match: 96,
      tags: ['CAD', 'Бурение', 'Инжиниринг'], logo: 'fa-gas-pump', color: '#1e3a8a',
      targetUni: 'КБТУ (KBTU)', targetFaculty: 'Школа энергетики и нефтегазовой индустрии', targetSpecialty: 'Нефтегазовое дело'
    },
    {
      id: 404, company: 'BI Group', role: 'Помощник архитектора', 
      location: 'Астана / Алматы', salary: 'от 200 000 ₸', match: 89,
      tags: ['AutoCAD', 'Revit', 'Design'], logo: 'fa-b', color: '#1e40af',
      targetUni: 'Сатпаев Университет (KazNRTU)', targetFaculty: 'Институт архитектуры и строительства', targetSpecialty: 'Архитектура'
    },
    {
      id: 405, company: 'Nets', role: 'Генетик-исследователь', 
      location: 'Алматы (Лаборатория)', salary: 'от 220 000 ₸', match: 94,
      tags: ['CRISPR', 'ПЦР', 'Lab'], logo: 'fa-dna', color: '#10b981',
      targetUni: 'КазНУ им. аль-Фараби (KAZNU)', targetFaculty: 'Факультет биологии и биотехнологии', targetSpecialty: 'Генетика'
    }
  ]
};
