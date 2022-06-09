import { Lens, Pillar } from "./model";
import { FormatOptions, saveTo } from "./utils";

export type SimpleLens = {
  name: string;
  description?: string;
  pillars: {
    [name: string]: {
      questions: {
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
          risk: "HIGH_RISK" | "MEDIUM_RISK" | "NO_RISK";
        }[];
      }[];
    };
  };
};

export function simpleToLens(simple: SimpleLens): Lens {
  let pillars: Pillar[] = [];

  for (const name in simple.pillars) {
    // generate choice ids
    simple.pillars[name].questions.map((q) =>
      q.choices.map((c, i) => (c.id ??= `choice_${i}`))
    );

    // update pillars
    pillars.push({
      name,
      questions: simple.pillars[name].questions.map((q) => ({
        title: q.title,
        description: q.description,
        choices: q.choices.map((c) => ({
          title: c.title,
          improvementPlan: c.improvementPlan,
          helpfulResource: c.helpfulResource,
        })),
        riskRules: q.choices.map((c) => ({ condition: c.id, risk: c.risk })),
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
