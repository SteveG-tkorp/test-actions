import { Octokit } from "@octokit/core";

export async function getPRInfos(
  owner: string,
  repo: string,
  octokit: Octokit
) {
  try {
    const query = ``;

    const result = await octokit.graphql(query);
    console.log("result", result);
  } catch (error) {
    throw error;
  }
}
