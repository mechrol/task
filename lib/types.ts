export type ID = string;

/** Jezyk interfejsu i tresci przykładowej. Domyslnie polski. */
export type Locale = "pl" | "en";

export type Visibility = "public" | "circle" | "private";
export type ActionStatus = "planuje" | "robię" | "zrobiłem" | "przerwałem";
export type ReactionKind = "zgoda" | "watpliwosc" | "dowod";
export type Outcome = "potwierdzone" | "czesciowo" | "obalone";
export type FeedMode = "chronologiczny" | "tematyczny" | "rownowaga";
export type FactorCategory =
  | "zasoby"
  | "ryzyka"
  | "zaleznosci"
  | "zalozenia"
  | "odbiorcy"
  | "czas";
export type FactorSource = "silnik" | "uzytkownik" | "odpowiedz";
export type CardMode = "A" | "B";
export type NotificationKind = "reakcja" | "odpowiedz" | "grupa" | "wynik" | "zgłoszenie";
export type ReportStatus = "oczekuje" | "przyjeta" | "odrzucona";
export type ReportReason =
  | "prawo"
  | "zasady-grupy"
  | "spam"
  | "przemoc"
  | "inne";

export interface User {
  id: ID;
  handle: string;
  name: string;
  initials: string;
  hue: string;
  bio: string;
  verified: boolean;
  role: "czlonek" | "moderator" | "zalozyciel";
  following: ID[];
  circle: ID[];
}

export interface Post {
  id: ID;
  authorId: ID;
  mysl: string;
  czyn?: string;
  status?: ActionStatus;
  visibility: Visibility;
  groupId?: ID;
  topic?: string;
  createdAt: string;
  factorCardId?: ID;
  edited?: boolean;
}

export interface Factor {
  id: ID;
  category: FactorCategory;
  description: string;
  weight: number; // 1-5 waga
  confidence: number; // 1-5 pewnosc
  evidence?: string; // link / obserwacja / brak
  source: FactorSource;
  createdAt: string;
}

export interface SynthesisVariant {
  id: ID;
  title: string;
  description: string;
  justification: string;
  factorIds: ID[];
  votes: ID[];
}

export interface FactorCard {
  id: ID;
  postId: ID;
  mode: CardMode;
  synthesis?: string;
  factors: Factor[];
  variants: SynthesisVariant[];
  outcome?: Outcome;
  outcomeFactorId?: ID;
  outcomeNote?: string;
  createdAt: string;
}

export interface Reaction {
  id: ID;
  postId: ID;
  userId: ID;
  kind: ReactionKind;
  evidence?: string;
  createdAt: string;
}

export interface Reply {
  id: ID;
  postId: ID;
  authorId: ID;
  body: string;
  createdAt: string;
  factorId?: ID;
}

export interface Group {
  id: ID;
  slug: string;
  name: string;
  description: string;
  topic: string;
  rules: string[];
  moderationLevel: "lekka" | "standardowa" | "ścieła";
  memberIds: ID[];
  createdAt: string;
}

export interface AppNotification {
  id: ID;
  kind: NotificationKind;
  text: string;
  createdAt: string;
  read: boolean;
  postId?: ID;
  actorId?: ID;
  groupId?: ID;
}

export interface Report {
  id: ID;
  postId: ID;
  reporterId: ID;
  reason: ReportReason;
  details?: string;
  status: ReportStatus;
  createdAt: string;
  resolutionNote?: string;
}

export interface StoreState {
  users: User[];
  groups: Group[];
  posts: Post[];
  cards: FactorCard[];
  reactions: Reaction[];
  replies: Reply[];
  notifications: AppNotification[];
  reports: Report[];
  currentUserId: ID;
  feedMode: FeedMode;
  balance: number; // 0 = 100% mysl, 100 = 100% wola
  memberships: Record<ID, boolean>;
}

export interface RankReason {
  label: string;
  detail: string;
  source: "wola" | "mysl" | "neutral";
}
