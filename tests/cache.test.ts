/**
 * Tests for the cache module
 */

import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { LRUCache, SkillCache, getSkillCache, resetSkillCache } from '../src/cache.js';
import type { Skill } from '../src/types/index.js';

describe('LRUCache', () => {
  let cache: LRUCache<string>;

  beforeEach(() => {
    cache = new LRUCache<string>({ ttlMs: 1000, maxEntries: 3 });
  });

  it('should store and retrieve values', () => {
    cache.set('key1', 'value1');
    expect(cache.get('key1')).toBe('value1');
  });

  it('should return undefined for missing keys', () => {
    expect(cache.get('nonexistent')).toBeUndefined();
  });

  it('should track hits and misses', () => {
    cache.set('key1', 'value1');
    cache.get('key1'); // hit
    cache.get('key1'); // hit
    cache.get('missing'); // miss

    const stats = cache.getStats();
    expect(stats.hits).toBe(2);
    expect(stats.misses).toBe(1);
    expect(stats.hitRate).toBeCloseTo(66.67, 1);
  });

  it('should evict oldest entries when at capacity', () => {
    cache.set('key1', 'value1');
    cache.set('key2', 'value2');
    cache.set('key3', 'value3');
    cache.set('key4', 'value4'); // should evict key1

    expect(cache.get('key1')).toBeUndefined();
    expect(cache.get('key2')).toBe('value2');
    expect(cache.get('key4')).toBe('value4');
  });

  it('should expire entries after TTL', async () => {
    vi.useFakeTimers();

    cache.set('key1', 'value1');
    expect(cache.get('key1')).toBe('value1');

    // Advance time past TTL
    vi.advanceTimersByTime(1500);

    expect(cache.get('key1')).toBeUndefined();

    vi.useRealTimers();
  });

  it('should correctly report has() for valid and expired entries', async () => {
    vi.useFakeTimers();

    cache.set('key1', 'value1');
    expect(cache.has('key1')).toBe(true);
    expect(cache.has('nonexistent')).toBe(false);

    // Advance time past TTL
    vi.advanceTimersByTime(1500);

    expect(cache.has('key1')).toBe(false);

    vi.useRealTimers();
  });

  it('should delete entries', () => {
    cache.set('key1', 'value1');
    expect(cache.delete('key1')).toBe(true);
    expect(cache.get('key1')).toBeUndefined();
    expect(cache.delete('nonexistent')).toBe(false);
  });

  it('should clear all entries', () => {
    cache.set('key1', 'value1');
    cache.set('key2', 'value2');
    cache.get('key1'); // add a hit

    cache.clear();

    expect(cache.get('key1')).toBeUndefined();
    expect(cache.get('key2')).toBeUndefined();
    const stats = cache.getStats();
    expect(stats.size).toBe(0);
    expect(stats.hits).toBe(0);
    expect(stats.misses).toBe(2); // from the gets after clear
  });

  it('should prune expired entries', async () => {
    vi.useFakeTimers();

    cache.set('key1', 'value1');
    cache.set('key2', 'value2');

    vi.advanceTimersByTime(1500);

    const pruned = cache.prune();
    expect(pruned).toBe(2);
    expect(cache.getStats().size).toBe(0);

    vi.useRealTimers();
  });

  it('should return all keys', () => {
    cache.set('key1', 'value1');
    cache.set('key2', 'value2');

    const keys = cache.keys();
    expect(keys).toContain('key1');
    expect(keys).toContain('key2');
    expect(keys.length).toBe(2);
  });

  it('should not cache when disabled', () => {
    const disabledCache = new LRUCache<string>({ enabled: false });
    disabledCache.set('key1', 'value1');
    expect(disabledCache.get('key1')).toBeUndefined();
    expect(disabledCache.has('key1')).toBe(false);
  });

  it('should move accessed entries to end (LRU behavior)', () => {
    cache.set('key1', 'value1');
    cache.set('key2', 'value2');
    cache.set('key3', 'value3');

    // Access key1 to move it to end
    cache.get('key1');

    // Add new entry, should evict key2 (oldest)
    cache.set('key4', 'value4');

    expect(cache.get('key1')).toBe('value1'); // should still exist
    expect(cache.get('key2')).toBeUndefined(); // should be evicted
    expect(cache.get('key3')).toBe('value3');
    expect(cache.get('key4')).toBe('value4');
  });
});

describe('SkillCache', () => {
  let skillCache: SkillCache;

  const mockSkill: Skill = {
    name: 'prd',
    description: 'Product Requirements Document',
    phase: 'deliver',
    path: '/test/path',
    metadata: {
      name: 'prd',
      description: 'Product Requirements Document',
      license: 'Apache-2.0',
      metadata: {
        category: 'documentation',
        frameworks: [],
        author: 'test',
        version: '1.0.0',
      },
    },
    instructions: 'Test instructions',
    template: 'Test template',
    example: 'Test example',
  };

  beforeEach(() => {
    skillCache = new SkillCache({ ttlMs: 1000, maxEntries: 10 });
  });

  it('should store and retrieve skills', () => {
    skillCache.setSkill(mockSkill);
    const retrieved = skillCache.getSkill('prd');
    expect(retrieved).toEqual(mockSkill);
  });

  it('should check if skill is cached', () => {
    skillCache.setSkill(mockSkill);
    expect(skillCache.hasSkill('prd')).toBe(true);
    expect(skillCache.hasSkill('nonexistent')).toBe(false);
  });

  it('should invalidate specific skills', () => {
    skillCache.setSkill(mockSkill);
    expect(skillCache.invalidateSkill('prd')).toBe(true);
    expect(skillCache.getSkill('prd')).toBeUndefined();
  });

  it('should return cached skill names', () => {
    skillCache.setSkill(mockSkill);
    skillCache.setSkill({ ...mockSkill, name: 'hypothesis' });

    const names = skillCache.getCachedSkillNames();
    expect(names).toContain('prd');
    expect(names).toContain('hypothesis');
    expect(names.length).toBe(2);
  });
});

describe('Global Skill Cache', () => {
  beforeEach(() => {
    resetSkillCache();
  });

  afterEach(() => {
    resetSkillCache();
  });

  it('should create a singleton cache', () => {
    const cache1 = getSkillCache();
    const cache2 = getSkillCache();
    expect(cache1).toBe(cache2);
  });

  it('should accept config on first call', () => {
    const cache = getSkillCache({ ttlMs: 30000 });
    const stats = cache.getStats();
    expect(stats.ttlMs).toBe(30000);
  });

  it('should reset the cache', () => {
    const cache1 = getSkillCache();
    cache1.set('skill:test', {} as Skill);

    resetSkillCache();

    const cache2 = getSkillCache();
    expect(cache2.get('skill:test')).toBeUndefined();
    expect(cache1).not.toBe(cache2);
  });
});
