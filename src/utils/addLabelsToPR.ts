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
  } catch (error) {
    throw error;
  }
}
