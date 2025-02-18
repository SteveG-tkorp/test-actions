import { Octokit } from "@octokit/core";

export async function getIssueClosingPR(
  owner: string,
  repo: string,
  octokit: Octokit
) {
  try {
    const query = `query Repository {
    repository(owner: $owner, name: $repo) {
        pullRequest(number: 1248) {
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
    });
    console.log("result", result);

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
