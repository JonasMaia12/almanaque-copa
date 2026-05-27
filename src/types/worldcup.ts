export interface TeamHistory {
  summary: string;
  milestones: string;
}

export interface TeamCulture {
  traditional_food: string;
  curiosity: string;
}

export interface PlayerStats {
  career_goals: number;
  world_cups_played: number;
  world_cup_goals: number;
  historical_fact: string;
}

export interface Player {
  id: string;
  name: string;
  jersey_number: number;
  position: string;
  age: number;
  current_club: string;
  illustration_url: string;
  short_bio: string;
  stats: PlayerStats;
}

export interface LegendaryPlayer {
  id: string;
  name: string;
  jersey_number: number;
  position: string;
  era: string;
  current_club: string;
  illustration_url: string;
  short_bio: string;
  stats: PlayerStats;
}

export interface Team {
  id: string;
  name: string;
  group: string;
  badge_image: string;
  theme_color: string;
  titles_count: number;
  manager: string;
  history: TeamHistory;
  culture: TeamCulture;
  players: Player[];
  legendary_player?: LegendaryPlayer;
}

export interface WorldCupData {
  teams: Team[];
}
