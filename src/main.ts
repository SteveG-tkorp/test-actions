import { getInput, info, setFailed, setOutput } from "@actions/core";
import { context } from "@actions/github";

async function run() {
  try {
    const token = getInput("GITHUB_TOKEN", { required: true });
    const repository = getInput("GITHUB_REPOSITORY", { required: true });

    console.log("token", token);
    console.log("repository", repository);

    const PRNumber = getInput("pr_number", { required: true });
    console.log("PRNumber", PRNumber);

    setOutput("pr_updated", "blablabla");
  } catch (error: unknown) {
    if (error instanceof Error) {
      setFailed(error.message);
    }
  }
}

run();
