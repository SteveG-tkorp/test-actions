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
exports.getIssueTypes = getIssueTypes;
function getIssueTypes(octokit, issueId) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const query = `query Node($issueId: ID!) {
    node(id: $issueId) {
        id
        ... on Issue {
            issueType {
                name
            }
            title
            number
        }
    }
}
`;
            const result = yield octokit.graphql(query, {
                issueId,
                headers: {
                    "GraphQL-Features": "issue_types",
                },
            });
            const issueType = result.node.issueType;
            if (issueType) {
                return issueType.name;
            }
            else {
                throw new Error("Pas de type défini pour cette issue");
            }
        }
        catch (error) {
            throw error;
        }
    });
}
