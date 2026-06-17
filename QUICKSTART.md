# 🚀 Быстрый старт - Dance Survey

## Шаг 1: Подготовка видеофайлов

1. Создайте папку `videos` в корне проекта (уже создана)
2. Поместите видеофайлы с такими именами:
   - `female-choreo.mp4`
   - `high-heels.mp4`
   - `dancehall.mp4`
   - `zumba.mp4`
   - `latina.mp4`
   - `modern.mp4`

## Шаг 2: Запуск фронтенда (выберите один вариант)

### Вариант A: Через Node.js (рекомендуется)

```powershell
# Перейдите в директорию проекта
cd "E:\N8N проекты\dance-survey"

# Установите зависимости
npm install

# Запустите сервер
npm start
```

Откройте браузер: `http://localhost:8000`

### Вариант B: Через Python

```powershell
cd "E:\N8N проекты\dance-survey"
python -m http.server 8000
```

### Вариант C: Через npx (без установки)

```powershell
cd "E:\N8N проекты\dance-survey"
npx http-server -p 8000 -c-1
```

## Шаг 3: Настройка n8n

### 3.1 Установка n8n (если нет)

```powershell
npm install -g n8n
```

### 3.2 Запуск n8n

```powershell
n8n start
```

Откройте: `http://localhost:5678`

### 3.3 Импорт workflow

1. В n8n нажмите "Credentials" → "New Credential"
2. Создайте credential для Google Sheets
3. Создайте credential для Telegram (опционально)
4. Нажмите "Workflows" → "Import from File"
5. Выберите файл: `n8n-workflow/dance-survey-workflow.json`
6. Откройте workflow и настройте узлы:
   - **Google Sheets**: укажите ID таблицы
   - **Telegram**: укажите bot token и chat ID
7. Нажмите "Activate" (переключатель в правом верхнем углу)

### 3.4 Получение webhook URL

1. В workflow кликните на узел "Webhook"
2. Скопируйте "Test URL" или "Production URL"
3. URL будет похож на: `http://localhost:5678/webhook/dance-survey`

## Шаг 4: Подключение фронтенда к n8n

1. Откройте файл `script.js`
2. Найдите строку:
   ```javascript
   const WEBHOOK_URL = 'YOUR_N8N_WEBHOOK_URL';
   ```
3. Замените на ваш URL из n8n:
   ```javascript
   const WEBHOOK_URL = 'http://localhost:5678/webhook/dance-survey';
   ```
4. Сохраните файл
5. Обновите страницу в браузере (Ctrl+F5)

## Шаг 5: Создание Google Sheets

1. Создайте новую Google Таблицу
2. В первой строке создайте заголовки:
   ```
   name | email | interested | other_direction | schedule | experience | comments | timestamp
   ```
3. Скопируйте ID таблицы из URL (между `/d/` и `/edit`)
4. В n8n в узле "Add to Google Sheets" укажите этот ID

## Шаг 6: Тестирование

1. Откройте `http://localhost:8000`
2. Проверьте видео (кликните на превью)
3. Заполните тестовую форму
4. Нажмите "Отправить ответ"
5. Проверьте:
   - ✅ Сообщение об успехе
   - ✅ Данные в Google Sheets
   - ✅ Уведомление в Telegram (если настроено)

## Шаг 7: Развёртывание в корпоративной сети

### Опция A: Docker (рекомендуется)

```powershell
# Установите Docker Desktop если нет

# Скопируйте .env.example в .env
copy .env.example .env

# Отредактируйте .env и укажите ваши значения

# Запустите все сервисы
docker-compose up -d

# Проверьте логи
docker-compose logs -f
```

Доступ:
- Фронтенд: `http://your-server:80`
- n8n: `http://your-server:5678`

### Опция B: IIS (Windows Server)

1. Установите IIS через "Программы и компоненты"
2. Откройте "Диспетчер IIS"
3. Правой кнопкой на "Сайты" → "Добавить веб-сайт"
   - Имя: dance-survey
   - Путь: `E:\N8N проекты\dance-survey`
   - Порт: 8080
4. Для n8n создайте отдельный сайт на порту 5678

### Опция C: Nginx + n8n

1. Установите Nginx
2. Скопируйте `nginx.conf` в `/etc/nginx/nginx.conf`
3. Скопируйте файлы в `/var/www/dance-survey`
4. Запустите n8n
5. Перезагрузите nginx: `nginx -s reload`

## Проверка после запуска

- [ ] Фронтенд открывается в браузере
- [ ] Видео воспроизводятся
- [ ] Форма отправляется без ошибок
- [ ] Данные появляются в Google Sheets
- [ ] Уведомления приходят в Telegram
- [ ] Страница доступна с других компьютеров в сети (если нужно)

## Устранение проблем

### "CORS error" в консоли браузера
- Убедитесь что фронтенд и n8n на одном домене/порту
- Или настройте CORS в n8n

### "404 Not Found" при отправке
- Проверьте WEBHOOK_URL в script.js
- Убедитесь что workflow активен в n8n

### Видео не грузятся
- Проверьте что файлы есть в папке `videos/`
- Откройте DevTools → Network и посмотрите ошибки

### Нет данных в Google Sheets
- Проверьте Google Credentials в n8n
- Убедитесь что таблица создана и открыта для доступа сервисного аккаунта

## Следующие шаги

1. Настройте HTTPS для безопасности
2. Добавьте корпоративную аутентификацию
3. Настройте резервное копирование данных
4. Подключите дополнительные каналы уведомлений

---

**Вопросы? Проверьте README.md для подробной документации**
