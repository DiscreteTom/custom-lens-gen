export type Lens = {
  /** Latest version: "2021-11-01" */
  schemaVersion?: "2021-11-01" | (string & {});
  name: string;
  description: string;
  pillars: {
    /** Default: `` `pillar_${i}` `` */
    id?: string;
    name: string;
    questions: {
      /** Default: `` `${pillar.id}_${i}` `` */
      id?: string;
      title: string;
      description?: string;
      choices: {
        /** Choice ID is required since it will be referenced in `riskRules`. */
        id: string;
        title: string;
        /** Provide `displayText` (default: `choice.title`) or `url`. */
        improvementPlan: {
          displayText?: string;
          url?: string;
        };
        helpfulResource?: { displayText?: string; url?: string };
      }[];
      riskRules: {
        condition: "default" | (string & {});
        risk: "HIGH_RISK" | "MEDIUM_RISK" | "NO_RISK";
      }[];
    }[];
  }[];
};
