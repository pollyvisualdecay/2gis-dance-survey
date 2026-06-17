# 📋 Dance Survey - Итоговая сводка

## ✅ Что готово

Проект полностью создан и готов к использованию.

### Структура проекта

```
dance-survey/
├── 📄 index.html              # Лендинг с формой опроса
├── 🎨 styles.css              # Стили в стиле 2ГИС ФИТ
├── ⚙️ script.js               # Логика формы и отправки
├── 📹 videos/                 # Папка для видеофайлов
│   ├── female-choreo.mp4
│   ├── high-heels.mp4
│   ├── dancehall.mp4
│   ├── zumba.mp4
│   ├── latina.mp4
│   └── modern.mp4
├── 🔧 n8n-workflow/
│   └── dance-survey-workflow.json  # Workflow для n8n
├── 🐳 docker-compose.yml      # Конфиг для Docker
├── 🌐 nginx.conf              # Конфиг для Nginx
├── 📦 package.json            # Node.js конфигурация
├── 🚀 server.js               # Простой HTTP сервер
├── 📚 README.md               # Полная документация
├── ⚡ QUICKSTART.md           # Быстрый старт
├── 🏗️ ARCHITECTURE.md         # Архитектура системы
├── .env                       # Переменные окружения
└── .gitignore                 # Исключения для Git
```

## 🎯 Функционал

### На странице:
- ✅ Hero-секция с призывом к действию
- ✅ Секция "Уже есть тренеры" (3 направления)
- ✅ Секция "Хотели бы вы?" (3 направления)
- ✅ Видео-превью для каждого направления
- ✅ Форма опроса с валидацией:
  - Имя, Email
  - Интересующие направления (чекбоксы)
  - Другое направление (свободный ответ)
  - Удобное время
  - Танцевальный опыт
  - Комментарии
- ✅ Авто-сохранение прогресса
- ✅ Сообщение об успехе

### В n8n:
- ✅ Webhook для приёма данных
- ✅ Сохранение в Google Sheets
- ✅ Уведомление в Telegram
- ✅ Ответ клиенту

## 🚀 Как запустить

### Быстрый старт (локально):

```powershell
# 1. Перейдите в директорию
cd "E:\N8N проекты\dance-survey"

# 2. Запустите фронтенд
python -m http.server 8000

# 3. Откройте браузер
# http://localhost:8000
```

### Для работы с данными:

```powershell
# 1. Установите и запустите n8n
npm install -g n8n
n8n start

# 2. Импортируйте workflow
# Откройте http://localhost:5678
# Workflows → Import from File → dance-survey-workflow.json

# 3. Настройте узлы:
#    - Google Sheets: создайте таблицу, укажите ID
#    - Telegram: создайте бота, укажите token и chat_id

# 4. В script.js замените WEBHOOK_URL на ваш n8n URL
```

## 📝 Что нужно сделать вам

### 1. Видеофайлы
Поместите видео в папку `videos/`:
- female-choreo.mp4
- high-heels.mp4
- dancehall.mp4
- zumba.mp4
- latina.mp4
- modern.mp4

### 2. Google Sheets
1. Создайте новую таблицу
2. Добавьте заголовки: name, email, interested, other_direction, schedule, experience, comments, timestamp
3. Скопируйте ID таблицы
4. Вставьте в n8n workflow

### 3. Telegram (опционально)
1. Создайте бота через @BotFather
2. Получите токен
3. Узнайте Chat ID канала
4. Вставьте в .env и n8n workflow

### 4. Настройка webhook
1. Откройте script.js
2. Замените `YOUR_N8N_WEBHOOK_URL` на реальный URL из n8n

## 🌐 Развёртывание в сети

### Вариант A: Docker (рекомендуется)
```powershell
docker-compose up -d
```
Доступ: http://your-server:80

### Вариант B: IIS
1. Добавьте сайт в IIS
2. Укажите путь: `E:\N8N проекты\dance-survey`
3. Порт: 8080

### Вариант C: Nginx
1. Установите Nginx
2. Скопируйте nginx.conf
3. Скопируйте файлы в /var/www/dance-survey
4. Перезагрузите nginx

## 🔒 Безопасность

Для внутреннего контура:
- ✅ Все сервисы внутри сети
- ✅ Нет доступа из интернета
- ✅ Настройте HTTPS (SSL сертификаты)
- ✅ Добавьте аутентификацию для n8n
- ✅ Ограничьте доступ firewall

## 📊 Архитектура

```
Сотрудник → Фронтенд (порт 80) → n8n (порт 5678)
                                      ↓
                          Google Sheets + Telegram
```

## 📚 Документация

- **README.md** — полная документация
- **QUICKSTART.md** — пошаговый быстрый старт
- **ARCHITECTURE.md** — схема системы
- **docker-compose.yml** — Docker развёртывание
- **nginx.conf** — конфигурация Nginx

## 🛠️ Стек технологий

- **Фронтенд**: HTML5, CSS3, JavaScript (Vanilla)
- **Бэкенд**: n8n (workflow automation)
- **Хранение**: Google Sheets
- **Уведомления**: Telegram Bot API
- **Сервер**: Node.js / Python / Nginx / IIS
- **Деплой**: Docker

## 🎨 Дизайн

Фирменный стиль 2ГИС ФИТ:
- Основной цвет: `#FF5722` (оранжевый)
- Вторичный: `#212121` (тёмный)
- Шрифт: Inter
- Минимализм, карточки, плавные анимации

## 📞 Следующие шаги

1. ✅ Добавьте видеофайлы
2. ✅ Настройте Google Sheets
3. ✅ Настройте Telegram (опционально)
4. ✅ Протестируйте форму
5. ✅ Разверните на сервере
6. ✅ Дайте ссылку сотрудникам

## 🔗 Полезные ссылки

- n8n docs: https://docs.n8n.io/
- Google Sheets API: https://developers.google.com/sheets/api
- Telegram Bot API: https://core.telegram.org/bots/api

---

**Готово! Заполните .env, добавьте видео и запускайте!**
