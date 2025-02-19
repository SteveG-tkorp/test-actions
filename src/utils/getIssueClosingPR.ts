import { Octokit } from "@octokit/core";

export async function getIssueClosingPR(
  owner: string,
  repo: string,
  octokit: Octokit,
  prNumber: number
): Promise<{ closingIssues: any; prId: string }> {
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
    }
}
`;

    const result = await octokit.graphql<any>(query, {
      owner,
      repo,
      prNumber,
    });

    // Vérifiez si des issues fermées sont présentes
    const closingIssues =
      result.repository.pullRequest.closingIssuesReferences.nodes;

    return {
      closingIssues: closingIssues.map((issue: any) => issue.id) ?? [],
      prId: result.repository.pullRequest.id,
    };
  } catch (error) {
    throw error;
  }
}
