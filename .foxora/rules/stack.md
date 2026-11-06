# Stack - TASK MVP

## Wybrany stack

Next.js + TypeScript + Tailwind (zatwierdzony przez lead przed rozpoczęciem prac).

| Warstwa | Wybór | Wersja |
|---|---|---|
| Framework | Next.js (App Router, Turbopack) | 16.4.5 |
| Język | TypeScript (strict) | 5.9.3 |
| UI | React | 19.3.1 |
| Style | Tailwind CSS v4 + `@tailwindcss/postcss` | 4.3.5 |
| Fonty | Inter (UI) + Lora (warstwa Myśl) przez `next/font/google` | - |
| Testy | Vitest | 5.1.0 |
| Lint | ESLint 9 flat config + `eslint-config-next` | 9.39.x |

## Polecenia

```bash
npm install          # instalacja zaleznosci
npm run dev          # serwer deweloperski na http://localhost:3000
npm run build        # build produkcyjny (Turbopack)
npm run start        # uruchomienie builda produkcyjnego na porcie 3000
npm run lint         # ESLint
npm run typecheck    # tsc --noEmit
npm run test         # Vitest (testy logiki dziedzinowej w lib/)
```

Weryfikacja tras SSR (po `npm run build && npm run start`):

```bash
node .foxora/scratch/verify-routes.mjs http://localhost:3000
```

## Struktura

```
app/            trasy App Router (feed, grupy, grupa, szukaj, powiadomienia, moderacja, profil)
components/     komponenty interaktywne (PostCard, FactorCard, Composer, ReactionBar, ...)
lib/            logika dziedzinowa: typy, dane polskie, silnik czynnikow, wskaznik rownowagi, ranking, store
```

## Architektura MVP

- **Brak backendu.** Brak kont, logowania i API. Wszystkie dane startowe sa w `lib/data.ts`
  (realistyczne dane polskie), a stan trzymany jest w `lib/store.tsx` (React context + reducer)
  i zapisywany w `localStorage` przegladarki (`task-mvp-state-v1`).
- **Silnik Czynnikow dziala lokalnie** (`lib/engine.ts`): leksykon slow kluczowych wyznacza
  czynniki, wage, pewnosc, wykrywa czynniki krytyczne (wysoka waga + niska pewnosc) i proponuje
  2-3 warianty syntezy. Kazda propozycja jest oznaczona jako wygenerowana i edytowalna
  (PRD 7 i 11).
- **Wskaznik Rownowagi** (`lib/balance.ts`): W (wola) i M (mysl) 0-100, z Ginim zasiagu,
  udzialem dowodow i liczba uczestnikow. System sugeruje, nie nakazuje (PRD 8.3).
- **Ranking feedu** (`lib/rank.ts`): chronologiczny, tematyczny, rownowaga z suwakiem
  Wola <-> Mysl. Kazdy komunikat zwraca powody rankingu ("Dlaczego widze ten komunikat?", PRD F-07).

## Wymiana silnika na model jezykowy

`lib/engine.ts` ma jedno wejscie publiczne `createCard(postId, mode, input)` i zwraca strukture
`FactorCard`. Podmiana na wywolanie uslugi AI sprowadza sie do podmiany implementacji tego
modulu - warstwa UI (`components/FactorCard.tsx`) nie wymaga zmian.
