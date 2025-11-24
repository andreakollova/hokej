export enum MatchStatus {
  UPCOMING = 'UPCOMING',
  LIVE = 'LIVE',
  FINAL = 'FINAL'
}

export interface Team {
  id: string;
  name: string;
  shortName: string;
  logo: string;
  record?: string;
}

export type MatchCategory = 'MUŽI' | 'ŽENY' | 'U18' | 'U14' | 'U12' | 'U10' | 'REPRE' | 'U21' | 'U15';

export interface Match {
  id: string;
  homeTeam: Team;
  awayTeam: Team;
  date: string; // Display string like "Dnes", "12.05"
  rawDate?: Date; // For sorting if needed
  time: string;
  venue: string;
  competition: string;
  category: MatchCategory;
  status: MatchStatus;
  scoreHome?: number;
  scoreAway?: number;
  period?: string; // e.g., "2. štvrtina", "Koniec"
  timeRemaining?: string; // e.g., "14:20"
  highlightsUrl?: string;
}

export interface Player {
  id: string;
  name: string;
  position: string;
  number: number;
  club: string;
  photo: string;
  caps: number;
  goals: number;
  isCaptain?: boolean;
}

export interface NewsItem {
  id: string;
  title: string;
  snippet: string;
  date: string;
  category: string;
  imageUrl: string;
}

export interface StatLeader {
  playerId: string;
  name: string;
  value: number;
  metric: string;
}

export interface NavItem {
  id: string;
  label: string;
  children?: NavItem[];
}

export interface Partner {
  id: string;
  name: string;
  logo: string;
}

export interface InstagramPost {
  id: string;
  imageUrl: string;
  caption: string;
  likes: number;
}

export interface VideoItem {
  id: string;
  title: string;
  thumbnail: string;
  duration: string;
}