# zipen.home — реєстрація та публікація (Firebase)

Структура:
- `public/index.html` — розмітка гри з екраном входу (пошта / телефон)
- `public/css/style.css` — усі стилі (наприкінці — стилі перемикача мов)
- `public/js/` — скрипти: `oven.js` (ручка пічки), `game.js` (логіка рівнів, таймер, рекорди, звук), `dough.js` (робота з тістом), `animations.js` (анімації та SVG), `firebase-auth.js` (вхід і рекорди через Firebase), `i18n.js` (перемикач мов UA / SK / EN і словник перекладів)
- `firebase.json` — налаштування хостингу
- `firestore.rules` — правила: гравець бачить лише свій рекорд

## 1. Створіть проєкт Firebase
1. Відкрийте https://console.firebase.google.com → **Add project** (назва, наприклад, `zipen-home`). Google Analytics можна вимкнути.

## 2. Увімкніть вхід
1. **Build → Authentication → Get started → Sign-in method**.
2. Увімкніть **Email/Password** і **Phone**.
3. У Phone додайте тестові номери (**Phone numbers for testing**), щоб перевірити вхід без реальних SMS.
4. **Authentication → Settings → Authorized domains**: домени `*.firebaseapp.com` і `*.web.app` вже є. Якщо підключите власний домен, додайте його тут.

## 3. Увімкніть базу для рекордів
1. **Build → Firestore Database → Create database** (production mode, регіон `eur3` або найближчий).
2. Вкладка **Rules** → вставте вміст `firestore.rules` → **Publish**.

## 4. Вставте ключі в гру
1. **Project settings (⚙) → Your apps → Web (`</>`)** → зареєструйте застосунок.
2. Скопіюйте `firebaseConfig` і вставте в `public/js/firebase-auth.js` на початку файлу замість значень «ВСТАВТЕ…».
   Ключ `apiKey` у вебзастосунку публічний за задумом Firebase. Доступ захищають правила Firestore та список дозволених доменів.

## 5. Опублікуйте
Потрібен Node.js. У терміналі:

```
npm install -g firebase-tools
firebase login
cd zipen-house
firebase use --add      # оберіть свій проєкт
firebase deploy
```

Гра буде за адресою `https://<ваш-проєкт>.web.app`.

## SMS
- Тестові номери працюють безкоштовно.
- Для SMS на реальні номери Firebase може вимагати тариф **Blaze** (оплата за використання) і має ліміти. Актуальні умови дивіться в консолі Firebase.
- Вхід через пошту безкоштовний.

## Примітка
Екран входу не дає зайти в гру без акаунта, але файли гри все одно завантажуються в браузер. Це нормально для браузерної гри. Рекорди й акаунти захищені правилами Firestore.
