import { Octokit } from "@octokit/core";

export async function getIssueClosingPR(
  owner: string,
  repo: string,
  octokit: Octokit,
  prNumber: number
): Promise<{ closingIssues: any; prId: string; labels: any }> {
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

    return {
      closingIssues: closingIssues.map((issue: any) => issue.id) ?? [],
      prId: result.repository.pullRequest.id,
      labels: result.repository.labels,
    };
  } catch (error) {
    throw error;
  }
}
