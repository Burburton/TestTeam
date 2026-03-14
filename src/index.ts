export const VERSION = '1.0.0';

export interface AgentConfig {
  name: string;
  description: string;
  skills: string[];
}

export const AGENTS: Record<string, AgentConfig> = {
  architect: {
    name: 'architect',
    description: 'Analyzes requirements and designs solutions',
    skills: ['repo-architecture-reader'],
  },
  developer: {
    name: 'developer',
    description: 'Implements features and fixes bugs',
    skills: ['test-first-feature-dev', 'bugfix-playbook'],
  },
  qa: {
    name: 'qa',
    description: 'Validates implementations and ensures quality',
    skills: ['test-first-feature-dev'],
  },
  reviewer: {
    name: 'reviewer',
    description: 'Reviews code for quality and correctness',
    skills: ['safe-refactor-checklist'],
  },
};

export function getAgent(name: string): AgentConfig | undefined {
  return AGENTS[name];
}

export function listAgents(): string[] {
  return Object.keys(AGENTS);
}