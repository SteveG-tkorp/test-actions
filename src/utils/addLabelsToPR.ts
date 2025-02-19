import { Octokit } from "@octokit/core";
import { label } from "./types";

export async function addLabelsToPR(
  // owner: string,
  // repo: string,
  octokit: Octokit,
  prId: string,
  labels: any
) {
  console.log("labels", labels);
  try {
    const query = `mutation AddLabelsToLabelable($prId:ID!, $labelsIds: [ID!]!) {
    addLabelsToLabelable(
        input: {
            labelableId: $prId
            labelIds: $labelsIds
        }
    ) {
        clientMutationId
    }
}
`;

    const labelsIds = labels.map((label: label) => label.id);
    console.log("labelsIds", labelsIds);
    const result = await octokit.graphql<any>(query, {
      // owner,
      // repo,
      prId,
      labelsIds,
      // headers: {
      //   "GraphQL-Features": "issue_types",
      // },
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
