import { Octokit } from "@octokit/core";

export async function getPRInfos(
  owner: string,
  repo: string,
  octokit: Octokit
) {
  try {
    const query = `query Repository {
    repository(owner: $owner, name: $repo) {
        pullRequests {
            totalCount
            nodes {
                title
                number
            }
        }
    }
}
`;

    const result = await octokit.graphql(query, { variables: { owner, repo } });
    console.log("result", result);
  } catch (error) {
    throw error;
  }
}
