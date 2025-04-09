import { Track } from "./Track";

export interface Album {
    name: string;
    artist: string;
    year: number;
    tracks: Track[]; 
  }