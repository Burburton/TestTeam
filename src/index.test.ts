import { VERSION, AGENTS, getAgent, listAgents } from './index';

describe('AI Team', () => {
  describe('VERSION', () => {
    it('should be defined', () => {
      expect(VERSION).toBeDefined();
      expect(VERSION).toBe('1.0.0');
    });
  });

  describe('AGENTS', () => {
    it('should have all required agents', () => {
      expect(AGENTS).toHaveProperty('architect');
      expect(AGENTS).toHaveProperty('developer');
      expect(AGENTS).toHaveProperty('qa');
      expect(AGENTS).toHaveProperty('reviewer');
    });

    it('each agent should have required properties', () => {
      Object.values(AGENTS).forEach((agent) => {
        expect(agent).toHaveProperty('name');
        expect(agent).toHaveProperty('description');
        expect(agent).toHaveProperty('skills');
        expect(Array.isArray(agent.skills)).toBe(true);
      });
    });
  });

  describe('getAgent', () => {
    it('should return agent by name', () => {
      const architect = getAgent('architect');
      expect(architect).toBeDefined();
      expect(architect?.name).toBe('architect');
    });

    it('should return undefined for unknown agent', () => {
      const unknown = getAgent('unknown');
      expect(unknown).toBeUndefined();
    });
  });

  describe('listAgents', () => {
    it('should return all agent names', () => {
      const agents = listAgents();
      expect(agents).toContain('architect');
      expect(agents).toContain('developer');
      expect(agents).toContain('qa');
      expect(agents).toContain('reviewer');
      expect(agents).toHaveLength(4);
    });
  });
});