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
const functions_1 = require("./utils/functions");
function run() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const token = (0, core_1.getInput)("GITHUB_TOKEN", { required: true });
            console.log("token", token);
            const PRNumber = (0, core_1.getInput)("pr_number", { required: false });
            console.log("PRNumber", PRNumber);
            const issueNumber = (0, core_1.getInput)("issue_number", { required: false });
            console.log("issueNumber", issueNumber);
            console.log("context", github_1.context);
            console.log("context.eventName", github_1.context.eventName);
            const owner = github_1.context.repo.owner;
            console.log("🧑‍💻 owner", owner);
            const repo = github_1.context.repo.repo;
            console.log("🎯 repo", repo);
            const octokit = (0, github_1.getOctokit)(token);
            if (PRNumber) {
                console.log("🚀 Déclenché par PR");
                (0, functions_1.getPRInfos)(owner, repo, octokit);
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
