# База знаний: «Гёдель, Эшер, Бах» — ридинг-семинар

Структура и рабочая схема повторяют проект `wand_sign_navigator` («Путеводитель по Уилсону»):
Obsidian-хранилище с карточками по шаблонам Templater → публикация через **Quartz v5** на GitHub Pages.

## Структура папок

```
geb-guide/
├── 00-meta/
│   ├── index.md              ← MOC, точка входа
│   └── templates/            ← шаблоны Templater (глава, диалог, сессия, концепт, персоналия)
├── 01-front-matter/          ← предисловие, обзор (вспомогательные заметки)
├── 02-part-i/
│   ├── chapters/             ← главы I–IX
│   └── dialogues/            ← диалоги перед главами I–IX + интродукция
├── 03-part-ii/
│   ├── chapters/             ← главы X–XX
│   └── dialogues/            ← диалоги перед главами X–XX + финальный Ричеркар
├── 04-sessions/               ← 40 заметок встреч, по одной на каждую дату семинара
├── 05-concepts/               ← карточки понятий (странная петля, рекурсия, изоморфизм и т.д.)
├── 06-personalia/             ← карточки персоналий (Гёдель, Эшер, Бах, Кэрролл и т.д.)
├── 07-context/                ← фоновый контекст (исторический, музыкальный, математический)
├── assets/images/
├── schedule.md                 ← расписание всех 40 встреч таблицей
└── README.md
```

Карточки используют латинские слаги в именах файлов и кириллические заголовки во
frontmatter — как в `wand_sign_navigator`: `id`, `title`, `title_en`, `type`, `status`,
`tags`, `related`, `aliases`. Типы карточек: `глава`, `диалог`, `концепт`, `персоналия`,
`контекст`, `moc`, `встреча-семинара`.

## Настройка Obsidian

1. Скопировать папку `geb-guide/` как подпапку в основное хранилище Obsidian
   (по аналогии с `wilson-guide/`).
2. Установить плагин **Templater**, указать `00-meta/templates/` как папку шаблонов.
3. Открыть `00-meta/index.md` как стартовую точку.

## Настройка GitHub + Quartz v5

Тот же workflow, что в `wand_sign_navigator` (репозиторий `kagort/wand_sign_navigator`, ветка `v5`):

```bash
# 1. Клонировать заготовку Quartz v5
git clone https://github.com/jackyzha0/quartz.git geb-loop
cd geb-loop
npm install

# 2. Содержимое content/ заменить на geb-guide/
rm -rf content
cp -r /path/to/geb-guide content
mv content/README.md content/index.md   # или использовать 00-meta/index.md как index

# 3. Локальный предпросмотр
npx quartz build --serve
# при конфликте IPv4/IPv6 на Windows открывать 127.0.0.1:8080, не localhost,
# с флагом --watch для live-пересборки

# 4. Создать репозиторий на GitHub (например geb-loop) и запушить
git remote add origin https://github.com/<user>/geb-loop.git
git add -A
git commit -m "init: geb reading seminar knowledge base"
git push -u origin v5   # или main, если ветка v5 не нужна отдельно

# 5. Включить GitHub Pages: Settings → Pages → Source: GitHub Actions (Quartz сам
#    добавляет workflow .github/workflows/deploy.yml при инициализации)
```

Дальше по ходу семинара: после каждой встречи — дописать заметку в `04-sessions/`,
раз в 1–2 недели коммитить и пушить, сайт на GitHub Pages пересобирается автоматически.

## Расписание

См. [`schedule.md`](./schedule.md) — 40 встреч, 24.09.2026–24.06.2027, по четвергам.
Резервная неделя оставлена на 31.12.2026 (новогодние каникулы). Самые большие главы
(V, IX, X, XIII, XIV, XVI, XVII, XVIII, XIX, XX) разбиты на 2–3 встречи.
