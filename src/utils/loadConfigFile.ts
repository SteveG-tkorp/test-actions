import fs from "fs";
import path from "path";

import { setFailed } from "@actions/core";

export function loadConfigFile(configPath: string) {
  try {
    const absoluePath = path.resolve(configPath);
    const fileContents = fs.readFileSync(absoluePath, "utf8");
    const result = JSON.parse(fileContents);
    console.log("result", result);
    return result;
  } catch (error) {
    setFailed(
      `❌ Erreur lors du chargement du fichier JSON (${configPath}) : ${error}`
    );
  }
}
