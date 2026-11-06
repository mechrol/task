/**
 * Angielskie tlumaczenia tresci przykładowej (seed).
 *
 * Kanonem pozostaje polski seed w `lib/data.ts`. Ten plik trzyma angielskie
 * odpowiedniki kluczowane identyfikatorami encji, zeby tryb angielski pokazywal
 * tlumaczone posty, grupy, odpowiedzi i karty czynnikow - a nie tylko interfejs.
 *
 * Tlumaczenie jest nakladane tylko wtedy, gdy tresc w stanie nadal jest
 * zgodna z seedem - poprawki uzytkownika pozostaja nietkniete.
 */

export interface UserTranslation {
  bio?: string;
}

export interface GroupTranslation {
  name?: string;
  description?: string;
  rules?: string[];
}

export interface PostTranslation {
  mysl?: string;
  czyn?: string;
}

export interface CardTranslation {
  synthesis?: string;
  outcomeNote?: string;
  factors?: Record<string, { description?: string; evidence?: string }>;
  variants?: Record<
    string,
    { title?: string; description?: string; justification?: string }
  >;
}

export interface SeedTranslations {
  users: Record<string, UserTranslation>;
  groups: Record<string, GroupTranslation>;
  posts: Record<string, PostTranslation>;
  cards: Record<string, CardTranslation>;
  reactions: Record<string, { evidence?: string }>;
  replies: Record<string, { body?: string }>;
  notifications: Record<string, { text?: string }>;
  reports: Record<string, { details?: string; resolutionNote?: string }>;
}

export const EN_SEED: SeedTranslations = {
  users: {
    u_marta: {
      bio: "Urban planner. I think about the city, then I act. A factor card instead of guessing.",
    },
    u_tomasz: {
      bio: "Energy engineer. I break projects down into factors before I spend a zloty.",
    },
    u_agnieszka: {
      bio: "Labour market researcher. Data instead of opinions.",
    },
    u_piotr: {
      bio: "Product, B2B, zero fluff.",
    },
    u_kasia: {
      bio: "Volunteering coordinator. I count on people, not on declarations.",
    },
    u_ola: {
      bio: "Programmer. Frontend and documentation.",
    },
    u_janusz: {
      bio: "District councillor. Public thread, result in writing.",
    },
    u_robert: {
      bio: "Housing community. Renovations, neighbours, calculations.",
    },
  },

  groups: {
    g_zastępstwo: {
      name: "Warsaw Zastępstwo",
      description:
        "Residents of the Zastępstwo estate exchange information about renovations, transport and local decisions.",
      rules: [
        "Write about matters of our estate or specific city projects.",
        "Every post about an investment plan has a Factor Card.",
        "Do not publish personal data of neighbours.",
        "Close threads with a status: confirmed, partly, refuted.",
      ],
    },
    g_energia: {
      name: "Energy Independence",
      description:
        "Energy cooperative, prosumer, energy storage. We weigh the risks before we connect inverters.",
      rules: [
        "Every synthesis variant must have a justification based on factors.",
        "Mark a concrete source or measurement as evidence in a reaction.",
        "An evidence reaction without a source is rejected.",
      ],
    },
    g_zespół: {
      name: "Nimbus Product Team",
      description:
        "We build a tool for decision making. Here we decide before we build.",
      rules: [
        "We do not start a topic without a Factor Card.",
        "Every variant has a review date.",
        "No spam and no advertising.",
      ],
    },
    g_edukacja: {
      name: "Digital Education",
      description:
        "Workshops, courses and training budgets. We count on data, not on declarations.",
      rules: [
        "Report the outcome after every finished workshop.",
        "Justify evidence reactions with a link or a concrete measurement.",
        "Respect other voices.",
      ],
    },
  },

  posts: {
    p_remont_ulicy: {
      mysl:
        "The renovation of Brzozowa Street starts in March, but the contract does not say what happens if the works take longer than planned. Without that clause residents will pay for the delay with their own time again.",
      czyn: "I will ask for a schedule clause in the contract. I file the motion with the board tomorrow.",
    },
    p_falowniki: {
      mysl:
        "Inverters on the primary school roof will cut the bill by about 22 percent, but only if self-consumption stays above 380 kWh per month. Last November it was 290 kWh, so the margin is thin.",
      czyn: "I am calculating a variant with energy storage for the school alone. Report on Thursday.",
    },
    p_kursy: {
      mysl:
        "The training programme for teachers has a budget of 480 thousand zloty and 1 200 people enrolled. In the last two editions 30 percent of participants did not finish the course, so the real cost per completed teacher is almost 40 percent higher than the report shows.",
      czyn: "I am ordering an analysis of dropouts after the 2025 edition, to rebuild the schedule.",
    },
    p_nimbus_p0: {
      mysl:
        "We have three weeks until the factor analysis module launches. The biggest risk is not the code, it is that the user does not understand why they get variant A and not B. Without that explanation the ranking will look like an arbitrary verdict.",
      czyn: "I am building a prototype panel with the list of factors under each variant. For review on Tuesday.",
    },
    p_zima_styczeń: {
      mysl:
        "The volunteers cleaned up for three weekends in a row and collected 1.1 tonnes of waste. With 26 people per shift that is 14 kg per person. The effect is there, but it rests on single people who happen to like it.",
      czyn: "I am writing the volunteering rules so that it does not depend on one person. I am looking for two substitutes.",
    },
    p_podwyżki: {
      mysl:
        "The housing cooperative raises the renovation levy by 40 zloty a month. Without a description of what exactly changes and when, this cannot be accepted in a family budget.",
      czyn: "I am asking for a schedule of works for 10 years, not just for one year.",
    },
    p_dokumentacja: {
      mysl:
        "The API documentation in Nimbus is written in English, and users from the municipality do not know English. This is not an aesthetic problem, it is an entry barrier that cuts off 30 percent of the recipients.",
      czyn: "I am translating the endpoint keys into Polish. The first batch next week.",
    },
    p_rower: {
      mysl:
        "Bike racks at the metro station cost 900 zloty per place, and there are nine of them across two stops. In practice occupancy between 8 and 10 in the morning is about 40 percent, so we pay for empty racks at rush hour.",
      czyn: "I am comparing a model with high bars near schools. I collect quotes until the end of the month.",
    },
    p_wnioski: {
      mysl:
        "I filed 42 motions for discussion about the district budget. 28 motions were rejected without a reason, only because of the indicated procedure.",
      czyn: "I am asking for a list justifying the rejections.",
    },
    p_budzet_c: {
      mysl:
        "Hypothesis: the price of 4.99 zloty in the mobile app will raise conversion, but it will not raise retention. Retention depends on whether the user comes back after the purchase, and that depends on support, not on price.",
      czyn: "I am planning a test on 4 thousand users for two weeks.",
    },
    p_wynik_brak: {
      mysl:
        "We installed heat pumps in the building on Dąbowa Street. We checked the heating bills of three random flats. The average fell from 412 to 268 zloty, that is by 35 percent.",
      czyn: "Outcome confirmed. The key factor turned out to be the return water temperature, not the efficiency of the pumps.",
    },
    p_wniosek_wynik: {
      mysl:
        "The motion to hold a residents meeting about the playground passed, but only in part: the office added a point about the design brief, so there is no vote on the location.",
      czyn: "I am closing the thread: partly. The factor that failed was the consultation deadline.",
    },
  },

  cards: {
    c_remont_ulicy: {
      synthesis:
        "Request a schedule clause in the Brzozowa Street renovation contract, with a reply deadline by the end of the month.",
      factors: {
        f_ru_1: {
          description: "Ready-made schedule clause from renovation contracts in two districts",
          evidence: "Template from the Dąbowa 14/2025 contract",
        },
        f_ru_2: {
          description: "Consent of the district board to change the contract",
          evidence: "None - the date of the board meeting is not known",
        },
        f_ru_3: {
          description: "Support of residents in the vote on the motion",
          evidence: "38 signatures on a paper form",
        },
        f_ru_4: {
          description: "Works start in March, so the motion has to be filed earlier",
          evidence: "District investment schedule for 2026",
        },
        f_ru_5: {
          description: "Risk that changing the contract delays the start of works",
        },
      },
      outcomeNote:
        "The board accepted the motion with the clause, but the meeting date turned out to be two weeks later than we assumed.",
    },
    c_falowniki: {
      synthesis:
        "Calculate the payback of an energy storage for the primary school, making the decision depend on self-consumption above 380 kWh per month.",
      factors: {
        f_fl_1: {
          description: "Consumption data of the school over 24 months",
          evidence: "Utility meter, readings 2024-2025",
        },
        f_fl_2: {
          description: "The energy price in the contract stays at 640 zloty per MWh",
          evidence: "None - prices change every quarter",
        },
        f_fl_3: {
          description: "Regulations on energy storage in public buildings",
          evidence: "None - requires verification at URE",
        },
        f_fl_4: {
          description: "The deadline for the subsidy programme ends on 30 June",
          evidence: "Programme regulations, page 4",
        },
      },
    },
    c_kursy: {
      synthesis:
        "Change the schedule so that support ends before the exam, and measure the dropout as the main indicator.",
      factors: {
        f_ko_1: {
          description: "Budget of 480 thousand zloty per edition",
          evidence: "Budget resolution, appendix 7",
        },
        f_ko_2: {
          description: "30 percent of participants do not finish the course",
          evidence: "Attendance list from two editions",
        },
        f_ko_3: {
          description: "Exam dates are set by the education authority, not the organiser",
          evidence: "Exam schedule, notice of the education authority",
        },
        f_ko_4: {
          description: "Risk that participants show up in the last week",
        },
      },
      variants: {
        v_ko_1: {
          title: "Support until the end, exam after the course",
          description:
            "The course scope stays, but mentor support moves two weeks later, and the exam date is set after enrolment.",
          justification:
            "Highest weight on recipients and resources: moving the support removes the most common cause of dropout, and the cost stays within the budget.",
        },
        v_ko_2: {
          title: "Three tracks: intensive, standard, self-study",
          description:
            "Participants choose a track at the start; the intensive one costs more, the standard one as much as today.",
          justification:
            "Splits the recipients who lack time from those who lack motivation. Risky, because it complicates the settlement.",
        },
        v_ko_3: {
          title: "No change, only measurement",
          description:
            "We do not touch the programme, we only add a dropout survey and report the result after the edition.",
          justification:
            "The cheapest variant, but it does not remove the cause of the dropout: the risk that the decision about the programme is postponed again.",
        },
      },
    },
    c_nimbus_p0: {
      synthesis:
        "Show the list of factors that decided each synthesis variant below that variant.",
      factors: {
        f_ni_1: {
          description:
            "Users from smaller municipalities do not know the language of decisions and read the result as a verdict",
          evidence: "12 conversations with test users",
        },
        f_ni_2: {
          description: "Three weeks to launch, no time for a second pass at the interface",
          evidence: "Release plan, sprint 12",
        },
        f_ni_3: {
          description: "The factor panel may be read as a data dump",
          evidence: "None - we need to check how 5 people from the pilot group react",
        },
      },
    },
    c_rower: {
      synthesis:
        "Compare ten high racks with classic racks, counting the cost of a place that is really occupied.",
      factors: {
        f_ro_1: {
          description: "Occupancy data of the racks from our own measurements",
          evidence: "Notes from 6 measurements, method undocumented",
        },
        f_ro_2: {
          description: "Purchases go through the transport authority - high racks are not in the catalogue",
          evidence: "None - we need to check the catalogue",
        },
        f_ro_3: {
          description: "Cyclists report a lack of places near the station",
          evidence: "Survey in the group, 47 answers",
        },
      },
    },
    c_budzet_c: {
      synthesis:
        "Run a price test on 4 thousand users, measuring conversion and 30-day retention separately.",
      factors: {
        f_bc_1: {
          description: "The price of 4.99 zloty is a change for 30 percent of users",
          evidence: "None - no pricing data",
        },
        f_bc_2: {
          description: "Retention depends on after-sales support, not on the price",
          evidence: "Data from 6 months, 1 900 tickets",
        },
        f_bc_3: {
          description: "Infrastructure for A/B tests on 4 thousand users",
          evidence: "Ready, used in March",
        },
      },
      variants: {
        v_bc_1: {
          title: "Price test with a separate retention measurement",
          description:
            "4 thousand users, two price groups, retention counted after 30 days regardless of the purchase.",
          justification:
            "It answers the hypothesis separately: conversion and retention are two different variables, and combining them in one report explains nothing.",
        },
        v_bc_2: {
          title: "Retention only",
          description:
            "We change the price without a test and we look only at the return after 30 days.",
          justification:
            "Cheaper, but it does not answer the question about conversion, and the cost of changing prices in production is reversible.",
        },
      },
    },
    c_wynik_brak: {
      synthesis:
        "Replace the heat pumps in the building on Dąbowa Street together with regulating the return water temperature.",
      factors: {
        f_wb_1: {
          description: "Subsidy covering 60 percent of the equipment cost",
          evidence: "Subsidy agreement, appendix 2",
        },
        f_wb_2: {
          description: "Return water temperature kept at 45 degrees C",
          evidence: "None - nobody checked how it changes after the replacement",
        },
        f_wb_3: {
          description: "Consent of the housing community to replace the installation",
          evidence: "Resolution no. 12/2025, 21 votes in favour",
        },
      },
      outcomeNote:
        "The assumption about the return water temperature turned out to be critical: without regulation the saving was 11 percent instead of 35 percent.",
    },
    c_wniosek_wynik: {
      synthesis: "Motion to hold a residents meeting about the location of the playground.",
      factors: {
        f_wn_1: {
          description: "Interest of residents: 64 signatures",
          evidence: "Signature sheets",
        },
        f_wn_2: {
          description: "The consultation deadline is 10 days",
          evidence: "Consultation rules, page 1",
        },
        f_wn_3: {
          description: "The office will send the motion back if no voting date is set",
          evidence: "Decision from a similar case, 2024",
        },
      },
      variants: {
        v_wn_1: {
          title: "Motion with a voting date",
          description: "We attach a proposed voting date to the motion.",
          justification:
            "Without a voting date the motion met the formal minimum, but it did not allow residents to make a decision.",
        },
        v_wn_2: {
          title: "Open meeting before the vote",
          description: "A meeting at the school, then the vote within the deadline.",
          justification:
            "Higher participation, but with an organisational cost and the risk of not making the consultation deadline.",
        },
      },
      outcomeNote:
        "The consultation deadline turned out to be shorter than we assumed: we did not manage to hold the meeting, and the office added a point about the design brief.",
    },
  },

  reactions: {
    r_1: { evidence: "Contract from Dąbowa 14/2025, page 6" },
    r_3: {
      evidence: "Does the board even have the right to change the contract after signing it?",
    },
    r_5: {
      evidence: "With 290 kWh in November the margin is negative, check January",
    },
    r_6: { evidence: "Rules of the subsidy programme, page 4" },
    r_9: { evidence: "Attendance list from the 2025 edition, 340 participants" },
    r_10: {
      evidence: "What about the exam date mentioned by the education authority?",
    },
    r_12: {
      evidence:
        "Five people is too few to judge whether the panel is too dense",
    },
    r_13: {
      evidence:
        "Photos of the racks near the station, 12 March, 47 answers to the survey",
    },
    r_15: { evidence: "Bills of three flats: 412 zloty -> 268 zloty" },
    r_16: {
      evidence: "Three flats is a small sample, the heating season is long",
    },
    r_18: {
      evidence: "The consultation deadline was too short, but the office decided that",
    },
    r_20: { evidence: "Photos from the third weekend, 18 bags" },
    r_21: {
      evidence: "No pricing data, what is the assumption based on?",
    },
    r_24: {
      evidence:
        "I do not see a schedule, so I cannot judge the impact on the budget",
    },
    r_26: {
      evidence: "Survey: 12 out of 41 users dropped out of the setup",
    },
    r_27: {
      evidence:
        "The procedure is public, the question is only whether it is applied equally",
    },
  },

  replies: {
    rp_1: {
      body: "We have 38 signatures under the motion. I will attach them as an appendix, it really helps.",
    },
    rp_2: {
      body: "The question about the legal basis is justified. It is worth checking whether the contract provides for annexes with a schedule indexation clause.",
    },
    rp_3: {
      body: "January in the school always ate more, because two rooms are heated. Check January before you write the report.",
    },
    rp_4: {
      body: "The education authority announces the exam date in February, so it can be taken into account, but not moved blindly.",
    },
    rp_5: {
      body: "The second variant looks best in the vote. With three tracks the administrative settlement grows, but we have the budget for it.",
    },
    rp_6: {
      body: "Three bills is little, but the direction is confirmed. In a year we will have the full set.",
    },
    rp_7: {
      body: "I added photos to the thread. You can see that the places near the entrance are taken all the time.",
    },
    rp_8: {
      body: "The factor panel can be folded into three lines. The biggest problem is the empty state, when a factor has no evidence.",
    },
    rp_9: {
      body: "With 10 days of consultation we will not manage to hold a meeting, that is true.",
    },
    rp_10: {
      body: "It is enough to translate the field names in the form, not the whole documentation.",
    },
  },

  notifications: {
    n_1: {
      text: "Tomasz Berg reacted with Evidence to your post about bike racks.",
    },
    n_2: {
      text: "Agnieszka Wróbel replied in the thread about the price budget.",
    },
    n_3: {
      text: "Your post about the Brzozowa Street renovation was closed with an outcome: confirmed.",
    },
    n_4: {
      text: "Katarzyna Nowak added you to the Energy Independence group.",
    },
    n_5: {
      text: "Your post was marked for moderation review. The decision will come within 48 hours.",
    },
  },

  reports: {
    rep_1: {
      details:
        "No Factor Card with the renovation plan, and the group requires one.",
    },
    rep_2: {
      details: "No justification for the rejections, please answer.",
      resolutionNote:
        "Noted for the record, the author of the motion received a written answer.",
    },
  },
};
