"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getLabelsIdsToApply = getLabelsIdsToApply;
function getLabelsIdsToApply(typeName, repoLabels, labelsToApply) {
    if (!(typeName in labelsToApply)) {
        throw new Error(`Le type ${typeName} n'est pas renseigné dans votre configuration`);
    }
    console.log("typeName", typeName);
    console.log("labelsToApply", labelsToApply);
    const labelToApply = labelsToApply[typeName];
    console.log("labelToApply", labelToApply);
    return repoLabels.filter((label) => label.name === labelToApply)[0].id;
}
// const labelsToApply: Record<string, string> = {
//   Bug: "bug",
//   Feature: "feature",
// };
