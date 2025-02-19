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
exports.getIssueClosingPR = getIssueClosingPR;
function getIssueClosingPR(owner, repo, octokit, prNumber) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const query = `query Repository($owner: String!, $repo: String!, $prNumber: Int!) {
    repository(owner: $owner, name: $repo) {
        pullRequest(number: $prNumber) {
            closingIssuesReferences(first: 1) {
                nodes {
                    id    
                }
            }
        }
    }
}
`;
            const result = yield octokit.graphql(query, {
                owner,
                repo,
                prNumber,
            });
            console.log("result", result);
            console.log('result.repository.pullRequest.closingIssuesReferences', result.repository.pullRequest.closingIssuesReferences);
            // Vérifiez si des issues fermées sont présentes
            const closingIssues = result.repository.pullRequest.closingIssuesReferences.nodes;
            if (closingIssues.length > 0) {
                console.log("Closing Issues IDs:", closingIssues.map((issue) => issue.id));
            }
            else {
                console.log("No closing issues found.");
            }
        }
        catch (error) {
            throw error;
        }
    });
}
