import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import fs from 'fs';
import path from 'path';
import { saveApiKey, getApiKey, deleteApiKey } from './config.js';

describe('Config Utility', () => {
  beforeEach(() => {
    deleteApiKey();
  });

  afterEach(() => {
    deleteApiKey();
  });

  it('should save and retrieve the API key', () => {
    const testKey = 'test-api-key-12345';
    saveApiKey(testKey);
    expect(getApiKey()).toBe(testKey);
  });

  it('should return null when key does not exist', () => {
    expect(getApiKey()).toBeNull();
  });
});
