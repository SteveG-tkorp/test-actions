import { Octokit } from "@octokit/core";

export async function getIssueTypes(octokit: Octokit, issueId: string) {
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
      issueId,
      headers: {
        "GraphQL-Features": "issue_types",
      },
    });

    const issueType = result.node.issueType;
    if (issueType) {
      return issueType.name;
    } else {
      throw new Error("Pas de type défini pour cette issue");
    }
  } catch (error) {
    throw error;
  }
}
