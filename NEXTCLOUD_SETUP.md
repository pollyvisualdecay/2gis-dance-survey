# Инструкция по настройке Nextcloud (2GIS Драйв) в n8n

## Шаг 1. Создать файл в 2GIS Драйв

1. Зайдите в [2GIS Драйв](https://drive.2gis.ru)
2. Создайте новую таблицу **dance-survey-answers.xlsx**
3. В первой строке создайте заголовки:
   - `timestamp` | `name` | `email` | `directions` | `other_direction` | `price` | `duration` | `frequency` | `schedule` | `experience`

## Шаг 2. Сгенерировать Пароль Приложения (App Password)

1. Зайдите в свой аккаунт 2GIS
2. Перейдите в **Настройки безопасности**
3. Найдите раздел **Пароли приложений** (App Passwords)
4. Нажмите **Создать новый пароль**
5. Дайте описание: `n8n-Dance-Survey`
6. Скопируйте сгенерированный пароль (покажется один раз!)

## Шаг 3. Настроить credential в n8n

1. Откройте workflow **Dance Survey Form Handler** в n8n
2. Откройте ноду **Nextcloud Save**
3. Нажмите **Add Credential** → **Create New**
4. Заполните:
   - **HTTP Auth:** `Basic Auth`
   - **User:** `p.vodyankina@2gis.ru`
   - **Password:** `вставьте пароль приложения из Шага 2`
   - **Base URL:** `https://drive.2gis.ru` (или ваш URL Nextcloud)
5. Нажмите **Save**

## Шаг 4. Настроить ноду Nextcloud

В ноде **Nextcloud Save** укажите:

- **Resource:** `Spreadsheet`
- **Operation:** `Append`
- **File Path:** `/dance-survey-answers.xlsx`
- **Sheet Name:** `Ответы` (или имя вашего листа)
- **Mapping:**
  - `timestamp` → `={{ $now }}`
  - `name` → `={{ $json.name }}`
  - `email` → `={{ $json.email }}`
  - `directions` → `={{ $json.directions }}`
  - `other_direction` → `={{ $json.other_direction }}`
  - `price` → `={{ $json.price }}`
  - `duration` → `={{ $json.duration }}`
  - `frequency` → `={{ $json.frequency }}`
  - `schedule` → `={{ $json.schedule }}`
  - `experience` → `={{ $json.experience }}`

## Шаг 5. Проверка

1. Нажмите **Execute Workflow** в n8n
2. Заполните форму на сайте
3. Проверьте таблицу в 2GIS Драйв — должна появиться новая строка

---

## Альтернатива: Если Nextcloud не поддерживает таблицы

Если в 2GIS Драйв нет поддержки работы с таблицами через API, можно использовать **WebDAV** для записи CSV файла:

1. В ноде Nextcloud выберите **Resource: File**
2. **Operation: Upload**
3. Формат CSV будет генерироваться автоматически

---

*Инструкция актуальна на 2026-06-19*
