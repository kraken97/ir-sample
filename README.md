## Web search example.
![](./images/login.png)
- 1. Опис
- 2. Список використаних бібліотек
- 3. Навіщо воно потрібно.
- 4. Що воно робить. 
- 5. Як воно робить.
- 6. Як покращити.
- 7. Як все це запустити.


1. Це Веб застосування, яке демонструє  можливість пошуку на клієнті та на сервері з кешуванням данних.
2. Використовувалися такі біблиотеки 
 react -...
 redux - state management 
 redux-saga - side-effects model 
 redux-search - client-search lib
 reselect - lib for data memoization
 immutalbe - lib for immutable data structures
 react-router - client rouning 
 auth0 - authentication
 json-server - mock-server
 faker - fake data

3. Offline-first. Кешування запитів на клієнті робит программу більш офлайн спрямованою.
4. Це веб застосування, яке просто кешує пошукові запити і надає можливість пошуку в кешованих запитах
5. Програма викроистовує нормалізований вид данних 
```js 
{
    [id]:{
        id:id,
        title: '',
        author: '',
        description: '',
    }
}
```
А також іммутабільні структури данних для оптимізації і швидкої перевірки на рівнисть.
Для пошуку на клієнті використовується redux-search. Він індексує колекцію и може робити пошук по заданим полям..
Його можна розширити, додавши власний метод для індексування.

Data flow виглядає наступним чином:
1. на сервер йде пошуковий запит. 
2. клієнт отримує його, нормалізує і зберігає під ключем ```data```.
3. результат запиту на сервер зберігається в ключі ```ids```. Посилання на елемент з ```data```.
4. потім наступні запити, які йдуть на пошук по кешованним даннми перезаписують данні в в ключі ```data```
![](https://raw.githubusercontent.com/kraken97/ir-sample/master/images/ir.png)
![](https://raw.githubusercontent.com/kraken97/ir-sample/master/images/store.png)

6. Що можна покращити ?
 - Кешувати данні не в пам'яті, а в кліентському сторейджі.
   тут допоможе redux-persist або redux-offline
 - Придумати кращий спосіб для серверних запитів.

7. Як 3апустити ?
```
export AUTH0_DOMAIN='auth domain'
export AUTH0_CLIENT_ID='auth id'
// fake.js file for generaing fake data node fake.js
npm run server
npm run dev
```
