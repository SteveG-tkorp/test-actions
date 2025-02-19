import { Octokit } from "@octokit/core";

export async function getIssueClosingPR(
  owner: string,
  repo: string,
  octokit: Octokit,
  prNumber: number
) {
  try {
    const query = `query Repository($owner: String!, $repo: String!, $prNumber: Int!) {
    repository(owner: $owner, name: $repo) {
        pullRequest(number: $prNumber) {
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
    console.log("result", result);

    console.log('result.repository.pullRequest.closingIssuesReferences', result.repository.pullRequest.closingIssuesReferences)

    // Vérifiez si des issues fermées sont présentes
    const closingIssues =
      result.repository.pullRequest.closingIssuesReferences.nodes;
    if (closingIssues.length > 0) {
      console.log(
        "Closing Issues IDs:",
        closingIssues.map((issue: any) => issue.id)
      );
    } else {
      console.log("No closing issues found.");
    }
  } catch (error) {
    throw error;
  }
}
