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
function addLabelsToPR(
// owner: string,
// repo: string,
octokit, prId, labels) {
    return __awaiter(this, void 0, void 0, function* () {
        console.log("labels", labels);
        try {
            const query = `mutation AddLabelsToLabelable($prId:ID!, $labelsIds: [ID!]!) {
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
            const labelsIds = labels.map((label) => label.id);
            console.log("labelsIds", labelsIds);
            const result = yield octokit.graphql(query, {
                // owner,
                // repo,
                prId,
                labelsIds,
                // headers: {
                //   "GraphQL-Features": "issue_types",
                // },
            });
            console.log("result", result);
        }
        catch (error) {
            throw error;
        }
    });
}
