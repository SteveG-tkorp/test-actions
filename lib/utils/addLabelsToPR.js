"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.addLabelsToPR = addLabelsToPR;
const core_1 = require("@actions/core");
function addLabelsToPR(octokit, prId, labelsIds) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const query = `mutation AddLabelsToLabelable($prId:ID!, $labelsIds: [ID!]!) {
     clearLabelsFromLabelable(input: { labelableId: $prId }) {
        clientMutationId
    }
    addLabelsToLabelable(
        input: {
            labelableId: $prId
            labelIds: $labelsIds
        }
    ) {
        clientMutationId
    }
}
`;
            yield octokit.graphql(query, {
                prId,
                labelsIds,
            });
            (0, core_1.info)(`Les labels ont été affectés à la PR`);
        }
        catch (error) {
            throw error;
        }
    });
}
