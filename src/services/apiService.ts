import { MenArticle } from '../types';
import { INITIAL_MEN_ARTICLES } from '../data/mockDatabase';
import { storageService } from './storageService';

export const apiService = {
  async checkServerHealth(): Promise<boolean> {
    try {
      const response = await fetch('/api/health', {
        method: 'GET',
        headers: { 'Cache-Control': 'no-cache' }
      });
      if (response.ok) {
        const data = await response.json();
        return data.status === 'ok';
      }
      return false;
    } catch (e) {
      return false;
    }
  },

  async fetchMenNews(): Promise<{ news: MenArticle[]; fromCache: boolean }> {
    try {
      const response = await fetch('/api/men-news');
      if (response.ok) {
        const data = await response.json();
        if (data.news && Array.isArray(data.news)) {
          // Cache in localStorage for offline availability
          localStorage.setItem('tafita_cached_men_news', JSON.stringify(data.news));
          return { news: data.news, fromCache: false };
        }
      }
    } catch (e) {
      console.warn('Unable to fetch live MEN news, loading offline cache');
    }

    // Fallback to offline cache
    const cached = localStorage.getItem('tafita_cached_men_news');
    if (cached) {
      try {
        return { news: JSON.parse(cached), fromCache: true };
      } catch (err) {
        // ignore
      }
    }

    return { news: INITIAL_MEN_ARTICLES, fromCache: true };
  },

  async postMenNews(newsData: Partial<MenArticle>): Promise<MenArticle> {
    const response = await fetch('/api/men-news', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newsData)
    });

    if (!response.ok) {
      throw new Error('Failed to publish MEN news article');
    }

    const data = await response.json();
    return data.article;
  },

  async askAiTafita(params: {
    prompt: string;
    language?: 'mg' | 'fr';
    context?: string;
    action?: string;
  }): Promise<string> {
    const response = await fetch('/api/ai-tafita', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(params)
    });

    if (!response.ok) {
      const errJson = await response.json().catch(() => ({}));
      throw new Error(errJson.error || 'AI TAFITA is currently unavailable.');
    }

    const data = await response.json();
    return data.reply;
  },

  async syncPendingData(): Promise<boolean> {
    const queue = storageService.getPendingSyncQueue();
    if (queue.length === 0) return true;

    try {
      const profile = storageService.getUserProfile();
      const response = await fetch('/api/sync', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          userId: profile.id,
          queue,
          timestamp: new Date().toISOString()
        })
      });

      if (response.ok) {
        storageService.clearPendingSyncQueue();
        return true;
      }
      return false;
    } catch (e) {
      return false;
    }
  }
};
