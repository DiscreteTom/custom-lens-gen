import * as yaml from "js-yaml";
import * as fs from "fs";
import { saveSimple, SimpleLens } from "./simple";

saveSimple(
  "output.json",
  yaml.load(fs.readFileSync("definition.yml", "utf-8")) as SimpleLens
);
