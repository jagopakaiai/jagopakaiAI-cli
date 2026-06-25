import axios from 'axios';

export async function fetchSkillRule(apiKey: string, skillName: string): Promise<string> {
  const url = `https://jagopakaiai.my.id/api/skills/${encodeURIComponent(skillName)}`;
  try {
    const response = await axios.get(url, {
      headers: {
        'Authorization': `Bearer ${apiKey}`
      }
    });
    
    // Support standard content or content fallback
    if (response.data && typeof response.data.content === 'string') {
      return response.data.content;
    } else if (response.data && typeof response.data.rules === 'string') {
      return response.data.rules;
    } else {
      throw new Error('API response did not return rule content in expected format.');
    }
  } catch (error: any) {
    // In case path parameter returns 404, we can attempt query parameter fallback
    const fallbackUrl = `https://jagopakaiai.my.id/api/skills?name=${encodeURIComponent(skillName)}`;
    try {
      const fallbackRes = await axios.get(fallbackUrl, {
        headers: {
          'Authorization': `Bearer ${apiKey}`
        }
      });
      if (fallbackRes.data && typeof fallbackRes.data.content === 'string') {
        return fallbackRes.data.content;
      } else if (fallbackRes.data && Array.isArray(fallbackRes.data)) {
        // If the list is returned, find by name
        const found = fallbackRes.data.find((s: any) => s.name === skillName || s.slug === skillName);
        if (found && typeof found.content === 'string') return found.content;
      }
    } catch {}

    throw new Error(`Failed to retrieve skill: ${error.message || error}`);
  }
}
