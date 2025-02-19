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
exports.getInfos = getInfos;
function getInfos(owner, repo, octokit, prNumber) {
    return __awaiter(this, void 0, void 0, function* () {
        var _a;
        try {
            const query = `query Repository($owner: String!, $repo: String!, $prNumber: Int!) {
    repository(owner: $owner, name: $repo) {
        pullRequest(number: $prNumber) {
        id
            closingIssuesReferences(first: 1) {
                nodes {
                    id    
                }
            }
        }
        labels(first: 100) {
        totalCount
            nodes {
                id
                name
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
            const closingIssues = result.repository.pullRequest.closingIssuesReferences.nodes;
            return {
                closingIssues: (_a = closingIssues.map((issue) => issue.id)) !== null && _a !== void 0 ? _a : [],
                prId: result.repository.pullRequest.id,
                labels: result.repository.labels.nodes,
            };
        }
        catch (error) {
            throw error;
        }
    });
}
