import { getInput, info, setFailed, setOutput } from "@actions/core";
import { context } from "@actions/github";

async function run() {
  try {
    const token = getInput("GITHUB_TOKEN", { required: true });
    info(`token: ${token}`);
    console.log("info");

    const PR = getInput("pr_number", { required: true });
    info(`PR: ${PR}`);

    setOutput("pr_updated", "blablabla");
  } catch (error: unknown) {
    if (error instanceof Error) {
      setFailed(error.message);
    }
  }
}

run();
