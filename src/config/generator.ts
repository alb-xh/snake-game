import crypto from 'crypto';
import type { ConfigData } from './types.js';

export default class ConfigGenerator {
  static pickRandomNumber (min: number, max: number) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  static pickRandom<T> (arr: T[]): T {
    const index = Math.floor(this.pickRandomNumber(0, arr.length - 1));
    return arr[index]; 
  }

  static generateId (length: number): string {
    return crypto.randomBytes(Math.ceil(length / 2)).toString('hex');
  }

  static generateUsername (): string {
    const adjectives = ['Cool', 'Happy', 'Swift', 'Brave', 'Clever', 'Wild', 'Silent', 'Mighty'];
    const nouns = ['Tiger', 'Dragon', 'Eagle', 'Panda', 'Wolf', 'Shark', 'Falcon', 'Bear'];
    
    return `${this.pickRandom(adjectives)}${this.pickRandom(nouns)}_${this.generateId(6)}`;
  }

  static generateToken (): string {
    return this.generateId(64);
  }

  static generateConfig (): ConfigData {
    return {
      user: this.generateUsername(),
      token: this.generateToken(),
      record: 0,
    }
  }
}
