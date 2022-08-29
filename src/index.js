const core = require('@actions/core');
const github = require('@actions/github');

const github_token = core.getInput("action-token");
const entry_target = core.getInput("target-entry");

const prNum = github.context.payload?.pull_request?.number;

const oc = github.getOctokit(github_token);


async function run() {

    if (prNum === undefined) {
        core.info("This workflow run is not triggered by pull pull request");
        return;
    }
    const { data: pr } = await oc.rest.pulls.get(
        {
            ...github.context.repo,
            pull_number: prNum
        }
    );

    const str_target = pr.body.substring(pr.body.lastIndexOf(entry_target) + entry_target.length);
    core.info("The target string is: " + str_target);
}

run();