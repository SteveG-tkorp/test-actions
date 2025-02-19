export function getLabelsToApply(typeName: string) {
  console.log("typeName", typeName);
  if (!(typeName in labelsToApply)) {
    throw new Error(
      `Le type ${typeName} n'est pas renseigné dans votre configuration`
    );
  }
  return labelsToApply[typeName];
}

const labelsToApply: Record<string, string> = {
  Bug: "bug",
  Feature: "feature",
};
