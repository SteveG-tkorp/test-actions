import { getInput } from "@actions/core";
import { context } from "@actions/github";

async function run() {
  try {
    const token = getInput("GITHUB_TOKEN", { required: true });
    console.log("token", token);

    const repository = context.payload.repository;
    console.log("repo", repository);
  } catch (error) {
    console.error(error);
  }
}
