(function () {
  var KEY = 'zipen_lang', LANGS = ['uk', 'sk', 'en'];
  /* укр. оригінал → [English, Slovenčina] */
  var D = {
    'Мова': ['Language', 'Jazyk'],
    '📖 КНИГА РЕЦЕПТІВ ZIPEN.HOME': ['📖 ZIPEN.HOME RECIPE BOOK', '📖 KNIHA RECEPTOV ZIPEN.HOME'],
    'Закрити ✖': ['Close ✖', 'Zavrieť ✖'],
    '1. Хачапурі по-аджарськи': ['1. Adjarian khachapuri', '1. Adžarské chačapuri'],
    '2. Хачапурі по-мегрельськи': ['2. Megrelian khachapuri', '2. Megrelské chačapuri'],
    '3. Фірмовий Кубдарі': ['3. Signature Kubdari', '3. Firemné kubdari'],
    '4. Лобіані': ['4. Lobiani', '4. Lobiani'],
    'До печі:': ['Before the oven:', 'Pred pečením:'],
    'Після печі:': ['After the oven:', 'Po upečení:'],
    'Сулугуні + Масло.': ['Suluguni + Butter.', 'Suluguni + Maslo.'],
    'Жовток в центр + Масло.': ['Yolk in the center + Butter.', 'Žĺtok do stredu + Maslo.'],
    'Імеретинський → Заліпити → Яйце → Моцарела.': ['Imeretian → Seal → Egg → Mozzarella.', 'Imeretinský → Zlepiť → Vajce → Mozzarella.'],
    'Масло → Розрізати на 8.': ['Butter → Cut into 8.', 'Maslo → Nakrájať na 8.'],
    "М'ясо → Заліпити → Яйце.": ['Meat → Seal → Egg.', 'Mäso → Zlepiť → Vajce.'],
    'Лобіо → Заліпити → У піч.': ['Lobio → Seal → Into the oven.', 'Lobio → Zlepiť → Do pece.'],
    '📖 Рецепти': ['📖 Recipes', '📖 Recepty'],
    '📖 Книга рецептів': ['📖 Recipe book', '📖 Kniha receptov'],
    'Вийти з акаунта': ['Sign out of your account', 'Odhlásiť sa z účtu'],
    'Вийти': ['Sign out', 'Odhlásiť'],
    'Час пік • Жорсткий таймер на чек': ['Rush hour • Strict ticket timer', 'Špička • Prísny časovač na objednávku'],
    'Авторська пекарня': ['Signature bakery', 'Autorská pekáreň'],
    'Гості чекають! На кожне замовлення діє суворий ліміт часу (45с → 30с), вузькі зони випікання в печі та вимога бездоганної точності. Встигни приготувати, нарізати й зняти кожен чек.':
      ['Guests are waiting! Every order has a strict time limit (45s → 30s), narrow baking windows in the oven and a demand for flawless precision. Make it in time: cook, slice and clear every ticket.',
       'Hostia čakajú! Na každú objednávku platí prísny časový limit (45 s → 30 s), úzke zóny pečenia v peci a požiadavka na bezchybnú presnosť. Stihni pripraviť, nakrájať a uzavrieť každú objednávku.'],
    'Шеф zipen.home': ['zipen.home chef', 'Šéfkuchár zipen.home'],
    'Шеф': ['Chef', 'Šéfkuchár'],
    'Шеф-пекар зміни': ['Shift head baker', 'Hlavný pekár zmeny'],
    'Бренд-шеф zipen.home': ['zipen.home brand chef', 'Značkový šéfkuchár zipen.home'],
    '4 чеки': ['4 tickets', '4 objednávky'],
    'Меню': ['Menu', 'Menu'],
    'Макс. жар': ['Max heat', 'Max. teplota'],
    'Рейтинг': ['Rating', 'Hodnotenie'],
    'Рекорд': ['Best', 'Rekord'],
    'Рівень 01 • 45с • 9%': ['Level 01 • 45s • 9%', 'Úroveň 01 • 45 s • 9 %'],
    'Рівень 02 • 40с • 7%': ['Level 02 • 40s • 7%', 'Úroveň 02 • 40 s • 7 %'],
    'Рівень 03 • 35с • 6%': ['Level 03 • 35s • 6%', 'Úroveň 03 • 35 s • 6 %'],
    'BOSS 04 • 30с • 5%': ['BOSS 04 • 30s • 5%', 'BOSS 04 • 30 s • 5 %'],
    'По-аджарськи': ['Adjarian', 'Adžarské'],
    'По-мегрельськи': ['Megrelian', 'Megrelské'],
    'Кубдарі': ['Kubdari', 'Kubdari'],
    'Лобіані': ['Lobiani', 'Lobiani'],
    'Сулугуні • Жовток • Масло': ['Suluguni • Yolk • Butter', 'Suluguni • Žĺtok • Maslo'],
    'Імеретинський • Моцарела': ['Imeretian • Mozzarella', 'Imeretinský • Mozzarella'],
    "Рубане м'ясо • Яйце": ['Minced meat • Egg', 'Sekané mäso • Vajce'],
    'Бобова начинка': ['Bean filling', 'Fazuľová plnka'],
    'Розпочати зміну 🔥': ['Start the shift 🔥', 'Začať zmenu 🔥'],

    'ЧЕК №101 • Хачапурі по-аджарськи': ['TICKET #101 • Adjarian khachapuri', 'OBJEDNÁVKA Č. 101 • Adžarské chačapuri'],
    'ЧЕК №101 • Фінальна подача Аджарського': ['TICKET #101 • Final plating of the Adjarian', 'OBJEDNÁVKA Č. 101 • Finálne servírovanie adžarského'],
    'ЧЕК №102 • Хачапурі по-мегрельськи': ['TICKET #102 • Megrelian khachapuri', 'OBJEDNÁVKA Č. 102 • Megrelské chačapuri'],
    'ЧЕК №102 • Масло та нарізка Мегрельського': ['TICKET #102 • Butter and slicing the Megrelian', 'OBJEDNÁVKA Č. 102 • Maslo a krájanie megrelského'],
    'ЧЕК №103 • Фірмовий Кубдарі': ['TICKET #103 • Signature Kubdari', 'OBJEDNÁVKA Č. 103 • Firemné kubdari'],
    'ЧЕК №103 • Масло та нарізка Кубдарі': ['TICKET #103 • Butter and slicing the Kubdari', 'OBJEDNÁVKA Č. 103 • Maslo a krájanie kubdari'],
    'VIP-ЧЕК №104 • Лобіані': ['VIP TICKET #104 • Lobiani', 'VIP OBJEDNÁVKA Č. 104 • Lobiani'],
    'VIP-ЧЕК №104 • Масло та нарізка Лобіані': ['VIP TICKET #104 • Butter and slicing the Lobiani', 'VIP OBJEDNÁVKA Č. 104 • Maslo a krájanie lobiani'],
    'Склад у «📖 Рецепти» зверху': ['Ingredients are in “📖 Recipes” at the top', 'Zloženie nájdeš v „📖 Recepty“ hore'],
    'Звір склад у «📖 Рецепти»': ['Check the ingredients in “📖 Recipes”', 'Over si zloženie v „📖 Recepty“'],
    'Рецепт у «📖 Рецепти»': ['Recipe is in “📖 Recipes”', 'Recept nájdeš v „📖 Recepty“'],
    'Перевір 4-й рецепт у «📖 Рецепти»': ['Check recipe #4 in “📖 Recipes”', 'Pozri si 4. recept v „📖 Recepty“'],

    '👆 Натисни: покласти тісто': ['👆 Tap: place the dough', '👆 Ťukni: polož cesto'],
    '👐 Натисни: розрівняти': ['👐 Tap: flatten', '👐 Ťukni: rozvaľkaj'],
    '👐 Натисни: розрівняти корж': ['👐 Tap: flatten the base', '👐 Ťukni: rozvaľkaj plát'],
    '👐 Натисни: розрівняти тісто': ['👐 Tap: flatten the dough', '👐 Ťukni: rozvaľkaj cesto'],
    '👐 Натисни: розрівняти основу': ['👐 Tap: flatten the base', '👐 Ťukni: rozvaľkaj základ'],
    '🤌 Натисни: зліпити човник': ['🤌 Tap: shape the boat', '🤌 Ťukni: vytvaruj loďku'],
    '🤌 Натисни: зліпити бортик': ['🤌 Tap: shape the rim', '🤌 Ťukni: vytvaruj okraj'],
    '🤌 Натисни: защипнути краї': ['🤌 Tap: pinch the edges', '🤌 Ťukni: zaštipni okraje'],
    'Затисни і потягни тісто на стіл': ['Press and drag the dough onto the table', 'Podrž a potiahni cesto na stôl'],
    'Водь пальцем туди-сюди, щоб розкачати': ['Move your finger back and forth to roll it out', 'Pohybuj prstom sem a tam, aby si ho rozvaľkal'],
    'Обведи пальцем по колу, щоб зліпити борт': ['Trace a circle with your finger to shape the rim', 'Obkresli prstom kruh, aby si vytvaroval okraj'],

    'Сулугуні': ['Suluguni', 'Suluguni'],
    'Імеретинський сир': ['Imeretian cheese', 'Imeretinský syr'],
    'Моцарела': ['Mozzarella', 'Mozzarella'],
    'Лобіо': ['Lobio', 'Lobio'],
    'Яйце': ['Egg', 'Vajce'],
    'Масло': ['Butter', 'Maslo'],
    'Зелень': ['Herbs', 'Bylinky'],
    'Ананас': ['Pineapple', 'Ananás'],
    'Кетчуп': ['Ketchup', 'Kečup'],
    'Гриби': ['Mushrooms', 'Huby'],
    'Оливки': ['Olives', 'Olivy'],
    "М'ясо": ['Meat', 'Mäso'],
    'Цибуля': ['Onion', 'Cibuľa'],
    'Спеції': ['Spices', 'Korenie'],
    'Жовток у центр': ['Yolk in the center', 'Žĺtok do stredu'],
    'Змастити маслом': ['Brush with butter', 'Potrieť maslom'],

    'Зліпи основу по центру столу та обери інгредієнти за рецептом': ['Shape the base in the middle of the table and pick the ingredients by the recipe', 'Vytvaruj základ v strede stola a vyber suroviny podľa receptu'],
    'Виконай ліпку та додай точні інгредієнти': ['Shape the dough and add the exact ingredients', 'Vytvaruj cesto a pridaj presné suroviny'],
    'Зліпи Кубдарі та поклади правильну начинку': ['Shape the Kubdari and add the right filling', 'Vytvaruj kubdari a pridaj správnu plnku'],
    'Збери повний склад Лобіані за рецептом': ['Assemble the full Lobiani by the recipe', 'Poskladaj kompletné lobiani podľa receptu'],
    'Розбий жовток у центр і змасти маслом': ['Crack the yolk into the center and brush with butter', 'Rozbi žĺtok do stredu a potri maslom'],
    'Змасти маслом і розріж на 8 рівних частин': ['Brush with butter and cut into 8 equal pieces', 'Potri maslom a nakrájaj na 8 rovnakých kúskov'],
    'Зайвий інгредієнт: торкнись його, щоб прибрати': ['Extra ingredient: tap it to remove it', 'Nadbytočná surovina: ťukni na ňu a odstráň ju'],
    'Утримуй і перетягни на тісто': ['Hold and drag it onto the dough', 'Podrž a presuň na cesto'],
    'Ретельніше змащуй пензликом по поверхні!': ['Brush the surface more thoroughly!', 'Potieraj štetcom po povrchu dôkladnejšie!'],
    'Цей крок уже виконано': ['This step is already done', 'Tento krok je už hotový'],
    'Готово до подачі': ['Ready to serve', 'Pripravené na podanie'],
    'Спершу розкачай тісто': ['Roll out the dough first', 'Najprv rozvaľkaj cesto'],
    'Усе готово: відправляй у піч': ['All set: send it into the oven', 'Všetko hotové: šup do pece'],
    'покласти тісто': ['place the dough', 'položiť cesto'],
    'розкачати тісто': ['roll out the dough', 'rozvaľkať cesto'],
    'заліпити': ['seal', 'zlepiť'],
    'змастити яйцем': ['brush with egg', 'potrieť vajcom'],
    'змастити маслом': ['brush with butter', 'potrieť maslom'],
    'розбити жовток у центр': ['crack the yolk into the center', 'rozbiť žĺtok do stredu'],
    'розрізати на 8 частин': ['cut into 8 pieces', 'nakrájať na 8 kúskov'],
    'сулугуні': ['suluguni', 'suluguni'],
    'імеретинський сир': ['Imeretian cheese', 'imeretinský syr'],
    'моцарела': ['mozzarella', 'mozzarella'],
    'лобіо': ['lobio', 'lobio'],
    "м'ясо": ['meat', 'mäso'],

    'У піч (260°C) 🔥': ['Into the oven (260°C) 🔥', 'Do pece (260 °C) 🔥'],
    'У піч (300°C) 🔥': ['Into the oven (300°C) 🔥', 'Do pece (300 °C) 🔥'],
    'У піч (340°C) 🔥': ['Into the oven (340°C) 🔥', 'Do pece (340 °C) 🔥'],
    'У піч (380°C BOSS) 🔥': ['Into the oven (380°C BOSS) 🔥', 'Do pece (380 °C BOSS) 🔥'],
    'ПІЧ ZIPEN.HOME • По-аджарськи': ['ZIPEN.HOME OVEN • Adjarian', 'PEC ZIPEN.HOME • Adžarské'],
    'ПІЧ ZIPEN.HOME • По-мегрельськи': ['ZIPEN.HOME OVEN • Megrelian', 'PEC ZIPEN.HOME • Megrelské'],
    'ПІЧ ZIPEN.HOME • Кубдарі': ['ZIPEN.HOME OVEN • Kubdari', 'PEC ZIPEN.HOME • Kubdari'],
    'ПЕКЕЛЬНИЙ ЖАР • Лобіані': ['INFERNAL HEAT • Lobiani', 'PEKELNÁ HORÚČAVA • Lobiani'],
    'Вихопи лопатою у зеленій зоні (9%)': ['Pull it out with the peel in the green zone (9%)', 'Vytiahni lopatou v zelenej zóne (9 %)'],
    'Різкі ривки температури • Зелена зона 7%': ['Sharp temperature spikes • Green zone 7%', 'Prudké skoky teploty • Zelená zóna 7 %'],
    'Стрімкий розгін • Зелена зона 6%': ['Rapid heat-up • Green zone 6%', 'Rýchly nábeh • Zelená zóna 6 %'],
    'Зелена зона 5% — не піддайся хибному ривку!': ['Green zone 5% — don’t fall for the fake spike!', 'Zelená zóna 5 % — nenechaj sa oklamať falošným skokom!'],
    'Вихопити лопатою ⚡': ['Pull out with the peel ⚡', 'Vytiahnuť lopatou ⚡'],
    'Подати та зняти чек 🧾': ['Serve and clear the ticket 🧾', 'Podať a uzavrieť objednávku 🧾'],

    'Хачапурі по-аджарськи подано • Чек знято': ['Adjarian khachapuri served • Ticket cleared', 'Adžarské chačapuri podané • Objednávka uzavretá'],
    'Хачапурі по-мегрельськи подано • Чек знято': ['Megrelian khachapuri served • Ticket cleared', 'Megrelské chačapuri podané • Objednávka uzavretá'],
    'Фірмовий Кубдарі подано • Чек знято': ['Signature Kubdari served • Ticket cleared', 'Firemné kubdari podané • Objednávka uzavretá'],
    "Рум'яний хрусткий човник, тягучий сулугуні, свіжий жовток і вершкове масло — еталонна подача zipen.home.":
      ['A golden, crispy boat, stretchy suluguni, a fresh yolk and creamy butter — the zipen.home signature serving.',
       'Zlatistá chrumkavá loďka, ťahavé suluguni, čerstvý žĺtok a smotanové maslo — vzorové servírovanie zipen.home.'],
    'Змащений маслом і рівно нарізаний на 8 шматків. Далі — фірмовий Кубдарі (340°C • 35с).':
      ['Brushed with butter and evenly cut into 8 pieces. Next up — the signature Kubdari (340°C • 35s).',
       'Potreté maslom a rovnomerne nakrájané na 8 kúskov. Ďalej — firemné kubdari (340 °C • 35 s).'],
    'Змащений вершковим маслом і нарізаний на 8 шматків. Попереду фінальне VIP-замовлення (30 секунд).':
      ['Brushed with creamy butter and cut into 8 pieces. The final VIP order is next (30 seconds).',
       'Potreté smotanovým maslom a nakrájané na 8 kúskov. Pred tebou je finálna VIP objednávka (30 sekúnd).'],
    'Чек №102 (Рівень 2 • 40с) ➡️': ['Ticket #102 (Level 2 • 40s) ➡️', 'Objednávka č. 102 (Úroveň 2 • 40 s) ➡️'],
    'Чек №103 (Рівень 3 • 35с) ➡️': ['Ticket #103 (Level 3 • 35s) ➡️', 'Objednávka č. 103 (Úroveň 3 • 35 s) ➡️'],
    'VIP-Чек №104 (30с) ➡️': ['VIP ticket #104 (30s) ➡️', 'VIP objednávka č. 104 (30 s) ➡️'],
    'Лобіані на столі видачі! Ти витримав жорсткий таймінг зміни, спечені та нарізані всі 4 страви.':
      ['Lobiani is on the pass! You survived the brutal shift timing — all 4 dishes baked and sliced.',
       'Lobiani je na výdajnom pulte! Zvládol si tvrdé tempo zmeny — všetky 4 jedlá sú upečené a nakrájané.'],
    'Пройти зміну ще раз 🔄': ['Play the shift again 🔄', 'Zahrať zmenu znova 🔄'],
    'Спробувати ще раз 🔄': ['Try again 🔄', 'Skúsiť znova 🔄'],
    'Занадто рано — страва сира': ['Too early — the dish is raw', 'Príliš skoro — jedlo je surové'],
    'Тісто бліде й непропечене. Дочекайся, поки індикатор увійде в зелену зону.':
      ['The dough is pale and underbaked. Wait until the indicator enters the green zone.',
       'Cesto je bledé a nedopečené. Počkaj, kým ukazovateľ vojde do zelenej zóny.'],
    'Згоріло на вугілля': ['Burnt to a crisp', 'Zhorelo na uhoľ'],
    'У розпеченій печі zipen.home кожна мілісекунда вирішальна — страва обвуглилася.':
      ['In the blazing zipen.home oven every millisecond counts — the dish got charred.',
       'V rozpálenej peci zipen.home rozhoduje každá milisekunda — jedlo zuhoľnatelo.'],
    'Час чека вичерпано — гість пішов': ['Ticket time is up — the guest left', 'Čas objednávky vypršal — hosť odišiel'],
    'Замовлення готувалося занадто довго. Працюй швидше на столі й не гай секунд перед подачею.':
      ['The order took too long. Work faster at the table and don’t waste seconds before serving.',
       'Objednávka sa pripravovala príliš dlho. Pracuj pri stole rýchlejšie a nestrácaj sekundy pred podávaním.'],
    'Поділитись результатом 📤': ['Share your result 📤', 'Zdieľať výsledok 📤'],
    'Скопійовано ✅': ['Copied ✅', 'Skopírované ✅'],
    'Звук': ['Sound', 'Zvuk'],

    /* вхід / реєстрація */
    'Увімкнути пічку': ['Turn on the oven', 'Zapnúť rúru'],
    'Пічка увімкнена': ['The oven is on', 'Rúra je zapnutá'],
    'Пічка вимкнена': ['The oven is off', 'Rúra je vypnutá'],
    'Поверніть яскраву ручку праворуч угорі, щоб увімкнути її та увійти в гру.':
      ['Turn the bright knob in the top right to switch it on and enter the game.',
       'Otočte jasný gombík vpravo hore, aby ste ju zapli a vstúpili do hry.'],
    'Завантаження…': ['Loading…', 'Načítava sa…'],
    'Firebase ще не налаштований. Відкрийте index.html, знайдіть блок firebaseConfig і вставте свої ключі (див. README.md).':
      ['Firebase isn’t configured yet. Open index.html, find the firebaseConfig block and paste your keys (see README.md).',
       'Firebase ešte nie je nastavený. Otvorte index.html, nájdite blok firebaseConfig a vložte svoje kľúče (pozrite README.md).'],
    'Увійдіть, щоб грати': ['Sign in to play', 'Prihláste sa a hrajte'],
    'Акаунт зберігає ваші рекорди та зірки на будь-якому пристрої.': ['Your account keeps your records and stars on any device.', 'Účet uchováva vaše rekordy a hviezdičky na akomkoľvek zariadení.'],
    'Пошта': ['Email', 'E-mail'],
    'Телефон': ['Phone', 'Telefón'],
    'Ім’я в грі': ['In-game name', 'Meno v hre'],
    'Наприклад, Кухар': ['For example, Cook', 'Napríklad Kuchár'],
    'Пароль': ['Password', 'Heslo'],
    'Мінімум 6 символів': ['At least 6 characters', 'Minimálne 6 znakov'],
    'Увійти': ['Sign in', 'Prihlásiť sa'],
    'Створити акаунт': ['Create account', 'Vytvoriť účet'],
    'Немає акаунта? Зареєструватися': ['No account? Sign up', 'Nemáte účet? Zaregistrujte sa'],
    'Вже є акаунт? Увійти': ['Already have an account? Sign in', 'Už máte účet? Prihláste sa'],
    'Забули пароль?': ['Forgot your password?', 'Zabudli ste heslo?'],
    'Номер телефону': ['Phone number', 'Telefónne číslo'],
    'Отримати код у SMS': ['Get a code by SMS', 'Získať kód cez SMS'],
    'Код із SMS': ['SMS code', 'Kód z SMS'],
    'Підтвердити': ['Confirm', 'Potvrdiť'],
    'Змінити номер': ['Change number', 'Zmeniť číslo'],
    'Пошту або номер телефону використовуємо лише для входу.': ['We use your email or phone number only for signing in.', 'E-mail alebo telefónne číslo používame iba na prihlásenie.'],
    'Гравець': ['Player', 'Hráč'],
    'Невірна адреса пошти.': ['Invalid email address.', 'Neplatná e-mailová adresa.'],
    'Введіть адресу пошти.': ['Enter your email address.', 'Zadajte e-mailovú adresu.'],
    'Введіть пароль.': ['Enter your password.', 'Zadajte heslo.'],
    'Ця пошта вже зареєстрована — увійдіть.': ['This email is already registered — sign in.', 'Tento e-mail je už zaregistrovaný — prihláste sa.'],
    'Пароль закороткий — мінімум 6 символів.': ['The password is too short — at least 6 characters.', 'Heslo je príliš krátke — minimálne 6 znakov.'],
    'Невірна пошта або пароль.': ['Wrong email or password.', 'Nesprávny e-mail alebo heslo.'],
    'Забагато спроб. Зачекайте кілька хвилин і спробуйте знову.': ['Too many attempts. Wait a few minutes and try again.', 'Príliš veľa pokusov. Počkajte niekoľko minút a skúste to znova.'],
    'Невірний номер. Формат: +380501234567.': ['Invalid number. Format: +380501234567.', 'Neplatné číslo. Formát: +421901234567.'],
    'Введіть номер телефону.': ['Enter your phone number.', 'Zadajte telefónne číslo.'],
    'Невірний код.': ['Wrong code.', 'Nesprávny kód.'],
    'Введіть код із SMS.': ['Enter the code from the SMS.', 'Zadajte kód z SMS.'],
    'Код прострочено — запросіть новий.': ['The code has expired — request a new one.', 'Platnosť kódu vypršala — vyžiadajte si nový.'],
    'Ліміт SMS вичерпано. Спробуйте пізніше або увійдіть через пошту.': ['SMS limit reached. Try later or sign in with email.', 'Limit SMS je vyčerpaný. Skúste to neskôr alebo sa prihláste e-mailom.'],
    'Не вдалося пройти перевірку reCAPTCHA. Спробуйте ще раз.': ['The reCAPTCHA check failed. Please try again.', 'Overenie reCAPTCHA zlyhalo. Skúste to znova.'],
    'Немає з’єднання з інтернетом.': ['No internet connection.', 'Žiadne pripojenie k internetu.'],
    'Цей спосіб входу ще не увімкнено у Firebase.': ['This sign-in method isn’t enabled in Firebase yet.', 'Tento spôsob prihlásenia ešte nie je vo Firebase zapnutý.'],
    'Цей домен не додано до дозволених у Firebase (Authentication → Settings).': ['This domain isn’t in the authorized domains in Firebase (Authentication → Settings).', 'Táto doména nie je medzi povolenými vo Firebase (Authentication → Settings).'],
    'Щось пішло не так. Спробуйте ще раз.': ['Something went wrong. Please try again.', 'Niečo sa pokazilo. Skúste to znova.'],
    'Спочатку введіть пошту у поле вище.': ['First enter your email in the field above.', 'Najprv zadajte e-mail do poľa vyššie.'],
    'Якщо така пошта зареєстрована, ми надіслали лист для скидання пароля.': ['If this email is registered, we’ve sent a password reset email.', 'Ak je tento e-mail zaregistrovaný, poslali sme naň e-mail na obnovenie hesla.'],
    'Введіть номер у форматі +380501234567.': ['Enter the number in the format +380501234567.', 'Zadajte číslo vo formáte +421901234567.']
  };
  /* рядки з числами, які гра складає на льоту */
  var R = [
    [/^⏱ ([\d.]+)с$/, ['⏱ $1s', '⏱ $1 s']],
    [/^Рекорд • (.+)$/, ['Best • $1', 'Rekord • $1']],
    [/^Точність печі: (\d+)% • Залишок часу: ([\d.]+)с • Помилок: (\d+)$/, ['Oven accuracy: $1% • Time left: $2s • Mistakes: $3', 'Presnosť pece: $1 % • Zostávajúci čas: $2 s • Chyby: $3']],
    [/^⭐ (\d+)\/12 • ⏱ ([\d:]+) • 🏆 Новий рекорд!$/, ['⭐ $1/12 • ⏱ $2 • 🏆 New record!', '⭐ $1/12 • ⏱ $2 • 🏆 Nový rekord!']],
    [/^🔪 Проведи ножем по коржу \((\d) \/ 4 розрізи\)$/, ['🔪 Slide the knife across the base ($1 / 4 cuts)', '🔪 Prejdi nožom po placke ($1 / 4 rezy)']],
    [/^Код надіслано на (.+)\.$/, ['Code sent to $1.', 'Kód bol odoslaný na $1.']]
  ];
  var LISTS = [['Далі: ', ['Next: ', 'Ďalej: ']], ['Зараз за рецептом: ', ['Now, by the recipe: ', 'Teraz podľa receptu: ']]];
  var SHARE = {
    uk: 'Я пройшов Hardcore зміну в zipen.home Kitchen Simulator: {s}/12 ⭐ за {t}! Зможеш краще? {u}',
    en: 'I beat the Hardcore shift in zipen.home Kitchen Simulator: {s}/12 ⭐ in {t}! Can you do better? {u}',
    sk: 'Zvládol som Hardcore zmenu v zipen.home Kitchen Simulator: {s}/12 ⭐ za {t}! Dáš to lepšie? {u}'
  };
  var CODES = { uk: 'UA', sk: 'SK', en: 'EN' };
  var HTML_LANG = { uk: 'uk', sk: 'sk', en: 'en' };
  var ATTRS = ['placeholder', 'title', 'aria-label', 'alt'];
  var CY = /[Ѐ-ӿ]/;

  var lang = 'uk';
  try { var saved = localStorage.getItem(KEY); if (LANGS.indexOf(saved) > -1) lang = saved; } catch (e) {}

  function core(s) {
    var idx = lang === 'en' ? 0 : lang === 'sk' ? 1 : -1;
    if (idx < 0) return s;
    var k = s.replace(/\s+/g, ' ');
    if (D[k]) return D[k][idx];
    for (var i = 0; i < R.length; i++) if (R[i][0].test(k)) return k.replace(R[i][0], R[i][1][idx]);
    for (var j = 0; j < LISTS.length; j++) {
      var p = LISTS[j][0];
      if (k.indexOf(p) === 0) return LISTS[j][1][idx] + k.slice(p.length).split(' / ').map(function (x) { return D[x] ? D[x][idx] : x; }).join(' / ');
    }
    return s;
  }
  function t(s) {
    if (!s || lang === 'uk') return s;
    var m = s.match(/^(\s*)([\s\S]*?)(\s*)$/);
    return m[2] ? m[1] + core(m[2]) + m[3] : s;
  }

  /* пам'ять оригіналів, щоб можна було повернутися до будь-якої мови */
  var TXT = new WeakMap(), ATT = new WeakMap();
  var observer, applying = false;
  function skip(el) { return !el || /^(SCRIPT|STYLE|NOSCRIPT|TEXTAREA)$/.test(el.nodeName); }
  function doText(n) {
    if (skip(n.parentNode)) return;
    var cur = n.data, rec = TXT.get(n), orig;
    if (rec && cur === rec.shown) orig = rec.orig;
    else { if (!CY.test(cur)) { if (rec) TXT.delete(n); return; } orig = cur; }
    var shown = t(orig);
    if (shown !== cur) n.data = shown;
    TXT.set(n, { orig: orig, shown: shown });
  }
  function doAttr(el, a) {
    if (!el.hasAttribute(a)) return;
    var cur = el.getAttribute(a), all = ATT.get(el), rec = all && all[a], orig;
    if (rec && cur === rec.shown) orig = rec.orig;
    else { if (!CY.test(cur)) return; orig = cur; }
    var shown = t(orig);
    if (shown !== cur) el.setAttribute(a, shown);
    if (!all) ATT.set(el, all = {});
    all[a] = { orig: orig, shown: shown };
  }
  function walk(root) {
    if (root.nodeType === 3) return doText(root);
    if (root.nodeType !== 1 || skip(root)) return;
    ATTRS.forEach(function (a) { doAttr(root, a); });
    root.querySelectorAll('[placeholder],[title],[aria-label],[alt]').forEach(function (el) { ATTRS.forEach(function (a) { doAttr(el, a); }); });
    var w = document.createTreeWalker(root, NodeFilter.SHOW_TEXT), n;
    while ((n = w.nextNode())) doText(n);
  }

  /* ---- перемикач ---- */
  var sw = document.getElementById('lang-switch'), btn = document.getElementById('lang-btn');
  function paintSwitch() {
    if (!sw) return;
    sw.querySelector('.lang-code').textContent = CODES[lang];
    sw.querySelectorAll('.lang-opt').forEach(function (o) {
      var on = o.dataset.lang === lang;
      o.classList.toggle('is-on', on); o.setAttribute('aria-checked', on ? 'true' : 'false');
    });
  }
  function setLang(l) {
    if (LANGS.indexOf(l) < 0) return;
    lang = l;
    try { localStorage.setItem(KEY, l); } catch (e) {}
    document.documentElement.lang = HTML_LANG[l];
    walk(document.body);
    paintSwitch();
    try { window.dispatchEvent(new CustomEvent('zipen:lang', { detail: l })); } catch (e) {}
  }
  function openMenu(on) {
    if (!sw) return;
    sw.classList.toggle('open', on);
    btn.setAttribute('aria-expanded', on ? 'true' : 'false');
  }
  if (sw) {
    btn.addEventListener('click', function (e) { e.preventDefault(); openMenu(!sw.classList.contains('open')); });
    sw.querySelectorAll('.lang-opt').forEach(function (o) {
      o.addEventListener('click', function (e) { e.preventDefault(); setLang(o.dataset.lang); openMenu(false); });
    });
    document.addEventListener('pointerdown', function (e) { if (!sw.contains(e.target)) openMenu(false); });
    document.addEventListener('keydown', function (e) { if (e.key === 'Escape') openMenu(false); });

    /* на екрані входу шапку перекриває пічка — тоді кнопка «пливе» у правому верхньому куті */
    var home = sw.parentNode, gate = document.getElementById('auth-gate');
    var place = function () {
      var onGate = gate && !gate.hidden;
      if (onGate && sw.parentNode !== document.body) { document.body.appendChild(sw); sw.classList.add('is-floating'); }
      if (!onGate && sw.parentNode !== home) { home.appendChild(sw); sw.classList.remove('is-floating'); }
    };
    place();
    if (gate) new MutationObserver(place).observe(gate, { attributes: true, attributeFilter: ['hidden'] });
  }

  window.I18N = {
    get lang() { return lang; },
    t: t,
    set: setLang,
    share: function (stars, time, url) { return (SHARE[lang] || SHARE.uk).replace('{s}', stars).replace('{t}', time).replace('{u}', url); }
  };

  document.documentElement.lang = HTML_LANG[lang];
  walk(document.body);
  paintSwitch();

  observer = new MutationObserver(function (list) {
    list.forEach(function (m) {
      if (m.type === 'characterData') doText(m.target);
      else if (m.type === 'attributes') doAttr(m.target, m.attributeName);
      else m.addedNodes.forEach(walk);
    });
  });
  observer.observe(document.body, { subtree: true, childList: true, characterData: true, attributes: true, attributeFilter: ATTRS });
})();
