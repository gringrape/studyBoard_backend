import { db } from './base';

describe('database connection and basic query method test', () => {
  describe('database connection test', () => {
    it('returned server version should be valid', async () => {
      expect((await db.connect()).client.serverVersion).toBe('12.3');
    });
  });
});