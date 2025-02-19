import { setFailed } from "@actions/core";
import { label } from "./types";

export function getLabelIdToApply(
  typeName: string,
  repoLabels: label[],
  labelsToApply: Record<string, string>
) {
  try {
    if (!(typeName in labelsToApply)) {
      throw new Error(
        `Le type ${typeName} n'est pas renseigné dans votre configuration`
      );
    }
    console.log("typeName", typeName);
    console.log("labelsToApply", labelsToApply);
    const labelToApply = labelsToApply[typeName];
    console.log("labelToApply", labelToApply);
    console.log("repoLabels", repoLabels);

    const id: string = repoLabels.filter(
      (label) => label.name === labelToApply
    )[0].id;
    if (!id) {
      throw new Error(`Le label ${labelToApply} n'existe pas dans ce repository`)
    }
    return id;
  } catch (error: unknown) {
    if (error instanceof Error) {
      setFailed(error);
      console.error(`Erreur de récupération d'id de label : ${error}`);
    }
  }
}

// const labelsToApply: Record<string, string> = {
//   Bug: "bug",
//   Feature: "feature",
// };
