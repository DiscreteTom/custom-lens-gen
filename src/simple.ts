import { Lens, Pillar, RiskEnum } from "./model";
import { FormatOptions, saveTo } from "./utils";

export type SimpleQuestion = {
  title: string;
  description?: string;
  choices: {
    id?: string;
    title: string;
    improvementPlan?: {
      displayText?: string;
      url?: string;
    };
    helpfulResource?: { displayText?: string; url?: string };
    risk?: RiskEnum;
  }[];
};

export type SimpleLens = {
  name: string;
  description?: string;
  pillars: {
    [name: string]: SimpleQuestion[];
  };
};

export function simpleToLens(simple: SimpleLens): Lens {
  let pillars: Pillar[] = [];

  for (const name in simple.pillars) {
    // generate choice ids
    simple.pillars[name].map((q) =>
      q.choices.map((c, i) => (c.id ??= `choice_${i}`))
    );

    // update pillars
    pillars.push({
      name,
      questions: simple.pillars[name].map((q) => ({
        title: q.title,
        description: q.description,
        choices: q.choices.map((c) => ({
          title: c.title,
          improvementPlan: c.improvementPlan,
          helpfulResource: c.helpfulResource,
        })),
        riskRules: q.choices
          .filter((c) => c.risk)
          .map((c) => ({ condition: c.id, risk: c.risk }))
          .sort((a, b) => riskToNumber(a.risk) - riskToNumber(b.risk)), // high risk first
      })),
    });
  }

  return {
    schemaVersion: "2021-11-01",
    name: simple.name,
    description: simple.description,
    pillars,
  };
}

export function saveSimple(
  file: string,
  simple: SimpleLens,
  options?: FormatOptions
) {
  saveTo(file, simpleToLens(simple), options);
}

function riskToNumber(risk: RiskEnum) {
  switch (risk) {
    case "HIGH_RISK":
      return 3;
    case "MEDIUM_RISK":
      return 2;
    case "NO_RISK":
      return 1;
  }
}
