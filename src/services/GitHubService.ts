import { Octokit } from "@octokit/rest";

export class GitHubService  {
  private octokit: Octokit;

  constructor(pat: string) {
    this.octokit = new Octokit({ auth: pat });
  }

  async createBranch(branchName: string): Promise<void> {
    try {
      const { data } = await this.octokit.git.getRef({
        owner: process.env.GITHUB_OWNER!,
        repo: process.env.GITHUB_REPO!,
        ref: "heads/mediator"
      })
      const response = await this.octokit.git.createRef({
        owner: process.env.GITHUB_OWNER!,
        repo: process.env.GITHUB_REPO!,
        ref: `refs/heads/${branchName}`,
        sha: data.object.sha
      });
      console.log(
        `Branch created successfully with ref: ${response.data.ref}`
      );
    } catch (error: any) {
      console.error(error);
      throw new Error(`Failed to create branch: ${error.message}`);
    }
  }
  
  async createPullRequest(base: string, head: string, title: string): Promise<void> {
    try {
      const response = await this.octokit.pulls.create({
        owner: process.env.GITHUB_OWNER!,
        repo: process.env.GITHUB_REPO!,
        title,
        head,
        base
      });
      console.log(
        `Pull request created successfully with URL: ${response.data.html_url}`
      );
    } catch (error: any) {
      console.error(error);
      throw new Error(`Failed to create pull request: ${error.message}`);
    }
  }
}
