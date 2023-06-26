import axios, { AxiosInstance, CreateAxiosDefaults } from 'axios';

export class RecommendationProvider {
  readonly client: AxiosInstance;
  private openAIkey: string = process.env.OPEN_AI_KEY;
  private openAIUrl: string = process.env.OPEN_AI_URL;

  constructor() {
    const defaultConfig: CreateAxiosDefaults<any> = {
      timeout: 5000,
      headers: {
        accept: 'application/json',
        Authorization: `Bearer ${this.openAIkey}`,
      },
    };

    if (!this.openAIkey) {
      throw Error('OPEN AI KEY NOT FOUND');
    }

    this.client = axios.create({
      ...defaultConfig,
      baseURL: String(this.openAIUrl).replace(/\/$/, ''),
    });
  }
}
