import { getInput, setFailed, setOutput } from "@actions/core";
import { context } from "@actions/github";

async function run() {
  try {
    const token = getInput("GITHUB_TOKEN", { required: true });
    console.log("token", token);

    const PR = getInput("pr_number", { required: true });
    console.log("PR", PR);

    setOutput("pr_updated", "blablabla");
  } catch (error: unknown) {
    console.error(error);
    if (error instanceof Error) {
      setFailed(error.message);
    }
  }
}
