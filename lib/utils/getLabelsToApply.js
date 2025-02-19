"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getLabelsToApply = getLabelsToApply;
function getLabelsToApply(typeName) {
    console.log("typeName", typeName);
    if (!(typeName in labelsToApply)) {
        throw new Error(`Le type ${typeName} n'est pas renseigné dans votre configuration`);
    }
    return labelsToApply[typeName];
}
const labelsToApply = {
    Bug: "bug",
    Feature: "feature",
};
