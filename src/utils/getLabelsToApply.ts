export async function getLabelsToApply(typeName: string) {
  if (!(typeName in labelsToApply)) {
    throw new Error("Ce type n'est pas renseigné dans votre configuration");
  }
  return labelsToApply[typeName];
}

const labelsToApply: Record<string, string> = {
  Bug: "bug",
  Feature: "feature",
};
