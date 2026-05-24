import { describe, it, expect } from 'vitest';
import worldCupData from '@/data/worldcup.json';

describe('worldcup.json Data Integrity', () => {
  it('should have at least one team', () => {
    expect(worldCupData.teams.length).toBeGreaterThan(0);
  });

  it('every team should have required fields', () => {
    worldCupData.teams.forEach((team) => {
      expect(team).toHaveProperty('id');
      expect(team).toHaveProperty('name');
      expect(team).toHaveProperty('group');
      expect(team).toHaveProperty('badge_image');
      expect(team).toHaveProperty('theme_color');
      expect(team).toHaveProperty('players');
      expect(Array.isArray(team.players)).toBe(true);
    });
  });

  it('every player should have required fields', () => {
    worldCupData.teams.forEach((team) => {
      team.players.forEach((player) => {
        expect(player).toHaveProperty('id');
        expect(player).toHaveProperty('name');
        expect(player).toHaveProperty('jersey_number');
        expect(player).toHaveProperty('stats');
        expect(player.stats).toHaveProperty('career_goals');
        expect(player.stats).toHaveProperty('world_cup_goals');
      });
    });
  });
});
