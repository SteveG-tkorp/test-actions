import { Octokit } from "@octokit/core";

export async function getIssueTypes(
  // owner: string,
  // repo: string,
  octokit: Octokit,
  issueId: string
) {
  try {
    const query = `query Node($issueId: String!) {
    node(id: $issueId) {
        id
        ... on Issue {
            issueType {
                name
            }
            title
            number
        }
    }
}
`;

    const result = await octokit.graphql<any>(query, {
      // owner,
      // repo,
      issueId,
    });
    console.log("result", result);

    // Vérifiez si des issues fermées sont présentes
    const issueType = result.issueType;
    console.log("issueType", issueType);
  } catch (error) {
    throw error;
  }
}
