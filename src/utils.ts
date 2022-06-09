import * as fs from "fs";
import { Lens } from "./model";

type FormatOptions = {
  defaultRisk: "HIGH_RISK" | "MEDIUM_RISK" | "NO_RISK";
};

export function formatLens(lens: Lens, options?: FormatOptions) {
  options ??= { defaultRisk: "NO_RISK" };

  lens.schemaVersion ||= "2021-11-01";
  lens.description ||= lens.name;
  lens.pillars ??= [];
  lens.pillars.map((p) => {
    p.id ||= stringToId(p.name);
    p.questions ??= [];
    p.questions.map((q, i) => {
      q.id ||= `${p.id}_${i}`;
      q.description ||= q.title;
      q.choices ??= [];
      q.choices.map((c) => {
        c.improvementPlan ??= {};
        c.improvementPlan.displayText ??= c.title;
      });
      q.riskRules ??= [];
      if (q.riskRules.filter((r) => r.condition == "default").length == 0)
        q.riskRules.push({ condition: "default", risk: options.defaultRisk });
    });
  });
}

/** Format lens and save to file. */
export function saveTo(file: string, lens: Lens, options?: FormatOptions) {
  formatLens(lens, options);
  fs.writeFileSync(file, JSON.stringify(lens, null, 2), "utf-8");
}

function stringToId(s: string) {
  return s
    .split("")
    .map((ch) => (/\w/.test(ch) ? ch : "_"))
    .join("");
}
