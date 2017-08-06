# Aplikacja internetowa w metodyce Test-Driven Development

<blockquote>
   <p>Projekt aplikacji internetowej podzielony został na następujące części:</p>
   <ul>
       <li>**Backend** - Katalog zawierający część aplikacji uruchamianej po stronie serwera na platformie Node.js;</li>
       <li>**Frontend** - Katalog zawierający część aplikacji uruchamianej po stronie klienta wykorzystującej platformę Node.js w celu automatyzacji większości zadań deweloperskich;</li>
    </ul>
    <p>
</blockquote>

Pogląd aplikacji internetowej jest dostępny <a href="https://www.helpdesk-app.mateusz-archicinski.pl" target="_blank" rel="help">tutaj</a>.

## Przydatne komendy środowiskowe NPM'a

- **npm run eslint** - Sprawdza kod JavaScript wszystkich plików z rozszerzeniem .js poszczególnej części aplikacji według kilku własnych i ogólno rekomendowanych ustawień w pliku .eslint.json;
- **npm run dev** - Uruchamia serwer, który nasłuchuje na zmiany w plikach i automatycznie wprowadza zmiany na uruchomionym serwerze;
- **npm run test** - Uruchamia wszystkie testy jednostkowe i w następstwie zmian w plikach testów wykonuje testy ponownie;
- **npm run test-report** - Uruchamia proces generowania raportu testów jednostkowych;
- **npm run jsdoc** - Uruchamia proces generowania dokumentacji;

Wymienione powyżej komendy mogą zostać uruchomione z poziomu wiersza poleceń podczas przebywania w katalogach backend/frontend.

## Konta do przeprowadzania testów

### Uprawnienia: Użytkownika
**Email/Login:** user@user
**Password:** user1234

### Uprawnienia: Asystenta
**Email/Login:** assistant@assitant
**Password:** assistant

### Uprawnienia: Administratora
Tego typu rodzaj praw dostępu nadawany jest na konto założone indywidualnie przez administatora.

## Dokumentacje:
- <a href="https://www.helpdesk-app.mateusz-archicinski.pl/backend/docs/index.html" target="_blank" rel="help">Dokumentacja - Backend</a>;
- <a href="https://www.helpdesk-app.mateusz-archicinski.pl/frontend/docs/index.html" target="_blank" rel="help">Dokumentacja - Frontend</a>;

## Raporty testów:
- <a href="https://www.helpdesk-app.mateusz-archicinski.pl/backend/test-reports/test-report-05.08.2017.html" target="_blank" rel="help">Raport testów z dnia 05-08-2017r - Backend</a>;
- <a href="https://www.helpdesk-app.mateusz-archicinski.pl/frontend/test-reports/test-report-06.08.2017.html" target="_blank" rel="help">Raport testów z dnia 06-08-2017r - Frontend</a>;

## Licencja

<a href="https://github.com/mateuszarchicinski/TDD-Helpdesk-Web-App-Project/blob/dev/LICENSE" target="_blank" rel="help">MIT Licencja</a>.