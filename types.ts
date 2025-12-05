export interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

export interface GuestWish {
  name: string;
  relationship: string;
  message: string;
}

export enum Section {
  COVER = 'COVER',
  SAVE_THE_DATE = 'SAVE_THE_DATE',
  DETAILS = 'DETAILS',
  AI_WISHES = 'AI_WISHES',
  RSVP = 'RSVP'
}