import { RecommendationProvider } from './recomendation.provider';

export class RecommendationService {
  private readonly recommendation: RecommendationProvider;

  constructor() {
    this.recommendation = new RecommendationProvider();
  }

  async getRecommendation(prompt: string) {
    const result = await this.recommendation.client.post('/completions', {
      body: {
        model: 'gpt-3.5',
        messages: [{ role: 'user', content: prompt }],
        temperature: 0.7,
      },
    });
    console.log(result);
  }
}
