import { Octokit } from "@octokit/core";
import { issue } from "./types";

export async function getInfos(
  owner: string,
  repo: string,
  octokit: Octokit,
  prNumber: number
): Promise<{ closingIssuesIds: string[]; prId: string; labels: any }> {
  try {
    const query = `query Repository($owner: String!, $repo: String!, $prNumber: Int!) {
    repository(owner: $owner, name: $repo) {
        pullRequest(number: $prNumber) {
        id
            closingIssuesReferences(first: 1) {
                nodes {
                    id    
                }
            }
        }
        labels(first: 100) {
        totalCount
            nodes {
                id
                name
            }
        }
    }
}
`;

    const result = await octokit.graphql<any>(query, {
      owner,
      repo,
      prNumber,
    });

    const closingIssues =
      result.repository.pullRequest.closingIssuesReferences.nodes;

    if (closingIssues.length === 0) {
      throw new Error("Aucune issue liée à la PR");
    }
    return {
      closingIssuesIds: closingIssues.map((issue: issue) => issue.id) ?? [],
      prId: result.repository.pullRequest.id,
      labels: result.repository.labels.nodes,
    };
  } catch (error) {
    throw error;
  }
}
