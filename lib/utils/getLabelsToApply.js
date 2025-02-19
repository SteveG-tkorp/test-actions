"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getLabelsIdsToApply = getLabelsIdsToApply;
function getLabelsIdsToApply(typeName, repoLabels) {
    console.log("typeName", typeName);
    if (!(typeName in labelsToApply)) {
        throw new Error(`Le type ${typeName} n'est pas renseigné dans votre configuration`);
    }
    const labelToApply = labelsToApply[typeName];
    return repoLabels.filter((label) => label.name === labelToApply)[0].id;
}
const labelsToApply = {
    Bug: "bug",
    Feature: "feature",
};
