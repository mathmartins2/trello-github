import { GitHubService } from './GitHubService';

export class TrelloService {
  private readonly gitHubService = new GitHubService(process.env.GITHUB_TOKEN!);

  async handleWebhook(payload: any) {
    const card = payload.board;
    const listAfter = payload.list;

    switch (listAfter) {
      case 'In Progress':
        await this.gitHubService.createBranch(card);
        break;
      case 'Test':
        await this.gitHubService.createPullRequest(
          'develop',
          card,
          `Changes for ${card}`
        );
        break;
      case 'Done':
        await this.gitHubService.createPullRequest(
          'mediator',
          card,
          `Changes for ${card}`
        );
        break;
      default:
        console.log(`No action for list: ${listAfter}`);
        break;
    }
  }
}

export const trelloService = new TrelloService();
