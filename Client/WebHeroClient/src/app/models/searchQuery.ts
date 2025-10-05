export interface TextFilter {
  value: string;
  exact: boolean;
  exclude: boolean;
}

export type Source = 'website' | 'bridge' | 'api';

export class SearchQuery {
  instrument: string | null = null;
  difficulty: string | null = null;
  drumType: string | null = null;
  drumsReviewed: boolean = false;
  sort: string | null = null;
  source: Source = 'website'; // default to a valid value

  name: TextFilter = { value: '', exact: false, exclude: false };
  artist: TextFilter = { value: '', exact: false, exclude: false };
  album: TextFilter = { value: '', exact: false, exclude: false };
  genre: TextFilter = { value: '', exact: false, exclude: false };
  year: TextFilter = { value: '', exact: false, exclude: false };
  charter: TextFilter = { value: '', exact: false, exclude: false };

  minLength: number | null = null;
  maxLength: number | null = null;
  minIntensity: number | null = null;
  maxIntensity: number | null = null;
  minAverageNPS: number | null = null;
  maxAverageNPS: number | null = null;
  minMaxNPS: number | null = null;
  maxMaxNPS: number | null = null;
  minYear: number | null = null;
  maxYear: number | null = null;

  modifiedAfter: string = '';
  hash: string = '';
  trackHash: string = '';

  hasSoloSections: boolean | null = null;
  hasForcedNotes: boolean | null = null;
  hasOpenNotes: boolean | null = null;
  hasTapNotes: boolean | null = null;
  hasLyrics: boolean | null = null;
  hasVocals: boolean | null = null;
  hasRollLanes: boolean | null = null;
  has2xKick: boolean | null = null;
  hasIssues: boolean | null = null;
  hasVideoBackground: boolean | null = null;
  modchart: boolean | null = null;

  page: number = 1;

  constructor(data?: Partial<SearchQuery>) {
    if (!data) return;

    // copy primitives first
    Object.assign(this, data);

    // validate / normalize source: avoid null or invalid strings
    const allowed: Source[] = ['website', 'bridge', 'api'];
    if (data.source == null || !allowed.includes(data.source as Source)) {
      this.source = 'website';
    } else {
      this.source = data.source as Source;
    }

    // ensure nested TextFilter objects have defaults
    const defaults: TextFilter = { value: '', exact: false, exclude: false };
    this.name = { ...defaults, ...(data.name ?? {}) };
    this.artist = { ...defaults, ...(data.artist ?? {}) };
    this.album = { ...defaults, ...(data.album ?? {}) };
    this.genre = { ...defaults, ...(data.genre ?? {}) };
    this.year = { ...defaults, ...(data.year ?? {}) };
    this.charter = { ...defaults, ...(data.charter ?? {}) };
  }

  static fromJSON(obj: any): SearchQuery {
    return new SearchQuery(obj);
  }

  // optional: when serializing, remove null fields so server validation sees only concrete values
  toJSON(): any {
    const clone: any = { ...this };
    for (const k of Object.keys(clone)) {
      if (clone[k] === null || clone[k] === undefined) delete clone[k];
    }
    return clone;
  }
}