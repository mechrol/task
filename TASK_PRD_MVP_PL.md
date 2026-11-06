# PRD MVP: Thunder Access News komunikatów (TASK)

*Wersja 0.1 · dokument produktowy dla środowiska Foxora AI · język: polski*

## 1. Wizja i streszczenie

**TASK** to portal społecznościowy oparty na jednym prostym geście: użytkownik publikuje **komunikat**, który łączy dwie klasyczne formy:

- **„Co myślisz?”** (idea Facebooka) – przestrzeń refleksji, opinii, argumentów i relacji.
- **„Co robisz?”** (idea Twittera/X) – przestrzeń krótkich, bieżących komunikatów o działaniu, w czasie rzeczywistym.

Różnica wobec istniejących sieci: TASK nie jest tylko kanałem wypowiedzi. To **narzędzie do podejmowania lepszych decyzji** – zastępuje metodę „prób i błędów” metodą **analizy czynników** (analiza przez syntezę oraz synteza przez analizę) i pomaga utrzymać **równowagę między przestrzenią woli (wolność – liberalizm) a przestrzenią myśli (równość – demokracja)**.

**Hasło produktu:** *Myśl i działaj świadomie – razem.*

## 2. Problem

1. Facebook sprzyja długim dyskusjom, ale gubi działanie i konkluzję; Twitter/X sprzyja szybkości, ale gubi kontekst i argumentację.
2. Użytkownicy i zespoły uczą się metodą prób i błędów: działają, widzą porażkę, poprawiają. Jest to kosztowne i nie zostawia śladu wiedzy.
3. Algorytmy zaangażowania faworyzują emocje, nie jakość argumentów. Wolność wypowiedzi zderza się z równością głosu: albo dominuje głośna mniejszość, albo moderacja ogranicza swobodę.

## 3. Cele MVP

| Cel | Miara sukcesu (pierwsze 90 dni) |
|---|---|
| Udowodnić, że komunikat łączący myśl i czyn jest atrakcyjny | ≥ 40% aktywnych użytkowników publikuje ≥ 1 komunikat tygodniowo |
| Udowodnić, że analiza czynników zastępuje próby i błędy | ≥ 30% komunikatów ma uzupełnioną Kartę Czynników |
| Zweryfikować mechanizm równowagi Wola–Myśl | ≥ 60% użytkowników ocenia feed jako „sprawiedliwy” (ankieta 1–5, średnia ≥ 4) |
| Zbudować MVP w Foxora AI w krótkim cyklu | Wersja beta w 8–10 tygodni |

**Poza celami MVP:** monetyzacja, aplikacje natywne, wiadomości prywatne wideo, otwarte API dla firm trzecich.

## 4. Użytkownicy docelowi

- **Autor-działacz** – osoba lub twórca dzielący się bieżącymi działaniami i refleksją (odpowiednik użytkownika Twittera/X).
- **Uczestnik społeczności** – osoba komentująca, oceniająca argumenty, budująca relacje (odpowiednik użytkownika Facebooka).
- **Zespół / grupa decyzyjna** – mała grupa (projekt, organizacja, inicjatywa lokalna) podejmująca wspólne decyzje metodą czynnikową.
- **Moderator-opiekun społeczności** – dba o zasady grupy bez cenzury treści legalnych.

## 5. Benchmark: możliwości Facebooka i Twittera/X

Poniższa tabela porządkuje funkcje obu portali i pokazuje, co trafia do MVP.

| Obszar | Facebook | Twitter/X | Decyzja dla TASK (MVP) |
|---|---|---|---|
| Profil | Rozbudowany, zdjęcia, biogram, informacje o sobie | Krótki profil, handle, biogram | **Tak** – profil krótki + „Mapa mocnych stron” (opcjonalnie) |
| Publikacja | Posty bez ścisłego limitu, zdjęcia, wideo, nastroje | Krótkie posty z limitem znaków, wątki | **Tak** – komunikat dwuwarstwowy: Myśl + Czyn (limity osobne) |
| Obserwowanie / znajomi | Dwustronna znajomość | Jednostronne obserwowanie | **Tak** – obserwowanie jednostronne + „Krąg zaufania” dwustronny |
| Reakcje | Polubienia, emocje | Polubienia, repost | **Zmiana** – reakcje merytoryczne (Zgoda / Wątpliwość / Dowód) zamiast samego „lubię” |
| Komentarze | Wątki zagnieżdżone | Odpowiedzi, cytaty | **Tak** – odpowiedzi w wątku, odpowiedź może być Czynnikiem |
| Udostępnianie | Udostępnij | Repost, cytat | **Tak** – udostępnienie z opcjonalnym dopiskiem |
| Grupy i wydarzenia | Grupy, wydarzenia, strony | Listy, Spaces, społeczności | **Tak (uproszczone)** – Grupy z własnymi regułami |
| Hashtagi / trendy | Hashtagi, sekcje popularne | Hashtagi, trendy | **Tak** – tematy; trendy liczone z jakości, nie wyłącznie z zasięgu |
| Wyszukiwarka | Ludzie, strony, posty | Posty, ludzie, filtry zaawansowane | **Tak** – podstawowa |
| Powiadomienia | Push, e-mail | Push, e-mail | **Tak** – konfigurowalne |
| Wiadomości prywatne | Messenger | DM | **Później** (po MVP) |
| Media | Zdjęcia, wideo, relacje | Zdjęcia, wideo, GIF | **Tak** – zdjęcia i linki; wideo po MVP |
| Ankiety | Ankiety | Ankiety | **Tak** – rozszerzone o głosowanie na argumenty |
| Moderacja i zgłaszanie | Standardy społeczności | Zasady platformy, notatki społeczności | **Tak** – zgłaszanie + notatki społeczności (patrz sekcja 8) |
| Prywatność | Poziomy odbiorców | Konta chronione | **Tak** – publiczny / krąg / tylko ja |
| Reklamy i monetyzacja | Rozbudowane | Rozbudowane | **Nie** w MVP |

*Uwaga: zestaw funkcji obu platform zmienia się w czasie; tabela jest punktem wyjścia do produktu, a nie pełną specyfikacją konkurencji. Przed zamknięciem zakresu zalecany krótki przegląd aktualnych funkcji.*

## 6. Koncept produktu: Komunikat TASK

Każdy komunikat ma do trzech części:

1. **Myśl („Co myślisz?”)** – krótka opinia, pytanie lub hipoteza (do 600 znaków).
2. **Czyn („Co robisz?”)** – bieżące działanie lub zamiar, w formie krótkiej (do 180 znaków), z opcjonalnym statusem: *planuję / robię / zrobiłem / przerwałem*.
3. **Karta Czynników** (opcjonalna, ale promowana) – strukturalny opis czynników wpływających na decyzję (sekcja 7).

Komunikat może zawierać tylko Myśl, tylko Czyn lub oba elementy. Wątek komunikatu pokazuje historię: od hipotezy, przez działanie, po wynik. Dzięki temu społeczność widzi nie tylko „co mówię”, ale też „co z tego wyszło”.

## 7. Silnik Analizy Czynników (zastąpienie prób i błędów)

**Zasada:** zanim użytkownik zadziała metodą prób i błędów, aplikacja prowadzi go przez rozłożenie problemu na czynniki i ich ponowne złożenie. Są dwa tryby pracy.

### 7.1. Tryb A: Analiza przez syntezę (od całości do części)

*Kiedy:* użytkownik ma cel lub pomysł, ale nie wie, co go zablokuje.

1. Użytkownik formułuje **całościowy komunikat** (cel, plan, hipotezę) w polu Myśl/Czyn.
2. Silnik proponuje **syntezę wstępną**: jedno zdanie opisujące, jak cel ma zostać osiągnięty.
3. Silnik **rozkłada syntezę na czynniki** (zasoby, ryzyka, zależności, założenia, odbiorcy, czas).
4. Użytkownik i społeczność oceniają czynniki: waga (1–5), pewność (1–5), dowód (link, obserwacja, brak).
5. System wskazuje **czynniki krytyczne** (wysoka waga, niska pewność) – to tu testujemy najpierw, zamiast działać na oślep.

### 7.2. Tryb B: Synteza przez analizę (od części do całości)

*Kiedy:* użytkownik ma problem lub zbiór faktów i szuka rozwiązania.

1. Użytkownik dodaje **czynniki jeden po drugim** (obserwacje, ograniczenia, dane, opinie z wątku).
2. Silnik grupuje podobne czynniki, wykrywa sprzeczności i luki.
3. Silnik proponuje **2–3 warianty syntezy** (kandydaci na rozwiązanie), z uzasadnieniem opartym na czynnikach.
4. Użytkownik wybiera wariant i publikuje go jako komunikat Czyn z linkiem do Karty Czynników.

### 7.3. Pętla uczenia (zamiast „prób i błędów”)

Po wykonaniu działania użytkownik zamyka komunikat statusem **Wynik** (*potwierdzone / częściowo / obalone*) i wskazuje, **który czynnik** zawiódł lub zadziałał. System aktualizuje wagi i zapisuje **wiedzę o czynnikach** w profilu. Błąd staje się daną, a nie powtórką.

**Rola AI (Foxora AI):** podpowiadanie czynników, wykrywanie braków logicznych, streszczanie wątku do Karty Czynników, porównywanie wariantów. AI **nie podejmuje decyzji** – przedstawia je jako propozycje z uzasadnieniem i miejscem na sprzeciw.

## 8. Równowaga: wola (wolność, liberalizm) a myśl (równość, demokracja)

**Założenie filozoficzne:** przestrzeń **woli** to prawo jednostki do swobodnego wyboru i wypowiedzi; przestrzeń **myśli** to prawo wspólnoty do równego udziału w rozważaniu i rozstrzyganiu. Jedna bez drugiej się wypacza: sama wola prowadzi do dominacji najsilniejszych, sama równość do przymusu większości. TASK ma pozwalać je **równoważyć**, nie wybierać jedną.

### 8.1. Mechanizmy po stronie woli (wolność)

- Swoboda publikacji legalnych treści; moderacja ogranicza się do prawa i jawnych zasad.
- Użytkownik **sam ustawia widoczność** komunikatu (publiczny / krąg / tylko ja).
- Użytkownik **sam wybiera sposób sortowania feedu** (chronologiczny, tematyczny, Równowaga).
- Eksport i usunięcie własnych danych jednym przyciskiem.
- Grupy mają **własne reguły** (nie jedną regułę globalną na wszystko).

### 8.2. Mechanizmy po stronie myśli (równość)

- **Równy zasięg bazowy:** każdy nowy komunikat dostaje minimalną, równą pulę wyświetleń w swoim kręgu, niezależnie od liczby obserwujących.
- **Jeden głos na argument:** ocena argumentów (Zgoda / Wątpliwość / Dowód) liczona jeden-człowiek-jeden-głos, z ochroną przed botami (weryfikacja konta).
- **Notatki społeczności:** kontekst do spornych komunikatów dodawany przez użytkowników o różnych poglądach (zatwierdzany tylko przy zgodzie różnych grup).
- **Jawność rankingu:** przycisk „Dlaczego widzę ten komunikat?” z listą czynników.
- Decyzje grupowe: głosowanie nad wariantem syntezy (sekcja 7).

### 8.3. Wskaźnik Równowagi (Balance Index)

Dla każdego feedu, grupy i wątku TASK liczy dwa wskaźniki 0–100:

- **W (Wola):** różnorodność źródeł, swoboda ustawień, niski udział usunięć treści.
- **M (Myśl):** równomierność rozkładu zasięgu (np. współczynnik Giniego), udział różnych uczestników w dyskusji, udział argumentów z dowodami.

Wskaźnik pokazuje **odchylenie od równowagi**. Gdy W ≫ M, system sugeruje: *„Dyskusję zdominowało kilka głosów – zaproś nowe osoby / włącz głosowanie”*. Gdy M ≫ W: *„Zasady grupy mocno ograniczają swobodę – rozważ ich złagodzenie”*. System **sugeruje, nie narzuca**.

### 8.4. Feed „Równowaga”

Domyślny feed łączy: komunikaty z kręgu użytkownika (wola) + losowo dobrane komunikaty o wysokiej jakości argumentacji z innych kręgów (myśl). Proporcje użytkownik reguluje suwakiem **Wola ⟷ Myśl**.

## 9. Zakres MVP

### Musi być (Must have)

- Rejestracja, logowanie (e-mail + OAuth), weryfikacja konta.
- Profil: nazwa, handle, biogram, avatar.
- Komunikat dwuwarstwowy (Myśl + Czyn + status).
- Karta Czynników z trybami A i B (podstawowe) oraz zamknięciem Wynik.
- Obserwowanie, Krąg zaufania.
- Feed: chronologiczny i Równowaga.
- Reakcje merytoryczne i odpowiedzi w wątku.
- Grupy z własnymi regułami.
- Wskaźnik Równowagi na poziomie grupy i wątku.
- Zgłaszanie treści, podstawowa moderacja.
- Powiadomienia (w aplikacji + e-mail).
- Wyszukiwanie komunikatów i osób.

### Powinno być (Should have)

- Notatki społeczności.
- Głosowanie grupowe nad wariantami syntezy.
- Eksport danych użytkownika.
- Wersja mobilna jako PWA.

### Nie w MVP (Won't have)

- Wiadomości prywatne, wideo, relacje, transmisje na żywo.
- Reklamy, płatności, subskrypcje.
- Aplikacje natywne iOS/Android.
- Publiczne API.

## 10. Wymagania funkcjonalne (wybrane historyjki)

| ID | Historyjka użytkownika | Kryterium akceptacji |
|---|---|---|
| F-01 | Jako użytkownik chcę opublikować komunikat z Myślą i Czynem, aby pokazać, co myślę i co robię. | Publikacja trwa < 2 s; limity znaków egzekwowane osobno dla Myśli i Czynu. |
| F-02 | Jako autor chcę uruchomić tryb A na swoim komunikacie, aby zobaczyć czynniki, które mogą mi przeszkodzić. | System zwraca ≥ 3 czynniki z wagą i pewnością do edycji. |
| F-03 | Jako autor chcę dodać czynniki ręcznie i dostać warianty syntezy (tryb B). | System zwraca 2–3 warianty z uzasadnieniem. |
| F-04 | Jako autor chcę zamknąć komunikat statusem Wynik i wskazać czynnik, który zawiódł. | Wynik zapisany w historii; aktualizacja wag w profilu. |
| F-05 | Jako czytelnik chcę zareagować „Wątpliwość” lub „Dowód”, aby wzmocnić dyskusję. | Reakcja „Dowód” wymaga linku lub krótkiego uzasadnienia. |
| F-06 | Jako użytkownik chcę przełączyć feed między trybami i ustawić suwak Wola ⟷ Myśl. | Zmiana widoczna natychmiast, ustawienie zapamiętane. |
| F-07 | Jako użytkownik chcę zobaczyć, dlaczego widzę dany komunikat. | Okno z listą czynników rankingu. |
| F-08 | Jako założyciel grupy chcę ustawić własne reguły i poziom moderacji. | Reguły widoczne dla członków; zmiana odnotowana w historii. |
| F-09 | Jako członek grupy chcę widzieć Wskaźnik Równowagi grupy. | Wskaźnik odświeżany co 24 h, z krótkim opisem. |
| F-10 | Jako użytkownik chcę zgłosić treść naruszającą prawo lub zasady. | Zgłoszenie rozpatrzone w 48 h; autor informowany o powodzie. |

## 11. Wymagania niefunkcjonalne

- **Wydajność:** ładowanie feedu < 2 s (p95); odpowiedź silnika czynników < 8 s.
- **Dostępność i UX:** responsywność, zgodność z WCAG 2.1 AA, język polski jako domyślny, wsparcie i18n.
- **Bezpieczeństwo:** szyfrowanie transmisji i danych w spoczynku, ochrona przed spamem i botami, limity zapytań.
- **Prywatność i zgodność:** zgodność z RODO (zgody, prawo do usunięcia i eksportu, minimalizacja danych); wyjaśnialność rekomendacji (AI Act, DSA – do weryfikacji przez prawnika).
- **Przejrzystość AI:** każda sugestia silnika oznaczona jako generowana; użytkownik może ją odrzucić; logi decyzji bez danych wrażliwych.
- **Skalowalność:** architektura gotowa na 10 tys. aktywnych użytkowników w MVP.

## 12. Model danych (uproszczony)

- **Użytkownik** (id, handle, profil, ustawienia, suwak Wola–Myśl)
- **Komunikat** (id, autor, Myśl, Czyn, status, widoczność, grupa, znaczniki czasu)
- **KartaCzynników** (id, komunikat, tryb A/B, wersje)
- **Czynnik** (id, karta, opis, waga, pewność, dowód, wynik)
- **WariantSyntezy** (id, karta, opis, uzasadnienie, głosy)
- **Reakcja** (id, komunikat, typ: Zgoda/Wątpliwość/Dowód, użytkownik)
- **Grupa** (id, nazwa, reguły, poziom moderacji)
- **WskaźnikRównowagi** (obiekt, W, M, data)
- **Zgłoszenie**, **Notatka społeczności**, **Powiadomienie**

## 13. Architektura i realizacja w Foxora AI

*Założenia (do potwierdzenia, ponieważ szczegóły środowiska Foxora AI są po Twojej stronie):*

- Foxora AI generuje i utrzymuje: frontend webowy (PWA), backend API, bazę danych, warstwę uwierzytelniania.
- Moduł **Silnik Czynników** działa jako osobna usługa korzystająca z modelu językowego; wejściem jest komunikat, wyjściem lista czynników / warianty w ustrukturyzowanym JSON.
- Moduł **Ranking Równowagi** działa jako zadanie wsadowe + obliczenia na żywo dla feedu.
- Rekomendowane środowiska: kolejka zadań dla analiz, cache dla feedu, wyszukiwanie pełnotekstowe.

**Pytanie do Ciebie:** jakie możliwości Foxora AI ma wbudowane (generowanie kodu, hosting, integracja z modelami językowymi, baza danych)? Dostosuję sekcję 13 i plan sprintów.

## 14. Metryki produktu

- **Aktywacja:** odsetek nowych użytkowników publikujących pierwszy komunikat w 24 h.
- **Zaangażowanie:** komunikaty / użytkownik / tydzień; odsetek komunikatów z Kartą Czynników.
- **Jakość dyskusji:** odsetek reakcji „Dowód”; średnia liczba uczestników w wątku.
- **Skuteczność metody czynnikowej:** odsetek komunikatów zamkniętych Wynikiem; odsetek decyzji, w których krytyczny czynnik zidentyfikowano przed działaniem.
- **Równowaga:** średni Balance Index; odchylenie od 50/50; współczynnik Giniego zasięgu.
- **Zaufanie:** ocena „sprawiedliwości” feedu; odsetek zgłoszeń uznanych za zasadne.

## 15. Ryzyka i działania zapobiegawcze

| Ryzyko | Prawdopodobieństwo | Działanie |
|---|---|---|
| Karta Czynników jest zbyt trudna i użytkownicy ją pomijają | Wysokie | Szablony, podpowiedzi AI, wersja „1 minuta” |
| Wskaźnik Równowagi odbierany jako cenzura lub inżynieria społeczna | Średnie | Jawne formuły, sugestie zamiast nakazów, opt-out |
| Boty i zakłócanie głosowań | Średnie | Weryfikacja konta, limity, detekcja anomalii |
| Halucynacje AI w czynnikach | Średnie | Oznaczenia, prośba o dowód, edycja ręczna |
| Zgodność prawna (RODO, DSA) | Średnie | Konsultacja prawna przed publicznym startem |
| Efekt pustej sieci (zimny start) | Wysokie | Start przez grupy zamknięte i społeczności niszowe |

## 16. Plan wydania

| Etap | Czas | Zakres |
|---|---|---|
| Sprint 0 | tydzień 1 | Doprecyzowanie PRD, projekt UX, model danych |
| Sprint 1–2 | tygodnie 2–5 | Konta, profile, komunikaty, feed chronologiczny, obserwowanie |
| Sprint 3–4 | tygodnie 6–8 | Karta Czynników (tryb A i B), pętla Wynik, reakcje merytoryczne |
| Sprint 5 | tygodnie 9–10 | Grupy, Wskaźnik Równowagi, feed Równowaga, moderacja |
| Beta zamknięta | tygodnie 11–12 | 50–200 użytkowników, ankiety, korekty |
| Po MVP | kwartał 2 | Wiadomości prywatne, wideo, notatki społeczności, aplikacje natywne |

## 17. Pytania otwarte

1. Czy TASK ma być platformą otwartą (publiczną), czy zaczynać jako sieć grup zamkniętych?
2. Kto jest pierwszą grupą docelową (twórcy, zespoły projektowe, organizacje lokalne, edukacja)?
3. Czy formuła Balance Index ma być stała, czy konfigurowalna przez grupę?
4. Jakie możliwości i ograniczenia ma środowisko Foxora AI (sekcja 13)?
5. Jaki jest budżet i zespół (osoby, godziny tygodniowo)?

## 18. Następne kroki

- Potwierdzenie zakresu MVP i grupy docelowej.
- Wireframe’y: ekran komunikatu, Karta Czynników, feed Równowaga.
- Specyfikacja techniczna dla Foxora AI (prompt wdrożeniowy i podział na moduły).
