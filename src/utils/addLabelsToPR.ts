import { info } from "@actions/core";
import { Octokit } from "@octokit/core";

export async function addLabelsToPR(
  octokit: Octokit,
  prId: string,
  labelsIds: any
) {
  try {
    const query = `mutation AddLabelsToLabelable($prId:ID!, $labelsIds: [ID!]!) {
     clearLabelsFromLabelable(input: { labelableId: $prId }) {
        clientMutationId
    }
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

    await octokit.graphql<any>(query, {
      prId,
      labelsIds,
    });
    info(`Les labels ont été affectés à la PR`);
  } catch (error) {
    throw error;
  }
}
