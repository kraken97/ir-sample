###  Oптимізація юзер інтерфейсу для пошукових систем.

### Автодоповнення при наборі тексту
![гарний приклад на quora](http://www.awesomescreenshot.com/upload//580301/540d1483-ef39-4ac9-7146-db90f3bfbbd3.png)
Автодоповнення є непоганим рішенням для невеликих і середніх проектів.
---
### Пошукові вирази та різні сортування
![приклад на стековерфлоу](http://www.awesomescreenshot.com/upload//580301/7215a840-d39c-4a3d-40d3-ca89c97aa653.png)
Якщо розмір коллекції дуже великий і роль для юзера грає біль широких спект охоплення питання, то автодоповнення краще замінити на 
пошукові вирази та різні опції сортування
---

### Пов'язані тематики.
![](http://www.awesomescreenshot.com/upload//580301/06586e7f-e4cc-49c2-6a2a-25fe6a8b0018.png)
Пошукові вирази можуть бути дуже складною штукою для кінцевого користувача і досить зручною заміною може стати пов'язані тематики 
---
### Кешування запитів
В невеликих проектах типу онлайн бібліотеки, де потрібно працювати навколо одної сутності досить непоганим рішенням може стати 
кешування пошукових запитів.
---

### Оптимізація кешування 
Оптимальним рішенням для кешування на стороні клієнта буде:
1. зберігати данні в вигляді 
```js
{
  [id]:{
   /* fields*/
  }
}
```
данні, які зберігаются в такому вигляді лежать під ключем ```data```
а пошукові запити повертають лише ```id``` цих сутностей
![](https://raw.githubusercontent.com/kraken97/ir-sample/master/images/store.png)
2. Непоганим рішенням буде зберігати кешовані данні не в пам'яті, а в indexedDb or localstorage.
--
### Пошук по кешованим данним і відаленний серверний пошук.
![](https://raw.githubusercontent.com/kraken97/ir-sample/master/images/ir.png)

Автор: Жеребко Дмитро. 
---
### Джерела
 - Приклади систем.
   - medium.com
   - stackoverflow.com
   - quora.com
 - Інформація про нормалізацію данніх 
   - [normalizr](https://github.com/paularmstrong/normalizr)
   - [redux](http://redux.js.org/docs/recipes/reducers/NormalizingStateShape.html) 
 - Імутабільні данні [immutable](http://redux.js.org/docs/faq/ImmutableData.html) 
