import * as fs from "fs";
import { Lens } from "./model";

export function formatLens(lens: Lens) {
  lens.schemaVersion ??= "2021-11-01";
  lens.pillars ??= [];
  lens.pillars.map((p, i) => {
    p.id ??= `pillar_${i}`;
    p.questions ??= [];
    p.questions.map((q, j) => {
      q.id ??= `${p.id}_${j}`;
      q.choices ??= [];
      q.choices.map((c) => {
        c.improvementPlan.displayText ??= c.title;
      });
      q.riskRules ??= [];
    });
  });
}

/** Format lens and save to file. */
export function saveTo(file: string, lens: Lens) {
  formatLens(lens);
  fs.writeFileSync(file, JSON.stringify(lens, null, 2), "utf-8");
}
