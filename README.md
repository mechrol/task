# task

Komunikacyjny portal społecznościowy.

# TASK - MVP demonstracyjne

Portal komunikatow, ktory laczy warstwe **mysli** i warstwe **czynu**, z silnikiem analizy
czynnikow zamiast metody prob i bledow. Wersja MVP/demo zgodna z `TASK_PRD_MVP_PL.md`.

## Uruchomienie

```bash
npm install
npm run dev          # http://localhost:3000
```

Build produkcyjny:

```bash
npm run build
npm run start
```

Sprawdzenia jakosci: `npm run lint`, `npm run typecheck`, `npm run test`.
Pelne polecenia i wersje: `.foxora/rules/stack.md`.

## Co dziala

- **Komunikat dwuwarstwowy** - Myśl (do 600 znakow, szeryfowo) i Czyn (do 180 znakow, z statusem
  planuje / robie / zrobilem / przerwalam). Limity egzekwowane osobno dla kazdej warstwy.
- **Karta Czynnikow** - tryb A (analiza przez synteza) i tryb B (synteza przez analiza).
  Czynniki maja wage, pewnosc i dowód; czynniki krytyczne (wysoka waga + niska pewnosc) sa
  wyróżnione; w trybie B pojawiaja sie 2-3 warianty syntezy z uzasadnieniem i glosowaniem.
- **Petla uczenia** - zamkniecie watku wynikiem (potwierdzone / czesciowo / obalone) ze wskazaniem
  czynnika, ktory zadzialal lub zawiodl. Wiedza trafia do profilu.
- **Reakcje merytoryczne** - Zgoda / Wątpliwość / Dowód. Reakcja Dowód wymaga uzasadnienia.
- **Odpowiedzi** w watku, z opcja powiazania odpowiedzi z czynnikiem.
- **Feed Równowaga** - suwak Wola <-> Mysl steruje mieszanka, z transparentnym rankingiem
  ("Dlaczego widzę ten komunikat?").
- **Grupy** z wlasnymi regulami i wlasnym Wskaznikiem Równowagi.
- **Wyszukiwarka**, **powiadomienia**, **zgłaszanie i moderacja**, **profil z eksportem danych**.

## Czego tu nie ma

Nie ma backendu, kont, logowania ani API. Wszystkie dane sa przykładowe, trzymane w przegladarce
(`localStorage`). Silnik czynnikow dziala regulowo lokalnie - nie jest to model jezykowy.
Pozycje z PRD opisane jako "powinno byc" (notatki spolecznosci) maja tylko koncept w interfejsie.

## Zasady dostepu

Interfejs jest po polsku, responsywny (mobile 390 px / desktop 1280 px) i zgodny z WCAG 2.1 AA:
semantyczne landmarki, skip link, widoczny fokus, `aria-label` / `aria-pressed` / `aria-checked`,
etykiety formularzy, kontrast tekstu oraz respektowanie `prefers-reduced-motion`.
