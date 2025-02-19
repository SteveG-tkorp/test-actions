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
const core_1 = require("@actions/core");
const github_1 = require("@actions/github");
const mainRequest_1 = require("./utils/mainRequest");
const getIssueTypes_1 = require("./utils/getIssueTypes");
const getLabelsToApply_1 = require("./utils/getLabelsToApply");
const addLabelsToPR_1 = require("./utils/addLabelsToPR");
function run() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const token = (0, core_1.getInput)("GITHUB_TOKEN", { required: true });
            const PRNumber = (0, core_1.getInput)("pr_number", { required: false });
            const issueNumber = (0, core_1.getInput)("issue_number", { required: false });
            const owner = github_1.context.repo.owner;
            const repo = github_1.context.repo.repo;
            const octokit = (0, github_1.getOctokit)(token);
            if (PRNumber) {
                console.log("🚀 Déclenché par PR");
                const { closingIssues, prId, labels } = yield (0, mainRequest_1.getIssueClosingPR)(owner, repo, octokit, Number(PRNumber));
                console.log("prId", prId);
                console.log("closingIssues", closingIssues);
                console.log("labels", labels);
                const types = yield Promise.all(closingIssues.map((issueId) => (0, getIssueTypes_1.getIssueTypes)(octokit, issueId)));
                console.log("types", types);
                const labelsIdsFromTypes = types.map((type) => (0, getLabelsToApply_1.getLabelsIdsToApply)(type, labels));
                console.log("labelsFromTypes", labelsIdsFromTypes);
                yield (0, addLabelsToPR_1.addLabelsToPR)(octokit, prId, labelsIdsFromTypes);
            }
            else if (issueNumber) {
                console.log("🛠️ Déclenché par changement de label sur issue");
            }
            else {
                console.error("❔ Autre déclenchement");
            }
        }
        catch (error) {
            console.error(error);
            if (error instanceof Error) {
                (0, core_1.setFailed)(error.message);
            }
        }
    });
}
run();
