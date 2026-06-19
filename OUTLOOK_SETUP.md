# Инструкция по настройке Microsoft Outlook в n8n

## Шаг 1. Скопировать Redirect URL из n8n

В n8n при создании credential для Outlook скопируйте **OAuth Redirect URL**:
```
https://n8n.2gis.io/rest/oauth2-credential/callback
```

## Шаг 2. Зарегистрировать приложение в Microsoft Azure

1. Зайдите на [Microsoft Azure Portal](https://portal.azure.com) под корпоративной учёткой
2. В поиске сверху найдите **Azure Active Directory** (или **Microsoft Entra ID**)
3. В левом меню: **App registrations** → **New registration**
4. Заполните:
   - **Name:** `n8n-Dance-Survey`
   - **Supported account types:** `Accounts in this organizational directory only`
   - **Redirect URI:** 
     - Type: `Web`
     - URL: `https://n8n.2gis.io/rest/oauth2-credential/callback`
5. Нажмите **Register**

## Шаг 3. Забрать Client ID и создать Client Secret

1. На странице приложения скопируйте **Application (client) ID** (это Client ID)
2. В левом меню: **Certificates & secrets** → **Client secrets** → **New client secret**
3. Заполните:
   - **Description:** `n8n-key`
   - **Expires:** выберите срок (например, 12 месяцев)
4. Нажмите **Add**
5. **ВАЖНО:** Сразу скопируйте **Value** из столбца (секрет показывается один раз!)

## Шаг 4. Настроить права на отправку почты

1. В левом меню: **API permissions** → **Add a permission**
2. Выберите: **Microsoft Graph** → **Delegated permissions**
3. В поиске найдите и отметьте: **Mail.Send**
4. Нажмите **Add permissions**
5. Нажмите **Grant admin consent** (если доступно)

## Шаг 5. Финал в n8n

1. Вернитесь в n8n в окно создания Outlook credential
2. В поле **Client ID** вставьте скопированный ID из Шага 3
3. В поле **Client Secret** вставьте скопированное Value из Шага 3
4. Нажмите **Sign in with Microsoft** (или **Connect**)
5. Откроется окно входа Microsoft — войдите под корпоративной учёткой
6. Статус в n8n должен измениться на **Connected** (зелёный)

## Проверка

После настройки:
1. Откройте workflow **Dance Survey Form Handler**
2. Нажмите **Execute Workflow**
3. Заполните форму на сайте
4. Проверьте, что письмо пришло на `p.vodyankina@2gis.ru`

---

*Инструкция актуальна на 2026-06-19*
