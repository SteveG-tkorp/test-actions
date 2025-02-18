import { getInput, info, setFailed, setOutput } from "@actions/core";
import { context } from "@actions/github";

async function run() {
  try {
    const token = getInput("GITHUB_TOKEN", { required: true });

    console.log("token", token);

    const PRNumber = getInput("pr_number", { required: false });
    console.log("PRNumber", PRNumber);

    const issueNumber = getInput("issue_number", { required: false });
    console.log("issueNumber", issueNumber);

    setOutput("pr_updated", "blablabla");
  } catch (error: unknown) {
    if (error instanceof Error) {
      setFailed(error.message);
    }
  }
}

run();
