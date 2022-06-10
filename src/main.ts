import { saveSimple, SimpleLens } from "./simple";

const simple: SimpleLens = {
  name: "",
  description: "",
  pillars: {
    "<PillarName>": [
      {
        title: "",
        choices: [
          {
            title: "",
            helpfulResource: {
              displayText: "",
            },
            risk: "MEDIUM_RISK",
          },
        ],
      },
    ],
  },
};

saveSimple("output.json", simple);
