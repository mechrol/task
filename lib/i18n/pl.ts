/**
 * Slownik UI - jezyk polski (domyslny).
 *
 * Klucze sa plaskie i z kropkami, dzieki czemu `en.ts` musi zawierac dokladnie
 * ten sam zestaw kluczy (kontroluje to typ `Dictionary`). Wartości moga
 * zawierac placeholdery `{nazwa}`, podstawiane przez `t()`.
 */
export const pl = {
  // --- Powloka / nawigacja -------------------------------------------------
  "shell.skipToContent": "Przejdź do treści głównej",
  "shell.homeLabel": "TASK - strona główna",
  "shell.tagline": "Myśl i działaj",
  "shell.navLabel": "Nawigacja główna",
  "shell.mobileNavLabel": "Nawigacja mobilna",
  "shell.menu": "Menu",
  "shell.unreadNotifications": " nieprzeczytanych powiadomień",
  "shell.footerTitle": "TASK - wersja demonstracyjna MVP",
  "shell.footerText":
    "Wszystkie dane są przykładowe i zapisane lokalnie w przeglądarce. Nie ma tu jeszcze kont, logowania ani serwera - interakcje działają w obrębie tej sesji. Zawartość związana z AI (Karta Czynników) jest generowana regułowo i oznaczona jako propozycja, którą możesz odrzucić.",

  "nav.feed": "Feed",
  "nav.groups": "Grupy",
  "nav.search": "Szukaj",
  "nav.notifications": "Powiadomienia",
  "nav.moderation": "Moderacja",

  "language.label": "Język",
  "language.switch": "Przełącz język interfejsu",
  "language.pl": "Polski",
  "language.en": "English",

  // --- Feed -----------------------------------------------------------------
  "feed.heading": "Komunikaty",
  "feed.count.one": "{count} komunikat w feedzie",
  "feed.count.few": "{count} komunikaty w feedzie",
  "feed.count.many": "{count} komunikatów w feedzie",
  "feed.empty": "Brak komunikatów w tym feedzie. Napisz pierwszy wątek powyżej.",
  "feed.how.title": "Jak to działa",
  "feed.how.thought":
    "Hipoteza, pytanie lub argument. Maksymalnie 600 znaków.",
  "feed.how.action": "Co robisz teraz. Maksymalnie 180 znaków, z statusem.",
  "feed.how.card":
    "Zamiast prób i błędów rozkładasz problem na czynniki z wagą, pewnością i dowodem.",
  "feed.how.outcome":
    "Zamykasz wątek wynikiem i wskazujesz, który czynnik zadziałał albo zawiódł.",
  "feed.reactions.title": "Reakcje merytoryczne",
  "feed.reactions.intro": "Zamiast samego „lubię” masz trzy narzędzia argumentacji:",
  "feed.reactions.agree": "zgadzasz się z argumentem.",
  "feed.reactions.doubt": "masz pytanie, które trzeba rozstrzygnąć.",
  "feed.reactions.evidence": "wskazujesz źródło lub pomiar. Wymaga uzasadnienia.",
  "feed.groups.title": "Grupy",
  "feed.groups.member": "członek",
  "feed.groups.join": "dołącz",

  // --- Kompozytor -----------------------------------------------------------
  "composer.heading": "Nowy komunikat",
  "composer.prompt": "Co myślisz? Co robisz?",
  "composer.limitThought": "Myśl do {limit} znaków",
  "composer.limitAction": "Czyn do {limit} znaków",
  "composer.cardOptional": "Karta Czynników opcjonalna",
  "composer.thoughtLabel": "Co myślisz?",
  "composer.thoughtPlaceholder": "Hipoteza, pytanie lub opinia, która otwiera wątek.",
  "composer.thoughtHint": "Warstwa myśli: refleksja, argument, pytanie. Maksymalnie {limit} znaków.",
  "composer.actionLabel": "Co robisz?",
  "composer.actionPlaceholder": "Bieżące działanie lub zamiar. Możesz zostawić puste.",
  "composer.actionHint": "Warstwa czynu: krótko, konkretnie, na teraz. Maksymalnie {limit} znaków.",
  "composer.contextLegend": "Kontekst",
  "composer.statusLabel": "Status czynu",
  "composer.statusNone": "Bez statusu",
  "composer.visibilityLabel": "Widoczność",
  "composer.groupLabel": "Grupa",
  "composer.groupNone": "Bez grupy",
  "composer.topicLabel": "Temat",
  "composer.topicNone": "Bez tematu",
  "composer.cardLegend": "Karta Czynników",
  "composer.cardCheckbox": "Rozłóż problem na czynniki przed działaniem",
  "composer.cardHint":
    "Silnik zaproponuje czynniki z wagą i pewnością. To propozycja do edycji, nie nakaz.",
  "composer.modeGroupLabel": "Tryb analizy",
  "composer.modeATitle": "Tryb A: analiza przez syntezę",
  "composer.modeADesc": "Mam cel, ale nie wiem, co mnie zablokuje. Od całości do części.",
  "composer.modeBTitle": "Tryb B: synteza przez analizę",
  "composer.modeBDesc": "Mam fakty i szukam rozwiązania. Od części do całości.",
  "composer.publishNote":
    "Publikacja jest natychmiastowa. Limit znaków sprawdzany osobno dla obu warstw.",
  "composer.publish": "Opublikuj",
  "composer.cancel": "Anuluj",
  "composer.errorRequired":
    "Myśl jest wymagana - komunikat musi odpowiadać na pytanie „co myślisz?”.",

  // --- Karta komunikatu ----------------------------------------------------
  "post.why.title": "Dlaczego widzę ten komunikat?",
  "post.why.close": "Zamknij",
  "post.why.legend":
    "Bursztyn = wkład w przestrzeń woli. Indygo = wkład w przestrzeń myśli.",
  "post.verified.title": "Zweryfikowany profil",
  "post.verified.sr": "zweryfikowany profil",
  "post.unknownAuthor": "Nieznany",
  "post.actionLabel": "Czyn",
  "post.outcomePrefix": "Wynik: {value}",
  "post.reactions.one": "{count} reakcja",
  "post.reactions.few": "{count} reakcje",
  "post.reactions.many": "{count} reakcji",
  "post.replies.one": "{count} odpowiedź",
  "post.replies.few": "{count} odpowiedzi",
  "post.replies.many": "{count} odpowiedzi",
  "post.mineReaction": " · Twoja reakcja zapisana",
  "post.report": "Zgłoś",

  // --- Zgloszenie treści ----------------------------------------------------
  "report.title": "Zgłoś treść",
  "report.reasonLegend": "Powód zgłoszenia",
  "report.detailsLabel": "Szczegóły zgłoszenia",
  "report.detailsPlaceholder": "Opcjonalnie: co konkretnie narusza prawo lub zasady?",
  "report.send": "Wyślij zgłoszenie",
  "report.cancel": "Anuluj",
  "report.sent":
    "Zgłoszenie przyjęte. Autor otrzyma informację o powodzie rozpatrzenia, a zespół moderacyjny zajmie się nim w ciągu 48 godzin.",

  // --- Karta Czynnikow -----------------------------------------------------
  "factor.cardLabel": "Karta Czynników",
  "factor.cardTitle": "Karta Czynników - tryb {mode}",
  "factor.modeA": "Analiza przez syntezę",
  "factor.modeB": "Synteza przez analizę",
  "factor.counts": "{count} czynników · {withEvidence} z dowodem",
  "factor.synthesisLabel": "Synteza:",
  "factor.criticalLabel": "Czynniki krytyczne:",
  "factor.criticalTail":
    "Wysoka waga przy niskiej pewności - testuj je najpierw, zamiast działać na oślep.",
  "factor.weight": "Waga",
  "factor.confidence": "Pewność",
  "factor.scale": "{label}: {value} na 5",
  "factor.evidenceLabel": "Dowód",
  "factor.noEvidence": "brak - czynnik nietestowany",
  "factor.engineProposal": "Propozycja silnika",
  "factor.critical": "Czynnik krytyczny",
  "factor.edit": "Edytuj",
  "factor.close": "Zamknij",
  "factor.descriptionLabel": "Opis czynnika",
  "factor.weightRange": "Waga (1-5)",
  "factor.confidenceRange": "Pewność (1-5)",
  "factor.evidenceInputLabel": "Dowód (link, obserwacja lub pomiar)",
  "factor.evidencePlaceholder": "np. Regulamin programu, strona 4",
  "factor.remove": "Usuń czynnik",
  "factor.variantsTitle": "Warianty syntezy ({count})",
  "factor.justificationLabel": "Uzasadnienie:",
  "factor.basedOn": "Oparte na: {list}",
  "factor.votesSr": " głosów za wariantem {title}",
  "factor.voteNote":
    "Głosowanie jest jedno-osoba-jeden-głos w obrębie tej przeglądarki. Warianty to propozycje, nie decyzje.",
  "factor.outcomeTitle": "Pętla uczenia - zamknięcie wynikiem",
  "factor.outcomeValue": "Wynik: {value}",
  "factor.decidingFactor": "Czynnik, który zadecydował:",
  "factor.learningNote":
    "Błąd staje się daną: ten wynik zapisuje się w wiedzy o czynnikach i trafia do kolejnych analiz.",
  "factor.undoClose": "Wycofaj zamknięcie",
  "factor.outcomeStatusLegend": "Status wyniku",
  "factor.whichFactor": "Który czynnik zadziałał albo zawiódł?",
  "factor.dontKnow": "Jeszcze nie wiem",
  "factor.whatHappened": "Co się wydarzyło (opis)",
  "factor.whatHappenedPlaceholder":
    "np. Zarząd przyjął wniosek, ale termin posiedzenia był późniejszy.",
  "factor.closeWithOutcome": "Zamknij wątek wynikiem",
  "factor.newFactor": "Nowy czynnik",
  "factor.newFactorPlaceholder": "np. Brak umowy z wykonawcą na etapie ofert",
  "factor.categoryLabel": "Kategoria",
  "factor.add": "Dodaj czynnik",
  "factor.addManual": "+ Dodaj czynnik ręcznie",
  "factor.engineFooter":
    "Treść Karty Czynników wygenerował silnik regułowy na podstawie tekstu komunikatu. AI nie podejmuje decyzji - pokazuje propozycje z uzasadnieniem i miejscem na sprzeciw.",

  // --- Reakcje --------------------------------------------------------------
  "reaction.agree": "Zgoda",
  "reaction.doubt": "Wątpliwość",
  "reaction.evidence": "Dowód",
  "reaction.agreeHint": "Zgadzam się z argumentem",
  "reaction.doubtHint": "Mam wątpliwość, chcę dopytać",
  "reaction.evidenceHint": "Mam źródło lub pomiar",
  "reaction.evidenceLabel": "Reakcja Dowód wymaga źródła lub krótkiego uzasadnienia",
  "reaction.evidencePlaceholder": "np. Umowa z ul. Dąbowa 14/2025, strona 6",
  "reaction.submit": "Zareaguj Dowodem",
  "reaction.cancel": "Anuluj",
  "reaction.hint": "Podaj konkretne źródło, dokument, pomiar lub datę (min. 8 znaków).",
  "reaction.yourEvidence": "Twój dowód:",

  // --- Odpowiedzi -----------------------------------------------------------
  "reply.title": "Odpowiedzi ({count})",
  "reply.open": "Odpowiedz",
  "reply.cancel": "Anuluj",
  "reply.label": "Twoja odpowiedź",
  "reply.placeholder": "Odpowiedz, dopytaj o dowód albo wskaż, który czynnik to potwierdza.",
  "reply.isFactor": "Ta odpowiedź jest czynnikiem (opcjonalnie)",
  "reply.notFactor": "To nie jest czynnik",
  "reply.submit": "Dodaj odpowiedź",
  "reply.factorBadge": "Czynnik: {text}",
  "reply.empty": "Brak odpowiedzi. Możesz zadać pytanie o dowód albo wskazać czynnik.",

  // --- Sterowanie feedem ---------------------------------------------------
  "controls.title": "Ustawienia feedu",
  "controls.intro": "Tryb i proporcje decydują, co widzisz. Zmiana działa od razu i zostaje zapamiętana.",
  "controls.modeLabel": "Tryb feedu",
  "controls.mode.chronological": "Chronologiczny",
  "controls.mode.chronologicalHint": "Sortowanie po dacie - wybór ustawiony przez Ciebie (wola).",
  "controls.mode.topical": "Tematyczny",
  "controls.mode.topicalHint":
    "Grupowanie wg tematów, w ramach tematu kolejność wg jakości argumentacji.",
  "controls.mode.balance": "Równowaga",
  "controls.mode.balanceHint":
    "Mieszanka Twojego kręgu i wysokiej jakości argumentacji z innych kręgów.",
  "controls.sliderLabel": "Suwak Wola ⟷ Myśl",
  "controls.percent": "{wola}% wola · {mysl}% myśl",
  "controls.sliderValueText": "{wola} procent woli, {mysl} procent myśli",
  "controls.moreWill": "Więcej woli",
  "controls.moreThought": "Więcej myśli",
  "controls.sliderDesc":
    "Wola to Twój krąg zaufania i wolność wyboru widoczności. Myśl to wkład w argumentację: czynniki z dowodami, odpowiedzi i udział w głosowaniu.",
  "controls.sliderInactive": "Suwak działa w trybie „Równowaga”.",
  "controls.sliderEnable": "Włącz tryb Równowaga",
  "controls.balanceIndex": "Wskaźnik Równowagi",
  "controls.will": "W - Wola",
  "controls.thought": "M - Myśl",
  "controls.balanceStats":
    "Ginij zasięgu {gini} · uczestnicy {participants} · udział dowodów {evidence}%. Wskaźnik odświeża się przy każdej zmianie danych w tej przeglądarce.",

  // --- Grupy ---------------------------------------------------------------
  "groups.title": "Grupy",
  "groups.intro":
    "Każda grupa ma własne reguły i własny Wskaźnik Równowagi. Zasady obowiązują tylko wewnątrz grupy - nie ma jednej reguły globalnej.",
  "groups.moderation": "moderacja {level}",
  "groups.join": "Dołącz",
  "groups.member": "Członek",
  "groups.leave": "Opuść grupę",
  "groups.joinGroup": "Dołącz do grupy",
  "groups.will": "Wola",
  "groups.thought": "Myśl",
  "groups.posts": "Komunikaty",
  "groups.rules": "Reguły grupy",
  "groups.meta": "{count} członków · założył {founder}",

  "group.notFound": "Nie znaleziono tej grupy",
  "group.notFoundText": "Grupa o adresie {slug} nie istnieje w tej sesji.",
  "group.back": "Wróć do listy grup",
  "group.breadcrumb": "Ścieżka nawigacji",
  "group.tabsLabel": "Sekcje grupy",
  "group.tabThread": "Wątek",
  "group.tabRules": "Reguły grupy",
  "group.tabIndex": "Wskaźnik Równowagi",
  "group.empty": "W tej grupie nie ma jeszcze komunikatów.",
  "group.rulesIntro":
    "Zasady ustalił założyciel grupy. Zmiana reguł jest odnotowywana w historii grupy.",
  "group.history": "Historia grupy",
  "group.historyFounded": "{time} - {name} założył grupę.",
  "group.historyRules": "{time} - ustalono reguły i poziom moderacji: {level}.",
  "group.indexTitle": "Wskaźnik Równowagi grupy",
  "group.indexIntro":
    "Dwa wymiary: W (wola) i M (myśl). Odchylenie od równowagi pokazuje, co warto poprawić. System sugeruje, nie nakazuje.",
  "group.willDesc": "Różnorodność źródeł, swoboda ustawień widoczności, niski udział usuniętych treści.",
  "group.thoughtDesc":
    "Równomierność zasięgu, udział różnych uczestników w dyskusji, udział argumentów z dowodami.",
  "group.suggestion": "Sugestia systemu:",
  "group.meta": "{topic} · moderacja {level} · {count} członków",
  "group.giniLabel": "Ginij zasięgu",
  "group.giniHint": "0 = zasięg idealnie równy",
  "group.participantsLabel": "Uczestnicy",
  "group.participantsHint": "osób w dyskusji grupy",
  "group.evidenceLabel": "Udział dowodów",
  "group.evidenceHint": "reakcji typu Dowód",

  // --- Wyszukiwarka ---------------------------------------------------------
  "search.title": "Szukaj",
  "search.intro":
    "Podstawowa wyszukiwarka komunikatów, osób i grup. Wyszukiwanie działa lokalnie, na danych tej sesji.",
  "search.label": "Szukaj w TASK",
  "search.placeholder": "Szukaj: remont, energia, dowód, Tomasz...",
  "search.scopeLabel": "Zakres wyszukiwania",
  "search.scopeAll": "Wszystko",
  "search.scopePosts": "Komunikaty",
  "search.scopePeople": "Osoby",
  "search.scopeGroups": "Grupy",
  "search.emptyHint": "Wpisz frazę, aby przeszukać komunikaty, osoby i grupy.",
  "search.noResults": "Brak wyników dla „{query}”.",
  "search.people": "Osoby ({count})",
  "search.groups": "Grupy ({count})",
  "search.posts": "Komunikaty ({count})",
  "search.rankLabel": "Wynik wyszukiwania",
  "search.rankDetail": "Komunikat pasuje do frazy „{query}”.",
  "search.lastUpdate": "Ostatnia aktualizacja danych: {time}",

  // --- Powiadomienia --------------------------------------------------------
  "notifications.title": "Powiadomienia",
  "notifications.intro":
    "Powiadomienia w aplikacji. W wersji serwisowej doszedłby e-mail z konfigurowalnymi kanałami.",
  "notifications.markAll": "Oznacz wszystkie jako przeczytane ({count})",
  "notifications.empty": "Brak powiadomień.",
  "notifications.goToThread": "Przejdź do wątku",
  "notifications.markRead": "Przeczytane",
  "notification.reaction": "Reakcja",
  "notification.reply": "Odpowiedź",
  "notification.group": "Grupa",
  "notification.outcome": "Wynik",
  "notification.report": "Zgłoszenie",
  "notification.reportAccepted":
    "Twoje zgłoszenie zostało przyjęte. Autor otrzyma informację o powodzie rozpatrzenia.",

  // --- Moderacja ------------------------------------------------------------
  "moderation.title": "Moderacja",
  "moderation.intro":
    "Zgłoszenia treści i podstawowa moderacja. Moderacja ogranicza się do prawa i jawnych zasad grupy - treści legalne nie są usuwane za samą wypowiedź.",
  "moderation.filterLabel": "Filtr zgłoszeń",
  "moderation.filterAll": "Wszystkie ({count})",
  "moderation.filterPending": "Oczekujące ({count})",
  "moderation.filterAccepted": "Przyjęte",
  "moderation.filterRejected": "Odrzucone",
  "moderation.empty": "Brak zgłoszeń w tej kategorii.",
  "moderation.noDetails": "Bez szczegółów zgłoszenia.",
  "moderation.reportedBy": "Zgłosił {name} ·",
  "moderation.decisionNote": "Notatka decyzji:",
  "moderation.accept": "Przyjmij",
  "moderation.reject": "Odrzuć",
  "moderation.acceptNote":
    "Zgłoszenie przyjęte do wiadomości, autor otrzymał informację o powodzie.",
  "moderation.rejectNote":
    "Treść nie narusza prawa ani jawnych zasad grupy - zgłoszenie odrzucone.",
  "moderation.rulesTitle": "Zasady moderacji w tej wersji",
  "moderation.rule1":
    "Zgłoszenie rozpatrywane jest w ciągu 48 godzin, a autor dowiaduje się o powodzie.",
  "moderation.rule2":
    "Notatki społeczności (kontekst dodany przez użytkowników o różnych poglądach) są w MVP konceptem - wskazane w PRD jako „powinno być”.",
  "moderation.rule3":
    "Decyzje grupowe nad wariantem syntezy działają w Kacie Czynników przy wariancie.",

  // --- Profil ---------------------------------------------------------------
  "profile.stats":
    "{posts} komunikatów · {cards} z Kartą Czynników · {closed} zamkniętych wynikiem · obserwujesz {following} osób · krąg zaufania: {circle}",
  "profile.knowledgeTitle": "Wiedza o czynnikach",
  "profile.knowledgeIntro":
    "Wątki zamknięte wynikiem uczą profil, który czynnik działa, a który zawodzi. Błąd staje się daną, a nie powtórką.",
  "profile.knowledgeEmpty":
    "Jeszcze nie zamknięto wątku z wskazanym czynnikiem. Zamknij komunikat wynikiem, żeby zbudować tę wiedzę.",
  "profile.settingsTitle": "Twoje ustawienia",
  "profile.feedMode": "Tryb feedu",
  "profile.slider": "Suwak Wola ⟷ Myśl",
  "profile.balance": "Wskaźnik Równowagi (cały feed)",
  "profile.export": "Eksportuj moje dane (JSON)",
  "profile.resetYes": "Tak, usuń zmiany",
  "profile.reset": "Usuń moje dane z tej przeglądarki",
  "profile.cancel": "Anuluj",
  "profile.cardsTitle": "Twoje Karty Czynników",
  "profile.cardMeta": "Tryb {mode} · {count} czynników",
  "profile.cardMetaVariants": " · {count} warianty",
  "profile.open": "Otwarty",

  // --- Etykiety danych -----------------------------------------------------
  "label.category.zasoby": "Zasoby",
  "label.category.ryzyka": "Ryzyka",
  "label.category.zaleznosci": "Zależności",
  "label.category.zalozenia": "Założenia",
  "label.category.odbiorcy": "Odbiorcy",
  "label.category.czas": "Czas",
  "label.status.planuje": "Planuję",
  "label.status.robię": "Robię",
  "label.status.zrobiłem": "Zrobiłem",
  "label.status.przerwałem": "Przerwałem",
  "label.visibility.public": "Publiczny",
  "label.visibility.circle": "Krąg zaufania",
  "label.visibility.private": "Tylko ja",
  "label.outcome.potwierdzone": "Potwierdzone",
  "label.outcome.czesciowo": "Częściowo",
  "label.outcome.obalone": "Obalone",
  "label.reaction.zgoda": "Zgoda",
  "label.reaction.watpliwosc": "Wątpliwość",
  "label.reaction.dowod": "Dowód",
  "label.reportReason.prawo": "Narusza prawo",
  "label.reportReason.zasady-grupy": "Łamie zasady grupy",
  "label.reportReason.spam": "Spam lub reklama",
  "label.reportReason.przemoc": "Przemoc lub mowa nienawiści",
  "label.reportReason.inne": "Inne",
  "label.reportStatus.oczekuje": "Oczekuje",
  "label.reportStatus.przyjeta": "Przyjęte",
  "label.reportStatus.odrzucona": "Odrzucone",
  "label.moderation.lekka": "lekka",
  "label.moderation.standardowa": "standardowa",
  "label.moderation.ścieła": "ścisła",
  "label.role.czlonek": "członek",
  "label.role.moderator": "moderator",
  "label.role.zalozyciel": "założyciel",
  "label.topic.Miasto": "Miasto",
  "label.topic.Energia": "Energia",
  "label.topic.Edukacja": "Edukacja",
  "label.topic.Produkt": "Produkt",
  "label.topic.Zdrowie": "Zdrowie",
  "label.topic.Technologia": "Technologia",
  "label.noTopic": "Bez tematu",

  // --- Silnik czynnikow (teksty generowane) --------------------------------
  "engine.analysisResult": "Wynik analizy: {text}",
  "engine.synthesisResult": "Wynik syntezy z {count} czynników: {text}",
  "engine.contradiction":
    "{first} ma wagę {weight}, ale pewność tylko {confidence}, podczas gdy {second} jest pewne na {secondConfidence}. Jedno z dwóch założeń może być błędne.",
  "engine.contradictionSingle":
    "{category}: waga {weight} przy pewności {confidence} - to czynnik krytyczny, testuj go najpierw.",
  "engine.variantFirst": "Najpierw: {category}",
  "engine.variantFirstDesc":
    "Zanim przejdziesz dalej, sprawdź czynnik „{description}”. Dopóki pewność wynosi {confidence}, a waga {weight}, decyzja oparta na tej hipotezie jest ryzykowna.",
  "engine.variantFirstJust":
    "Czynnik o najwyższej wadze ma najniższą pewność ({confidence}/5). Testowanie go przed działaniem zastępuje metodę prób i błędów.",
  "engine.variantStrong": "Wariant oparty na najmocniejszych czynnikach",
  "engine.variantStrongDesc":
    "Postaw na to, co już jest potwierdzone: {names}. Ogranicz zakres zmiany do jednego kroku i zmierz wynik w rozumieniu odbiorców.",
  "engine.variantStrongJustEvidence":
    "Wariant opiera się na {count} czynnikach z dowodem. Uzasadnienie: im wyższa pewność, tym mniejsze ryzyko zmarnowania nakładu.",
  "engine.variantStrongJustNone":
    "Żaden czynnik nie ma jeszcze dowodu, dlatego wariant zakłada jeden pomiar kontrolny zamiast pełnego wdrożenia.",
  "engine.variantCheap": "Wariant najtańszy do sprawdzenia",
  "engine.variantCheapDesc":
    "Zrób tylko to, co widać w komunikacie: „{text}”. Resztę zostaw do następnej iteracji.",
  "engine.variantCheapJust":
    "Przy rozproszonych czynnikach największym kosztem jest niepewność, nie środki. Krok o małym koszcie daje dane do następnej syntezy.",
  "engine.gapFallback": "Brak - uzupelnij",
  "engine.factorDesc.zasoby": "Dostępność zasobów (budżet, czas, ludzie) na realizację",
  "engine.factorDesc.ryzyka": "Ryzyka, które mogą przerwać lub przesunąć działanie",
  "engine.factorDesc.zaleznosci": "Zależności od decyzji lub podmiotów zewnętrznych",
  "engine.factorDesc.zalozenia": "Założenia, na których opiera się cały wniosek",
  "engine.factorDesc.odbiorcy": "Kto realnie skorzysta lub zadecyduje (odbiorcy decyzji)",
  "engine.factorDesc.czas": "Ramy czasowe, w których decyzja musi zapaść",
  "engine.evidenceHint.zasoby": "Brak - podaj konkretny budżet lub zasób",
  "engine.evidenceHint.ryzyka": "Brak - wskaż, które ryzyko jest najbardziej realne",
  "engine.evidenceHint.zaleznosci": "Brak - sprawdź, kto decyduje i w jakim terminie",
  "engine.evidenceHint.zalozenia":
    "Brak - założenie bez danych to najczęstsza przyczyna błędnej decyzji",
  "engine.evidenceHint.odbiorcy": "Brak - podaj liczbę zainteresowanych i sposób ich zasięgnięcia",
  "engine.evidenceHint.czas": "Brak - podaj konkretną datę graniczną",

  // --- Wskaznik rownowagi ---------------------------------------------------
  "balance.suggestion.empty": "Brak danych do policzenia wskaznika.",
  "balance.suggestion.dominant":
    "Dyskusje zdominowalo kilka glosow - zapros nowe osoby albo wlac glosowanie nad wariantem.",
  "balance.suggestion.restrictive":
    "Zasady dyskusji mocno ograniczaja swobode - rozwaz ich zlagodzenie, zanim wlaczycsz kolejne warianty.",
  "balance.suggestion.balanced":
    "Feed jest w rownowagi: obie strony maja porowny udzial w dyskusji.",

  // --- Ranking --------------------------------------------------------------
  "rank.chrono": "Chronologicznie",
  "rank.chronoDetail": "Sortowanie według czasu publikacji, według ustawienia woli (PRD 8.1).",
  "rank.group": "Grupa: {name}",
  "rank.groupDetail": "Komunikat pochodzi z grupy, do której należysz.",
  "rank.groupPublished": "Komunikat opublikowany w grupie, do której należysz.",
  "rank.topic": "Temat: {topic}",
  "rank.topicDetail": "W feedzie tematycznym komunikaty grupują się według tematu.",
  "rank.card": "Karta Czynników ({count} czynników)",
  "rank.cardDetail":
    "Komunikat ma rozwiniętą analizę czynników, więc wypiera słabszą argumentację w temacie.",
  "rank.evidenceArgs": "Argumentacja z dowodami ({count})",
  "rank.evidenceArgsDetail":
    "Czynniki mają podpięte dowody, więc wnoszą realny wkład do przestrzeni myśli.",
  "rank.evidenceArgsEmpty":
    "Karta Czynników jest rozwinięta, ale czynniki nie mają jeszcze dowodów.",
  "rank.evidenceReactions": "{count} reakcji Dowód",
  "rank.evidenceReactionsDetail":
    "Uczestnicy wskazali konkretne źródła, co podnosi jakość wątku.",
  "rank.repliesCount": "{count} odpowiedzi",
  "rank.repliesDetail": "Wątek angażuje więcej niż jedną osobę.",
  "rank.equalReach": "Równy zasięg bazowy",
  "rank.equalReachDetail":
    "Nowy komunikat dostaje minimalną, równą pulę wyświetleń w kręgu.",
  "rank.lowReach": "Niski zasięg bazowy",
  "rank.lowReachDetail":
    "Komunikat ma mało reakcji i odpowiedzi, więc właściciel feedu daje mu niewielki priorytet.",
  "rank.circle": "Z Twojego kręgu zaufania",
  "rank.circleDetail":
    "Komunikat osoby, którą wskazałeś jako zaufaną. To wkład Twojej przestrzeni woli.",
  "rank.following": "Obserwujesz tego autora",
  "rank.followingDetail": "Komunikat osoby z Twojej listy obserwowanych.",
  "rank.searchResult": "Wynik wyszukiwania",

  // --- Metadane strony -----------------------------------------------------
  "meta.title": "TASK - Myśl i działaj świadomie, razem",
  "meta.description":
    "TASK to portal komunikatów, które łączą warstwę myśli i warstwę czynu, z silnikiem analizy czynników zamiast metodą prób i błędów.",

  // --- Czas -----------------------------------------------------------------
  "time.justNow": "przed chwilą",
  "time.minute.one": "minuta",
  "time.minute.few": "minuty",
  "time.minute.many": "minut",
  "time.hour.one": "godzina",
  "time.hour.few": "godziny",
  "time.hour.many": "godzin",
  "time.ago": "{count} {unit} temu",
  "time.yesterday": "wczoraj",
  "time.day.one": "dzień",
  "time.day.few": "dni",
  "time.day.many": "dni",
} as const;

export type TranslationKey = keyof typeof pl;
export type Dictionary = Record<TranslationKey, string>;
