# Dance Survey - Опросник танцевальных направлений 2ГИС ФИТ

Лендинг с опросником для сбора данных о интересе к новым танцевальным направлениям.

## Структура проекта

```
dance-survey/
├── index.html          # Главная страница
├── styles.css          # Стили в фирменном стиле 2ГИС ФИТ
├── script.js           # Логика формы и отправки данных
├── videos/             # Видеопримеры танцевальных направлений
│   ├── female-choreo.mp4
│   ├── high-heels.mp4
│   ├── dancehall.mp4
│   ├── zumba.mp4
│   ├── latina.mp4
│   └── modern.mp4
├── n8n-workflow/       # Workflow для n8n
│   └── dance-survey-workflow.json
└── README.md           # Документация
```

## Быстрый старт

### 1. Установка видеофайлов

Поместите видеофайлы в папку `videos/` с именами:
- `female-choreo.mp4`
- `high-heels.mp4`
- `dancehall.mp4`
- `zumba.mp4`
- `latina.mp4`
- `modern.mp4`

### 2. Настройка n8n

#### Подготовьте n8n:

```bash
# Если n8n ещё не запущен
npm install -g n8n
n8n start
```

#### Импортируйте workflow:

1. Откройте n8n в браузере (обычно `http://localhost:5678`)
2. Нажмите "Import from File"
3. Выберите файл `n8n-workflow/dance-survey-workflow.json`

#### Настройте узлы:

**Google Sheets:**
1. Создайте Google Таблицу с колонками: name, email, interested, other_direction, schedule, experience, comments, timestamp
2. В узле "Add to Google Sheets" укажите ID таблицы
3. Настройте Google Credentials

**Telegram (опционально):**
1. Создайте бота через @BotFather
2. Получите токен бота
3. Узнайте Chat ID канала/чата
4. В узле "Send Telegram Notification" укажите:
   - `chatId`: ваш Chat ID
   - `token`: токен бота

#### Получите Webhook URL:

1. Активируйте workflow в n8n
2. Нажмите "Listen" в узле Webhook
3. Скопируйте URL (например: `http://localhost:5678/webhook/dance-survey`)

### 3. Настройка фронтенда

Откройте `script.js` и замените:

```javascript
const WEBHOOK_URL = 'YOUR_N8N_WEBHOOK_URL';
```

на ваш реальный URL из n8n.

### 4. Запуск фронтенда

#### Вариант A: Простой локальный сервер

```bash
# Если у вас установлен Python
python -m http.server 8000

# Или если у вас есть Node.js
npx http-server -p 8000
```

Откройте `http://localhost:8000`

#### Вариант B: Использование IIS (для корпоративной сети)

1. Установите IIS через "Программы и компоненты"
2. Откройте "Диспетчер IIS"
3. Добавьте веб-сайт:
   - Путь: `E:\N8N проекты\dance-survey`
   - Порт: 8080
4. Сайт доступен по `http://localhost:8080`

#### Вариант C: Nginx (рекомендуется для production)

```nginx
server {
    listen 80;
    server_name dance.2gis-fit.local;
    
    root /var/www/dance-survey;
    index index.html;
    
    location / {
        try_files $uri $uri/ =404;
    }
}
```

### 5. Развёртывание в корпоративной сети

#### Требования:
- Внутренний сервер доступный сотрудникам
- n8n доступен внутри сети
- Фронтенд и n8n на одном домене или настроены CORS

#### CORS настройка в n8n:

Добавьте в `~/.n8n/config` или переменные окружения:

```
N8N_EDITOR_BASE_URL=http://your-internal-server:5678
WEBHOOK_URL=http://your-internal-server:5678
N8N_HOST=your-internal-server
SECURE_COOKIE=false
```

#### Варианты развёртывания:

**Docker (рекомендуется):**

```bash
# docker-compose.yml
version: '3'
services:
  n8n:
    image: n8nio/n8n
    ports:
      - "5678:5678"
    environment:
      - N8N_HOST=your-internal-server
      - WEBHOOK_URL=http://your-internal-server:5678
    volumes:
      - n8n_data:/home/node/.n8n

  nginx:
    image: nginx:alpine
    ports:
      - "80:80"
    volumes:
      - ./dance-survey:/usr/share/nginx/html
      - ./nginx.conf:/etc/nginx/nginx.conf
```

### 6. Проверка работы

1. Откройте страницу в браузере
2. Проверьте воспроизведение видео
3. Заполните форму тестовыми данными
4. Отправьте форму
5. Проверьте:
   - Данные в Google Sheets
   - Уведомление в Telegram
   - Ответ от n8n

## Настройка для внутреннего контура

### Безопасность:

1. **Защита webhook:**
   - Добавьте аутентификацию в n8n
   - Используйте HTTPS
   - Настройте firewall правила

2. **Доступ к форме:**
   - Разместите на внутреннем домене
   - Настройте доступ по корпоративным учётным данным

3. **Шифрование данных:**
   - Используйте HTTPS для всех соединений
   - Настройте SSL сертификаты

### Пример nginx.conf для внутренней сети:

```nginx
upstream n8n_backend {
    server localhost:5678;
}

server {
    listen 80;
    server_name dance.2gis-fit.local;
    
    # Фронтенд
    root /var/www/dance-survey;
    index index.html;
    
    location / {
        try_files $uri $uri/ =404;
    }
    
    # Proxy для n8n webhook
    location /webhook/ {
        proxy_pass http://n8n_backend/webhook/;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }
}
```

## Переменные окружения для n8n

```bash
# Основное
N8N_HOST=your-internal-server
N8N_PORT=5678
N8N_PROTOCOL=http

# Webhook
WEBHOOK_URL=http://your-internal-server:5678
WEBHOOK_TUNNEL_URL=http://your-internal-server:5678

# Безопасность
N8N_SECURITY_EXAMPLES=false
N8N_ENFORCE_SETTINGS_FILE_PERMISSIONS=true

# Данные
DB_TYPE=sqlite
DB_SQLITE_PATH=/data/n8n.sqlite

# Внешний доступ
N8N_EDITOR_BASE_URL=http://your-internal-server:5678
```

## Troubleshooting

### Форма не отправляет данные:
1. Проверьте WEBHOOK_URL в script.js
2. Откройте DevTools -> Network и посмотрите запрос
3. Убедитесь что n8n workflow активен

### Видео не воспроизводится:
1. Проверьте что файлы в папке videos/
2. Убедитесь что имена файлов совпадают
3. Проверьте права доступа к файлам

### Нет данных в Google Sheets:
1. Проверьте Google Credentials в n8n
2. Убедитесь что таблица создана и открыта для доступа
3. Проверьте логи выполнения в n8n

## Поддержка

При возникновении проблем проверьте:
- Логи n8n: `http://your-server:5678/executions`
- Консоль браузера (F12)
- Логи веб-сервера

---

**Создано для 2ГИС ФИТ**
