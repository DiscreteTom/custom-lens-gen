import * as fs from "fs";
import { Lens } from "./model";

export function formatLens(lens: Lens) {
  lens.schemaVersion ||= "2021-11-01";
  lens.description ||= lens.name;
  lens.pillars ??= [];
  lens.pillars.map((p, i) => {
    p.id ||= `pillar_${i}`;
    p.questions ??= [];
    p.questions.map((q, j) => {
      q.id ||= `${p.id}_${j}`;
      q.description ||= q.title;
      q.choices ??= [];
      q.choices.map((c) => {
        c.improvementPlan ??= {};
        c.improvementPlan.displayText ??= c.title;
      });
      q.riskRules ??= [];
      if (q.riskRules.filter((r) => r.condition == "default").length == 0)
        q.riskRules.push({ condition: "default", risk: "NO_RISK" });
    });
  });
}

/** Format lens and save to file. */
export function saveTo(file: string, lens: Lens) {
  formatLens(lens);
  fs.writeFileSync(file, JSON.stringify(lens, null, 2), "utf-8");
}
