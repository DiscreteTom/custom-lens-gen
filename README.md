# Custom Lens Generator

Generator for AWS Well-Architected custom lens.

## Features

- Support two edit mode.
  - TypeScript/JSON mode.
  - YAML mode.
- Intellisense(TypeScript/JSON only).
- `SimpleLens` to simplify lens model.
- Auto-generate fields for fast prototyping.
  - `schemaVersion`
  - `description`
  - `pillar.id`
  - `question.id`
  - `question.description`
  - `choice.id`
  - `choice.improvementPlan`
  - `choice.improvementPlan.displayText`
- Auto add default risk rule.
  - Option: `{ defaultRisk: "NO_RISK" }`.

## Usage

### TypeScript/JSON Mode

1. Clone this repo.
2. Install dependencies: run `yarn`.
3. Edit `src/main.ts`.
4. Run `yarn dev` to generate `output.json`.

### YAML Mode

1. Clone this repo.
2. Install dependencies: run `yarn`.
3. Compile TypeScript to JavaScript: `yarn build`.
4. Edit `definition.yml`.
5. Run `yarn dev:yaml` to generate `output.json`.
