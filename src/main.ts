import { getInput, setFailed } from "@actions/core";
import { context, getOctokit } from "@actions/github";
import { getIssueClosingPR } from "./utils/getIssueClosingPR";
import { getIssueTypes } from "./utils/getIssueTypes";
import { getLabelsToApply } from "./utils/getLabelsToApply";

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
      const issuesIds = await getIssueClosingPR(
        owner,
        repo,
        octokit,
        Number(PRNumber)
      );
      const types = issuesIds.map((issueId: string) =>
        getIssueTypes(octokit, issueId)
      );

      const labels: string[] = types.map((type: string) =>
        getLabelsToApply(type)
      );

      console.log("labels", labels);
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
