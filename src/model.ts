export type RiskEnum = "HIGH_RISK" | "MEDIUM_RISK" | "NO_RISK";

export type Pillar = {
  /** Default: `pillar.name` */
  id?: string;
  name: string;
  questions: {
    /** Default: `` `${pillar.id}_${i}` `` */
    id?: string;
    title: string;
    description?: string;
    choices: {
      /** Default: `` `choice_${i}` `` */
      id?: string;
      title: string;
      /** Provide `displayText` (default: `choice.title`) or `url`. */
      improvementPlan?: {
        displayText?: string;
        url?: string;
      };
      helpfulResource?: { displayText?: string; url?: string };
    }[];
    riskRules: {
      /** E.g.: `choice1 && !choice2` */
      condition: "default" | (string & {});
      risk: RiskEnum;
    }[];
    helpfulResource?: { displayText?: string; url?: string };
  }[];
};

export type Lens = {
  /** Latest version: "2021-11-01" */
  schemaVersion?: "2021-11-01" | (string & {});
  name: string;
  description?: string;
  pillars: Pillar[];
};
