import { getInput, setFailed } from "@actions/core";
import { context, getOctokit } from "@actions/github";
import { getInfos } from "./utils/mainRequest";
import { getIssueTypes } from "./utils/getIssueTypes";
import { getLabelsIdsToApply } from "./utils/getLabelsToApply";
import { addLabelsToPR } from "./utils/addLabelsToPR";
import { loadConfigFile } from "./utils/loadConfigFile";

async function run() {
  try {
    const token = getInput("GITHUB_TOKEN", { required: true });

    const PRNumber = getInput("pr_number", { required: false });

    const configPath =
      getInput("labels_config_path", { required: true }) ||
      ".github/labels-config.json";

    loadConfigFile(configPath);
    const owner = context.repo.owner;

    const repo = context.repo.repo;

    const octokit = getOctokit(token);

    // Récupérer les informations principales
    const { closingIssues, prId, labels } = await getInfos(
      owner,
      repo,
      octokit,
      Number(PRNumber)
    );

    // Récupérer les types
    const types = await Promise.all(
      closingIssues.map((issueId: string) => getIssueTypes(octokit, issueId))
    );

    // Récupérer les ids des labels à appliquer
    const labelsIdsFromTypes: string[] = types.map((type: string) =>
      getLabelsIdsToApply(type, labels)
    );

    // Appliquer les labels à la PR
    await addLabelsToPR(octokit, prId, labelsIdsFromTypes);
  } catch (error: unknown) {
    console.error(error);
    if (error instanceof Error) {
      setFailed(error.message);
    }
  }
}

run();
