export interface AlbumSongsSearch {
  resultCount: number;
  results: Result[];
}

export interface Result {
  wrapperType: WrapperType;
  collectionType?: string;
  artistId: number;
  collectionId: number;
  artistName: string;
  collectionName: CollectionName;
  collectionCensoredName: CollectionName;
  collectionViewUrl: string;
  artworkUrl60: string;
  artworkUrl100: string;
  collectionPrice: number;
  collectionExplicitness: Explicitness;
  trackCount: number;
  copyright?: string;
  country: Country;
  currency: Currency;
  releaseDate: Date;
  primaryGenreName: string;
  kind?: Kind;
  trackId?: number;
  trackName?: string;
  trackCensoredName?: string;
  collectionArtistId?: number;
  collectionArtistName?: CollectionArtistName;
  artistViewUrl?: string;
  trackViewUrl?: string;
  previewUrl?: string;
  artworkUrl30?: string;
  trackPrice?: number;
  trackExplicitness?: Explicitness;
  discCount?: number;
  discNumber?: number;
  trackNumber?: number;
  trackTimeMillis?: number;
  isStreamable?: boolean;
}

export type CollectionArtistName = string;

export type CollectionName = string;

export type Explicitness = string;

export type Country = string;

export type Currency = string;

export type Kind = string;

export type WrapperType = string;
