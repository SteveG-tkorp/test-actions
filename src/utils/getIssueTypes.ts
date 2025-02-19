import { Octokit } from "@octokit/core";

export async function getIssueTypes(
  // owner: string,
  // repo: string,
  octokit: Octokit,
  issueId: string
) {
  try {
    const query = `query Node($issueId: ID!) {
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
      headers: {
        "GraphQL-Features": "issue_types",
      },
    });
    console.log("result", result);

    // Vérifiez si des issues fermées sont présentes
    const issueType = result.node.issueType;
    if (issueType) {
      console.log("issueType", issueType.name);
      return issueType.name;
    } else {
      throw new Error("Pas de type défini pour cette issue");
    }
  } catch (error) {
    throw error;
  }
}
