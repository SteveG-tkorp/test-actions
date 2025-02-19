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
const loadConfigFile_1 = require("./utils/loadConfigFile");
function run() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const token = (0, core_1.getInput)("GITHUB_TOKEN", { required: true });
            const PRNumber = (0, core_1.getInput)("pr_number", { required: false });
            const configPath = (0, core_1.getInput)("labels_config_path", { required: true }) ||
                ".github/labels-config.json";
            (0, loadConfigFile_1.loadConfigFile)(configPath);
            const owner = github_1.context.repo.owner;
            const repo = github_1.context.repo.repo;
            const octokit = (0, github_1.getOctokit)(token);
            // Récupérer les informations principales
            const { closingIssues, prId, labels } = yield (0, mainRequest_1.getInfos)(owner, repo, octokit, Number(PRNumber));
            // Récupérer les types
            const types = yield Promise.all(closingIssues.map((issueId) => (0, getIssueTypes_1.getIssueTypes)(octokit, issueId)));
            // Récupérer les ids des labels à appliquer
            const labelsIdsFromTypes = types.map((type) => (0, getLabelsToApply_1.getLabelsIdsToApply)(type, labels));
            // Appliquer les labels à la PR
            yield (0, addLabelsToPR_1.addLabelsToPR)(octokit, prId, labelsIdsFromTypes);
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
