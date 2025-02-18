import { getInput, info, setFailed, setOutput } from "@actions/core";
import { context, getOctokit } from "@actions/github";
import { getPRInfos } from "./utils/functions";

async function run() {
  try {
    const token = getInput("GITHUB_TOKEN", { required: true });

    console.log("token", token);

    const PRNumber = getInput("pr_number", { required: false });
    console.log("PRNumber", PRNumber);

    const issueNumber = getInput("issue_number", { required: false });
    console.log("issueNumber", issueNumber);

    console.log("context", context);
    console.log("context.eventName", context.eventName);

    const owner = context.repo.owner;
    console.log("🧑‍💻 owner", owner);

    const repo = context.repo.repo;
    console.log("🎯 repo", repo);

    const octokit = getOctokit(token);

    if (PRNumber) {
      console.log("🚀 Déclenché par PR");
      getPRInfos(owner, repo, octokit);
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
