# MVP PRD: Thunder Access News Messages (TASK)

*Version 0.1 · product document for the Foxora AI environment · language: English*

## 1. Vision and Summary

**TASK** is a social platform built around one simple gesture: the user publishes a **message** that combines two classic forms:

- **"What's on your mind?"** (the Facebook idea) – a space for reflection, opinions, arguments and relationships.
- **"What are you doing?"** (the Twitter/X idea) – a space for short, live updates about action, in real time.

What sets TASK apart from existing networks: it is not just a channel for posting. It is a **tool for making better decisions** – it replaces the "trial and error" method with **factor analysis** (analysis through synthesis and synthesis through analysis) and helps maintain **a balance between the space of will (freedom – liberalism) and the space of thought (equality – democracy)**.

**Product tagline:** *Think and act consciously – together.*

## 2. Problem

1. Facebook favors long discussions but loses action and conclusion; Twitter/X favors speed but loses context and argumentation.
2. Users and teams learn by trial and error: they act, see the failure, and correct. This is costly and leaves no trace of knowledge.
3. Engagement algorithms favor emotion over the quality of arguments. Freedom of speech collides with equality of voice: either a loud minority dominates, or moderation restricts freedom.

## 3. MVP Goals

| Goal | Success measure (first 90 days) |
|---|---|
| Prove that a message combining thought and action is appealing | ≥ 40% of active users publish ≥ 1 message per week |
| Prove that factor analysis replaces trial and error | ≥ 30% of messages have a completed Factor Card |
| Validate the Will–Thought balance mechanism | ≥ 60% of users rate the feed as "fair" (survey 1–5, average ≥ 4) |
| Build the MVP in Foxora AI in a short cycle | Beta version in 8–10 weeks |

**Out of MVP scope:** monetization, native apps, private video messages, open API for third parties.

## 4. Target Users

- **Author-doer** – a person or creator sharing ongoing actions and reflections (the equivalent of a Twitter/X user).
- **Community participant** – a person who comments, rates arguments and builds relationships (the equivalent of a Facebook user).
- **Team / decision group** – a small group (project, organization, local initiative) making joint decisions using the factor method.
- **Moderator-community keeper** – maintains group rules without censoring lawful content.

## 5. Benchmark: Facebook and Twitter/X Capabilities

The table below organizes the features of both platforms and shows what goes into the MVP.

| Area | Facebook | Twitter/X | Decision for TASK (MVP) |
|---|---|---|---|
| Profile | Extensive, photos, bio, personal info | Short profile, handle, bio | **Yes** – short profile + "Strengths Map" (optional) |
| Publishing | Posts with no strict limit, photos, video, feelings | Short posts with a character limit, threads | **Yes** – two-layer message: Thought + Action (separate limits) |
| Following / friends | Two-way friendship | One-way following | **Yes** – one-way following + two-way "Circle of Trust" |
| Reactions | Likes, emotions | Likes, repost | **Change** – substantive reactions (Agree / Doubt / Evidence) instead of a plain "like" |
| Comments | Nested threads | Replies, quotes | **Yes** – thread replies; a reply can be a Factor |
| Sharing | Share | Repost, quote | **Yes** – sharing with an optional note |
| Groups and events | Groups, events, pages | Lists, Spaces, communities | **Yes (simplified)** – Groups with their own rules |
| Hashtags / trends | Hashtags, trending sections | Hashtags, trends | **Yes** – topics; trends calculated from quality, not only reach |
| Search | People, pages, posts | Posts, people, advanced filters | **Yes** – basic |
| Notifications | Push, email | Push, email | **Yes** – configurable |
| Private messages | Messenger | DM | **Later** (post-MVP) |
| Media | Photos, video, stories | Photos, video, GIFs | **Yes** – photos and links; video after MVP |
| Polls | Polls | Polls | **Yes** – extended with voting on arguments |
| Moderation and reporting | Community standards | Platform rules, community notes | **Yes** – reporting + community notes (see section 8) |
| Privacy | Audience levels | Protected accounts | **Yes** – public / circle / only me |
| Ads and monetization | Extensive | Extensive | **No** in MVP |

*Note: the feature sets of both platforms change over time; the table is a starting point for the product, not a complete competitor specification. A short review of current features is recommended before the scope is finalized.*

## 6. Product Concept: The TASK Message

Each message has up to three parts:

1. **Thought ("What's on your mind?")** – a short opinion, question or hypothesis (up to 600 characters).
2. **Action ("What are you doing?")** – a current action or intention in short form (up to 180 characters), with an optional status: *planning / doing / done / abandoned*.
3. **Factor Card** (optional but promoted) – a structured description of the factors influencing the decision (section 7).

A message can contain only a Thought, only an Action, or both. The message thread shows the history: from hypothesis, through action, to outcome. This way the community sees not only "what I say" but also "how it turned out."

## 7. Factor Analysis Engine (replacing trial and error)

**Principle:** before a user acts by trial and error, the app guides them through breaking the problem down into factors and recombining them. There are two working modes.

### 7.1. Mode A: Analysis through Synthesis (from whole to parts)

*When:* the user has a goal or idea but does not know what will block it.

1. The user formulates a **holistic message** (goal, plan, hypothesis) in the Thought/Action field.
2. The engine proposes an **initial synthesis**: one sentence describing how the goal is to be achieved.
3. The engine **decomposes the synthesis into factors** (resources, risks, dependencies, assumptions, audience, time).
4. The user and community rate the factors: weight (1–5), confidence (1–5), evidence (link, observation, none).
5. The system highlights **critical factors** (high weight, low confidence) – these are tested first, instead of acting blindly.

### 7.2. Mode B: Synthesis through Analysis (from parts to whole)

*When:* the user has a problem or a set of facts and is looking for a solution.

1. The user adds **factors one by one** (observations, constraints, data, opinions from the thread).
2. The engine groups similar factors and detects contradictions and gaps.
3. The engine proposes **2–3 synthesis variants** (solution candidates), with reasoning based on the factors.
4. The user picks a variant and publishes it as an Action message linked to the Factor Card.

### 7.3. Learning loop (instead of "trial and error")

After the action is carried out, the user closes the message with an **Outcome** status (*confirmed / partial / refuted*) and indicates **which factor** failed or worked. The system updates the weights and stores **factor knowledge** in the profile. An error becomes data, not a repeat.

**Role of AI (Foxora AI):** suggesting factors, detecting logical gaps, summarizing a thread into a Factor Card, comparing variants. AI **does not make decisions** – it presents them as proposals with reasoning and room for objection.

## 8. Balance: Will (freedom, liberalism) and Thought (equality, democracy)

**Philosophical premise:** the space of **will** is the individual's right to free choice and expression; the space of **thought** is the community's right to equal participation in deliberation and decision-making. Each without the other becomes distorted: will alone leads to domination by the strongest, equality alone to coercion by the majority. TASK should let people **balance** them, not choose one.

### 8.1. Mechanisms on the side of will (freedom)

- Freedom to publish lawful content; moderation is limited to the law and transparent rules.
- Users **set the visibility** of their message themselves (public / circle / only me).
- Users **choose how their feed is sorted** (chronological, topical, Balance).
- Export and deletion of one's own data with one button.
- Groups have **their own rules** (not one global rule for everything).

### 8.2. Mechanisms on the side of thought (equality)

- **Equal base reach:** every new message receives a minimal, equal pool of impressions within its circle, regardless of follower count.
- **One vote per argument:** ratings of arguments (Agree / Doubt / Evidence) are counted one-person-one-vote, with bot protection (account verification).
- **Community notes:** context for disputed messages is added by users with differing views (approved only when different groups agree).
- **Ranking transparency:** a "Why am I seeing this message?" button with a list of factors.
- Group decisions: voting on a synthesis variant (section 7).

### 8.3. Balance Index

For each feed, group and thread, TASK calculates two indicators from 0 to 100:

- **W (Will):** diversity of sources, freedom of settings, low share of content removals.
- **M (Thought):** evenness of reach distribution (e.g., the Gini coefficient), share of different participants in the discussion, share of arguments backed by evidence.

The indicator shows the **deviation from balance**. When W ≫ M, the system suggests: *"A few voices have dominated the discussion – invite new people / enable voting."* When M ≫ W: *"Group rules strongly limit freedom – consider relaxing them."* The system **suggests, it does not impose**.

### 8.4. The "Balance" feed

The default feed combines: messages from the user's circle (will) + randomly selected, high-quality-argument messages from other circles (thought). The user adjusts the proportions with a **Will ⟷ Thought** slider.

## 9. MVP Scope

### Must have

- Registration, login (email + OAuth), account verification.
- Profile: name, handle, bio, avatar.
- Two-layer message (Thought + Action + status).
- Factor Card with modes A and B (basic) and Outcome closure.
- Following, Circle of Trust.
- Feed: chronological and Balance.
- Substantive reactions and thread replies.
- Groups with their own rules.
- Balance Index at group and thread level.
- Content reporting, basic moderation.
- Notifications (in-app + email).
- Search for messages and people.

### Should have

- Community notes.
- Group voting on synthesis variants.
- User data export.
- Mobile version as a PWA.

### Won't have (not in MVP)

- Private messages, video, stories, live streams.
- Ads, payments, subscriptions.
- Native iOS/Android apps.
- Public API.

## 10. Functional Requirements (selected user stories)

| ID | User story | Acceptance criterion |
|---|---|---|
| F-01 | As a user, I want to publish a message with a Thought and an Action to show what I think and what I do. | Publishing takes < 2 s; character limits enforced separately for Thought and Action. |
| F-02 | As an author, I want to run mode A on my message to see the factors that may get in my way. | The system returns ≥ 3 factors with editable weight and confidence. |
| F-03 | As an author, I want to add factors manually and get synthesis variants (mode B). | The system returns 2–3 variants with reasoning. |
| F-04 | As an author, I want to close a message with an Outcome status and indicate the factor that failed. | Outcome saved in history; weights updated in the profile. |
| F-05 | As a reader, I want to react with "Doubt" or "Evidence" to strengthen the discussion. | An "Evidence" reaction requires a link or a short justification. |
| F-06 | As a user, I want to switch the feed between modes and set the Will ⟷ Thought slider. | Change visible immediately, setting remembered. |
| F-07 | As a user, I want to see why I am seeing a given message. | A window with a list of ranking factors. |
| F-08 | As a group founder, I want to set my own rules and moderation level. | Rules visible to members; change logged in history. |
| F-09 | As a group member, I want to see the group's Balance Index. | Indicator refreshed every 24 h, with a short description. |
| F-10 | As a user, I want to report content that violates the law or the rules. | Report handled within 48 h; author informed of the reason. |

## 11. Non-Functional Requirements

- **Performance:** feed loads in < 2 s (p95); factor engine responds in < 8 s.
- **Accessibility and UX:** responsive design, WCAG 2.1 AA compliance, Polish as the default language, i18n support.
- **Security:** encryption in transit and at rest, protection against spam and bots, request rate limits.
- **Privacy and compliance:** GDPR compliance (consents, right to erasure and export, data minimization); explainability of recommendations (AI Act, DSA – to be verified by a lawyer).
- **AI transparency:** every engine suggestion is labeled as generated; the user can reject it; decision logs contain no sensitive data.
- **Scalability:** architecture ready for 10,000 active users in the MVP.

## 12. Data Model (simplified)

- **User** (id, handle, profile, settings, Will–Thought slider)
- **Message** (id, author, Thought, Action, status, visibility, group, timestamps)
- **FactorCard** (id, message, mode A/B, versions)
- **Factor** (id, card, description, weight, confidence, evidence, outcome)
- **SynthesisVariant** (id, card, description, reasoning, votes)
- **Reaction** (id, message, type: Agree/Doubt/Evidence, user)
- **Group** (id, name, rules, moderation level)
- **BalanceIndex** (object, W, M, date)
- **Report**, **Community note**, **Notification**

## 13. Architecture and Implementation in Foxora AI

*Assumptions (to be confirmed, since the details of the Foxora AI environment are on your side):*

- Foxora AI generates and maintains: a web frontend (PWA), a backend API, a database, an authentication layer.
- The **Factor Engine** module runs as a separate service using a language model; its input is a message, its output is a list of factors / variants in structured JSON.
- The **Balance Ranking** module runs as a batch job + live computation for the feed.
- Recommended components: a job queue for analyses, a cache for the feed, full-text search.

**Question for you:** what capabilities does Foxora AI have built in (code generation, hosting, language model integration, database)? I will adapt section 13 and the sprint plan accordingly.

## 14. Product Metrics

- **Activation:** share of new users publishing a first message within 24 h.
- **Engagement:** messages / user / week; share of messages with a Factor Card.
- **Discussion quality:** share of "Evidence" reactions; average number of participants per thread.
- **Effectiveness of the factor method:** share of messages closed with an Outcome; share of decisions in which a critical factor was identified before acting.
- **Balance:** average Balance Index; deviation from 50/50; Gini coefficient of reach.
- **Trust:** feed "fairness" rating; share of reports found justified.

## 15. Risks and Mitigations

| Risk | Likelihood | Mitigation |
|---|---|---|
| The Factor Card is too hard and users skip it | High | Templates, AI suggestions, a "1 minute" version |
| The Balance Index is perceived as censorship or social engineering | Medium | Transparent formulas, suggestions instead of orders, opt-out |
| Bots and vote manipulation | Medium | Account verification, limits, anomaly detection |
| AI hallucinations in factors | Medium | Labels, request for evidence, manual editing |
| Legal compliance (GDPR, DSA) | Medium | Legal consultation before public launch |
| Empty-network effect (cold start) | High | Launch through closed groups and niche communities |

## 16. Release Plan

| Stage | Time | Scope |
|---|---|---|
| Sprint 0 | week 1 | PRD refinement, UX design, data model |
| Sprints 1–2 | weeks 2–5 | Accounts, profiles, messages, chronological feed, following |
| Sprints 3–4 | weeks 6–8 | Factor Card (modes A and B), Outcome loop, substantive reactions |
| Sprint 5 | weeks 9–10 | Groups, Balance Index, Balance feed, moderation |
| Closed beta | weeks 11–12 | 50–200 users, surveys, adjustments |
| Post-MVP | quarter 2 | Private messages, video, community notes, native apps |

## 17. Open Questions

1. Should TASK be an open (public) platform, or start as a network of closed groups?
2. Who is the first target group (creators, project teams, local organizations, education)?
3. Should the Balance Index formula be fixed, or configurable by the group?
4. What capabilities and limitations does the Foxora AI environment have (section 13)?
5. What are the budget and team (people, hours per week)?

## 18. Next Steps

- Confirm the MVP scope and target group.
- Wireframes: message screen, Factor Card, Balance feed.
- Technical specification for Foxora AI (deployment prompt and module breakdown).
