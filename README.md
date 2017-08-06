# Aplikacja internetowa w metodyce Test-Driven Development

<blockquote>
 <p>Projekt podzielony został na następujące części:</p>
 <ul>
   <li><strong>Backend</strong> - Katalog zawierający część aplikacji uruchamianej po stronie serwera na platformie <a href="https://nodejs.org/en/" target="_blank" rel="help">Node.js</a>, której zadaniem jest świadczenie usług i udostępnianie zasobów użytkownikom/klientom będącym np. przeglądarką;</li>
   <li><strong>Frontend</strong> - Katalog zawierający część aplikacji uruchamianej po stronie klienta wykorzystującej platformę Node.js do automatyzacji większości zadań deweloperskich mających na celu przygotowanie gotowego builda aplikacji wysyłanego do użytkownika korzystającego z przeglądarki internetowej;</li>
 </ul>
 <p>
</blockquote>

Pogląd aplikacji internetowej jest dostępny <a href="https://www.helpdesk-app.mateusz-archicinski.pl" target="_blank" rel="help">tutaj</a>.


## Przydatne komendy środowiskowe NPM'a

Sprawdza kod JavaScript wszystkich plików z rozszerzeniem .js poszczególnej części aplikacji według kilku własnych i ogólno rekomendowanych ustawień w pliku .eslint.json;
```
npm run eslint
```

Uruchamia serwer, który nasłuchuje na zmiany w plikach i automatycznie wprowadza zmiany na uruchomionym serwerze;
```
npm run dev
```

Uruchamia wszystkie testy jednostkowe i w następstwie zmian w plikach testów wykonuje testy ponownie;
```
npm run test
```

Uruchamia proces generowania raportu testów jednostkowych;
```
npm run test-report
```

Uruchamia proces generowania dokumentacji;
```
npm run jsdoc
```

Wymienione powyżej komendy mogą zostać uruchomione z poziomu wiersza poleceń podczas przebywania w katalogach backend/frontend.


## Konta do przeprowadzania testów

### Uprawnienia: Użytkownika
**Email/Login:** user@user<br>
**Password:** user1234

### Uprawnienia: Asystenta
**Email/Login:** assistant@assitant<br>
**Password:** assistant

### Uprawnienia: Administratora
Tego typu rodzaj praw dostępu nadawany jest na konto założone indywidualnie przez administatora.


## Dokumentacje:

- <a href="https://www.helpdesk-app.mateusz-archicinski.pl/backend/docs/index.html" target="_blank" rel="help">Dokumentacja - Backend</a>;
- <a href="https://www.helpdesk-app.mateusz-archicinski.pl/frontend/docs/index.html" target="_blank" rel="help">Dokumentacja - Frontend</a>;


## Raporty testów:

- <a href="https://www.helpdesk-app.mateusz-archicinski.pl/backend/test-reports/test-report_06-08-2017.html" target="_blank" rel="help">Raport testów z dnia 06-08-2017r - Backend</a>;
- <a href="https://www.helpdesk-app.mateusz-archicinski.pl/frontend/test-reports/test-report_06-08-2017.html" target="_blank" rel="help">Raport testów z dnia 06-08-2017r - Frontend</a>;


## Licencja

<a href="https://github.com/mateuszarchicinski/TDD-Helpdesk-Web-App-Project/blob/dev/LICENSE" target="_blank" rel="help">MIT Licencja</a>.