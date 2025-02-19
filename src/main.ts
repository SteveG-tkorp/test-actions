import { getInput, setFailed } from "@actions/core";
import { context, getOctokit } from "@actions/github";
import { getIssueClosingPR } from "./utils/functions";

async function run() {
  try {
    const token = getInput("GITHUB_TOKEN", { required: true });

    const PRNumber = getInput("pr_number", { required: false });

    const issueNumber = getInput("issue_number", { required: false });
    const owner = context.repo.owner;

    const repo = context.repo.repo;

    const octokit = getOctokit(token);

    if (PRNumber) {
      console.log("🚀 Déclenché par PR");
      getIssueClosingPR(owner, repo, octokit, Number(PRNumber));
    } else if (issueNumber) {
      console.log("🛠️ Déclenché par changement de label sur issue");
    } else {
      console.error("❔ Autre déclenchement");
    }
  } catch (error: unknown) {
    console.error(error);
    if (error instanceof Error) {
      setFailed(error.message);
    }
  }
}

run();
