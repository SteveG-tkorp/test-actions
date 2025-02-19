"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getLabelIdToApply = getLabelIdToApply;
const core_1 = require("@actions/core");
function getLabelIdToApply(typeName, repoLabels, labelsToApply) {
    try {
        if (!(typeName in labelsToApply)) {
            throw new Error(`Le type ${typeName} n'est pas renseigné dans votre configuration`);
        }
        const labelToApply = labelsToApply[typeName];
        const matchingLabel = repoLabels.filter((label) => label.name === labelToApply)[0];
        if (!matchingLabel) {
            throw new Error(`Le label '${labelToApply}' n'existe pas dans ce repository`);
        }
        return matchingLabel.id;
    }
    catch (error) {
        if (error instanceof Error) {
            (0, core_1.setFailed)(error);
            console.error(`Erreur de récupération d'id de label : ${error}`);
        }
    }
}
