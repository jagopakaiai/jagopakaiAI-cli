import { describe, it, expect, vi } from 'vitest';
import axios from 'axios';
import { fetchSkillRule } from './api.js';

vi.mock('axios');

describe('API Utility', () => {
  it('should query API and return rule content', async () => {
    const mockResponse = { data: { content: 'test-rule-content-here' } };
    vi.mocked(axios.get).mockResolvedValueOnce(mockResponse);

    const content = await fetchSkillRule('dummy-key', 'laravel-clean-api');
    expect(content).toBe('test-rule-content-here');
    expect(axios.get).toHaveBeenCalledWith(
      'https://jagopakaiai.my.id/api/skills/laravel-clean-api',
      {
        headers: {
          Authorization: 'Bearer dummy-key'
        }
      }
    );
  });

  it('should fallback to query param or return error message on failure', async () => {
    vi.mocked(axios.get).mockRejectedValueOnce(new Error('Network Error'));

    await expect(fetchSkillRule('dummy-key', 'laravel-clean-api')).rejects.toThrow('Failed to retrieve skill: Network Error');
  });
});
