/**
 * In-memory LRU cache for skill content
 *
 * Provides TTL-based caching to reduce filesystem reads during a session
 * while allowing hot-reloading of skill content when files change.
 */

import type { Skill } from './types/index.js';

/** Cache entry with timestamp for TTL tracking */
interface CacheEntry<T> {
  value: T;
  timestamp: number;
  accessCount: number;
}

/** Cache statistics */
export interface CacheStats {
  /** Number of entries currently in cache */
  size: number;
  /** Total cache hits */
  hits: number;
  /** Total cache misses */
  misses: number;
  /** Hit rate percentage */
  hitRate: number;
  /** Cache TTL in milliseconds */
  ttlMs: number;
}

/** Cache configuration */
export interface CacheConfig {
  /** Time-to-live in milliseconds (default: 5 minutes) */
  ttlMs?: number;
  /** Maximum cache entries (default: 100) */
  maxEntries?: number;
  /** Enable cache (default: true) */
  enabled?: boolean;
}

/** Default configuration values */
const DEFAULT_TTL_MS = 5 * 60 * 1000; // 5 minutes
const DEFAULT_MAX_ENTRIES = 100;

/**
 * Generic LRU cache with TTL support
 */
export class LRUCache<T> {
  private cache: Map<string, CacheEntry<T>> = new Map();
  private ttlMs: number;
  private maxEntries: number;
  private enabled: boolean;
  private hits: number = 0;
  private misses: number = 0;

  constructor(config: CacheConfig = {}) {
    this.ttlMs = config.ttlMs ?? DEFAULT_TTL_MS;
    this.maxEntries = config.maxEntries ?? DEFAULT_MAX_ENTRIES;
    this.enabled = config.enabled ?? true;
  }

  /**
   * Get a value from the cache
   */
  get(key: string): T | undefined {
    if (!this.enabled) {
      this.misses++;
      return undefined;
    }

    const entry = this.cache.get(key);
    if (!entry) {
      this.misses++;
      return undefined;
    }

    // Check if entry has expired
    if (Date.now() - entry.timestamp > this.ttlMs) {
      this.cache.delete(key);
      this.misses++;
      return undefined;
    }

    // Update access count and move to end (most recently used)
    entry.accessCount++;
    this.cache.delete(key);
    this.cache.set(key, entry);
    this.hits++;

    return entry.value;
  }

  /**
   * Set a value in the cache
   */
  set(key: string, value: T): void {
    if (!this.enabled) return;

    // Evict oldest entries if at capacity
    while (this.cache.size >= this.maxEntries) {
      const oldestKey = this.cache.keys().next().value;
      if (oldestKey !== undefined) {
        this.cache.delete(oldestKey);
      }
    }

    this.cache.set(key, {
      value,
      timestamp: Date.now(),
      accessCount: 1,
    });
  }

  /**
   * Check if key exists and is not expired
   */
  has(key: string): boolean {
    if (!this.enabled) return false;

    const entry = this.cache.get(key);
    if (!entry) return false;

    if (Date.now() - entry.timestamp > this.ttlMs) {
      this.cache.delete(key);
      return false;
    }

    return true;
  }

  /**
   * Delete a key from the cache
   */
  delete(key: string): boolean {
    return this.cache.delete(key);
  }

  /**
   * Clear all entries from the cache
   */
  clear(): void {
    this.cache.clear();
    this.hits = 0;
    this.misses = 0;
  }

  /**
   * Remove expired entries
   */
  prune(): number {
    const now = Date.now();
    let pruned = 0;

    for (const [key, entry] of this.cache.entries()) {
      if (now - entry.timestamp > this.ttlMs) {
        this.cache.delete(key);
        pruned++;
      }
    }

    return pruned;
  }

  /**
   * Get cache statistics
   */
  getStats(): CacheStats {
    const total = this.hits + this.misses;
    return {
      size: this.cache.size,
      hits: this.hits,
      misses: this.misses,
      hitRate: total > 0 ? (this.hits / total) * 100 : 0,
      ttlMs: this.ttlMs,
    };
  }

  /**
   * Get all cached keys
   */
  keys(): string[] {
    return Array.from(this.cache.keys());
  }
}

/**
 * Skill-specific cache with convenience methods
 */
export class SkillCache extends LRUCache<Skill> {
  /**
   * Get a skill by name
   */
  getSkill(name: string): Skill | undefined {
    return this.get(`skill:${name}`);
  }

  /**
   * Cache a skill
   */
  setSkill(skill: Skill): void {
    this.set(`skill:${skill.name}`, skill);
  }

  /**
   * Check if a skill is cached
   */
  hasSkill(name: string): boolean {
    return this.has(`skill:${name}`);
  }

  /**
   * Invalidate a specific skill
   */
  invalidateSkill(name: string): boolean {
    return this.delete(`skill:${name}`);
  }

  /**
   * Get all cached skill names
   */
  getCachedSkillNames(): string[] {
    return this.keys()
      .filter((key) => key.startsWith('skill:'))
      .map((key) => key.slice(6));
  }
}

// Global skill cache instance
let globalSkillCache: SkillCache | null = null;

/**
 * Get or create the global skill cache
 */
export function getSkillCache(config?: CacheConfig): SkillCache {
  if (!globalSkillCache) {
    globalSkillCache = new SkillCache(config);
  }
  return globalSkillCache;
}

/**
 * Reset the global skill cache (useful for testing)
 */
export function resetSkillCache(): void {
  if (globalSkillCache) {
    globalSkillCache.clear();
  }
  globalSkillCache = null;
}
