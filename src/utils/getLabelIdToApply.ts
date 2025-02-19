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
    const labelToApply = labelsToApply[typeName];

    const matchingLabel: label = repoLabels.filter(
      (label) => label.name === labelToApply
    )[0];
    if (!matchingLabel) {
      throw new Error(
        `Le label '${labelToApply}' n'existe pas dans ce repository`
      );
    }
    return matchingLabel.id;
  } catch (error: unknown) {
    throw error;
  }
}
