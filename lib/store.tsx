"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useReducer,
  useRef,
  useSyncExternalStore,
  type ReactNode,
} from "react";
import { seedState } from "./data";
import { createCard } from "./engine";
import { localizeState } from "./i18n/localize";
import { useI18n } from "./i18n/provider";
import type {
  ActionStatus,
  AppNotification,
  CardMode,
  Factor,
  ID,
  Outcome,
  ReactionKind,
  ReportReason,
  StoreState,
  Visibility,
} from "./types";
import { uid } from "./utils";

const STORAGE_KEY = "task-mvp-state-v1";

export interface NewPostInput {
  mysl: string;
  czyn?: string;
  status?: ActionStatus;
  visibility: Visibility;
  groupId?: ID;
  topic?: string;
  withCard: boolean;
  cardMode: CardMode;
}

type Action =
  | { type: "hydrate"; state: StoreState }
  | { type: "reset" }
  | { type: "setFeedMode"; mode: StoreState["feedMode"] }
  | { type: "setBalance"; balance: number }
  | { type: "addPost"; post: StoreState["posts"][number]; card?: StoreState["cards"][number] }
  | { type: "addReaction"; postId: ID; kind: ReactionKind; evidence?: string }
  | { type: "addReply"; postId: ID; body: string; factorId?: ID }
  | { type: "addFactor"; cardId: ID; factor: Factor }
  | { type: "updateFactor"; cardId: ID; factorId: ID; patch: Partial<Factor> }
  | { type: "removeFactor"; cardId: ID; factorId: ID }
  | { type: "setOutcome"; cardId: ID; outcome: Outcome; factorId?: ID; note?: string }
  | { type: "voteVariant"; cardId: ID; variantId: ID; userId: ID }
  | { type: "toggleMembership"; groupId: ID }
  | { type: "markNotificationsRead" }
  | { type: "markNotificationRead"; id: ID }
  | { type: "reportPost"; postId: ID; reason: ReportReason; details?: string }
  | { type: "resolveReport"; reportId: ID; status: "przyjeta" | "odrzucona"; note?: string }
  | { type: "toggleFollow"; userId: ID }
  | { type: "toggleCircle"; userId: ID };

function reducer(state: StoreState, action: Action): StoreState {
  switch (action.type) {
    case "hydrate":
      return action.state;
    case "reset":
      return { ...seedState, users: seedState.users.map((u) => ({ ...u })) };
    case "setFeedMode":
      return { ...state, feedMode: action.mode };
    case "setBalance":
      return { ...state, balance: Math.min(100, Math.max(0, action.balance)) };
    case "addPost":
      return {
        ...state,
        posts: [action.post, ...state.posts],
        cards: action.card ? [action.card, ...state.cards] : state.cards,
      };
    case "addReaction": {
      const existing = state.reactions.find(
        (r) => r.postId === action.postId && r.userId === state.currentUserId,
      );
      const reactions = existing
        ? state.reactions.map((r) =>
            r.id === existing.id
              ? { ...r, kind: action.kind, evidence: action.evidence, createdAt: new Date().toISOString() }
              : r,
          )
        : [
            ...state.reactions,
            {
              id: uid("r"),
              postId: action.postId,
              userId: state.currentUserId,
              kind: action.kind,
              evidence: action.evidence,
              createdAt: new Date().toISOString(),
            },
          ];
      return { ...state, reactions };
    }
    case "addReply":
      return {
        ...state,
        replies: [
          ...state.replies,
          {
            id: uid("rp"),
            postId: action.postId,
            authorId: state.currentUserId,
            body: action.body,
            createdAt: new Date().toISOString(),
            factorId: action.factorId,
          },
        ],
      };
    case "addFactor":
      return {
        ...state,
        cards: state.cards.map((c) =>
          c.id === action.cardId ? { ...c, factors: [...c.factors, action.factor] } : c,
        ),
      };
    case "updateFactor":
      return {
        ...state,
        cards: state.cards.map((c) =>
          c.id === action.cardId
            ? {
                ...c,
                factors: c.factors.map((f) =>
                  f.id === action.factorId ? { ...f, ...action.patch } : f,
                ),
              }
            : c,
        ),
      };
    case "removeFactor":
      return {
        ...state,
        cards: state.cards.map((c) =>
          c.id === action.cardId
            ? { ...c, factors: c.factors.filter((f) => f.id !== action.factorId) }
            : c,
        ),
      };
    case "setOutcome":
      return {
        ...state,
        cards: state.cards.map((c) =>
          c.id === action.cardId
            ? {
                ...c,
                outcome: action.outcome,
                outcomeFactorId: action.factorId,
                outcomeNote: action.note,
              }
            : c,
        ),
      };
    case "voteVariant":
      return {
        ...state,
        cards: state.cards.map((c) => {
          if (c.id !== action.cardId) return c;
          return {
            ...c,
            variants: c.variants.map((v) => {
              if (v.id !== action.variantId) return v;
              const has = v.votes.includes(action.userId);
              return {
                ...v,
                votes: has ? v.votes.filter((u) => u !== action.userId) : [...v.votes, action.userId],
              };
            }),
          };
        }),
      };
    case "toggleMembership":
      return {
        ...state,
        memberships: {
          ...state.memberships,
          [action.groupId]: !state.memberships[action.groupId],
        },
      };
    case "markNotificationsRead":
      return {
        ...state,
        notifications: state.notifications.map((n) => ({ ...n, read: true })),
      };
    case "markNotificationRead":
      return {
        ...state,
        notifications: state.notifications.map((n) =>
          n.id === action.id ? { ...n, read: true } : n,
        ),
      };
    case "reportPost":
      return {
        ...state,
        reports: [
          {
            id: uid("rep"),
            postId: action.postId,
            reporterId: state.currentUserId,
            reason: action.reason,
            details: action.details,
            status: "oczekuje",
            createdAt: new Date().toISOString(),
          },
          ...state.reports,
        ],
        notifications: [
          {
            id: uid("n"),
            kind: "zgłoszenie",
            text: "Twoje zgłoszenie zostało przyjęte. Autor otrzyma informację o powodzie rozpatrzenia.",
            createdAt: new Date().toISOString(),
            read: false,
            postId: action.postId,
          },
          ...state.notifications,
        ],
      };
    case "resolveReport":
      return {
        ...state,
        reports: state.reports.map((r) =>
          r.id === action.reportId
            ? { ...r, status: action.status, resolutionNote: action.note }
            : r,
        ),
      };
    case "toggleFollow":
      return {
        ...state,
        users: state.users.map((u) =>
          u.id === action.userId
            ? {
                ...u,
                following: u.following.includes(action.userId)
                  ? u.following.filter((x) => x !== action.userId)
                  : [...u.following, action.userId],
              }
            : u,
        ),
      };
    case "toggleCircle":
      return {
        ...state,
        users: state.users.map((u) =>
          u.id === action.userId
            ? {
                ...u,
                circle: u.circle.includes(action.userId)
                  ? u.circle.filter((x) => x !== action.userId)
                  : [...u.circle, action.userId],
              }
            : u,
        ),
      };
    default:
      return state;
  }
}

export interface StoreApi {
  /** Stan kanoniczny (polski seed + zmiany uzytkownika) - zapisywany w localStorage. */
  state: StoreState;
  /** Widok danych w biezacym jezyku - do renderowania. */
  view: StoreState;
  hydrated: boolean;
  setFeedMode: (mode: StoreState["feedMode"]) => void;
  setBalance: (balance: number) => void;
  createPost: (input: NewPostInput) => ID;
  react: (postId: ID, kind: ReactionKind, evidence?: string) => void;
  reply: (postId: ID, body: string, factorId?: ID) => void;
  addFactor: (cardId: ID, factor: Omit<Factor, "id" | "createdAt" | "source">) => void;
  updateFactor: (cardId: ID, factorId: ID, patch: Partial<Factor>) => void;
  removeFactor: (cardId: ID, factorId: ID) => void;
  closeOutcome: (cardId: ID, outcome: Outcome, factorId?: ID, note?: string) => void;
  voteVariant: (cardId: ID, variantId: ID) => void;
  toggleMembership: (groupId: ID) => void;
  markNotificationsRead: () => void;
  markNotificationRead: (id: ID) => void;
  reportPost: (postId: ID, reason: ReportReason, details?: string) => void;
  resolveReport: (
    reportId: ID,
    status: "przyjeta" | "odrzucona",
    note?: string,
  ) => void;
  reset: () => void;
  currentUser: StoreState["users"][number];
}

const StoreContext = createContext<StoreApi | null>(null);

const subscribeToNothing = () => () => {};

/**
 * Znacznik "po nawodnieniu" (po stronie klienta).
 *
 * useSyncExternalStore zwraca false podczas renderu na serwerze i true w
 * przegladarce, dzieki czemu odczyt localStorage wykonuje sie dopiero po
 * nawodnieniu, bez setState wewnatrz efektu.
 */
function useIsHydrated(): boolean {
  return useSyncExternalStore(
    subscribeToNothing,
    () => true,
    () => false,
  );
}

export function StoreProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(reducer, seedState);
  const hydrated = useIsHydrated();
  const loadedRef = useRef(false);
  const { locale } = useI18n();

  // Widok w biezacym jezyku - renderowanie; kanoniczny `state` zostaje w localStorage.
  const view = useMemo(() => localizeState(state, locale), [state, locale]);

  useEffect(() => {
    if (!hydrated) return;

    // Pierwsze uruchomienie: wczytaj zapisany stan. Zapis jest wstrzymany do
    // konca tego przebiegu, inaczej nadpisalibysmy dane od razu po odczycie.
    if (!loadedRef.current) {
      loadedRef.current = true;
      try {
        const raw = window.localStorage.getItem(STORAGE_KEY);
        if (raw) {
          const parsed = JSON.parse(raw) as StoreState;
          if (parsed && Array.isArray(parsed.posts) && Array.isArray(parsed.users)) {
            dispatch({ type: "hydrate", state: parsed });
            return;
          }
        }
      } catch {
        /* uszkodzony zapis - zostajemy przy danych startowych */
      }
    }

    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    } catch {
      /* brak miejsca - stan zostaje tylko w pamieci sesji */
    }
  }, [state, hydrated]);

  const createPost = useCallback(
    (input: NewPostInput): ID => {
      const postId = uid("p");
      const now = new Date().toISOString();
      const card = input.withCard
        ? createCard(
            postId,
            input.cardMode,
            {
              mysl: input.mysl,
              czyn: input.czyn,
              topic: input.topic,
            },
            Date.now(),
            locale,
          )
        : undefined;
      dispatch({
        type: "addPost",
        post: {
          id: postId,
          authorId: seedState.currentUserId,
          mysl: input.mysl,
          czyn: input.czyn?.trim() ? input.czyn.trim() : undefined,
          status: input.status,
          visibility: input.visibility,
          groupId: input.groupId,
          topic: input.topic,
          createdAt: now,
          factorCardId: card?.id,
        },
        card,
      });
      return postId;
    },
    [locale],
  );

  const api = useMemo<StoreApi>(() => {
    const currentUser =
      view.users.find((u) => u.id === view.currentUserId) ?? view.users[0];
    return {
      state,
      view,
      hydrated,
      setFeedMode: (mode) => dispatch({ type: "setFeedMode", mode }),
      setBalance: (balance) => dispatch({ type: "setBalance", balance }),
      createPost,
      react: (postId, kind, evidence) =>
        dispatch({ type: "addReaction", postId, kind, evidence }),
      reply: (postId, body, factorId) =>
        dispatch({ type: "addReply", postId, body, factorId }),
      addFactor: (cardId, factor) =>
        dispatch({
          type: "addFactor",
          cardId,
          factor: { ...factor, id: uid("f"), createdAt: new Date().toISOString(), source: "uzytkownik" },
        }),
      updateFactor: (cardId, factorId, patch) =>
        dispatch({ type: "updateFactor", cardId, factorId, patch }),
      removeFactor: (cardId, factorId) => dispatch({ type: "removeFactor", cardId, factorId }),
      closeOutcome: (cardId, outcome, factorId, note) =>
        dispatch({ type: "setOutcome", cardId, outcome, factorId, note }),
      voteVariant: (cardId, variantId) =>
        dispatch({ type: "voteVariant", cardId, variantId, userId: view.currentUserId }),
      toggleMembership: (groupId) => dispatch({ type: "toggleMembership", groupId }),
      markNotificationsRead: () => dispatch({ type: "markNotificationsRead" }),
      markNotificationRead: (id) => dispatch({ type: "markNotificationRead", id }),
      reportPost: (postId, reason, details) =>
        dispatch({ type: "reportPost", postId, reason, details }),
      resolveReport: (reportId, status, note) =>
        dispatch({ type: "resolveReport", reportId, status, note }),
      reset: () => dispatch({ type: "reset" }),
      currentUser,
    };
  }, [state, view, hydrated, createPost]);

  return <StoreContext.Provider value={api}>{children}</StoreContext.Provider>;
}

export function useStore(): StoreApi {
  const ctx = useContext(StoreContext);
  if (!ctx) throw new Error("useStore musi byc uzyty wewnatrz StoreProvider");
  return ctx;
}

export function useCurrentUser() {
  return useStore().currentUser;
}

export type { AppNotification };
