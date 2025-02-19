import { Octokit } from "@octokit/core";
import { label } from "./types";

export async function addLabelsToPR(
  // owner: string,
  // repo: string,
  octokit: Octokit,
  prId: string,
  labelsIds: any
) {
  console.log("labels", labelsIds);
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
