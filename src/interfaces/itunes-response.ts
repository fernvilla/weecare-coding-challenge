export interface ItunesResponse {
  feed: Feed;
}

export interface Feed {
  author: Author;
  entry: AlbumEntry[];
  updated: Icon;
  rights: Icon;
  title: Icon;
  icon: Icon;
  link: Link[];
  id: Icon;
}

export interface Author {
  name: Icon;
  uri: Icon;
}

export interface Icon {
  label: string;
}

export interface AlbumEntry {
  'im:name': Icon;
  'im:image': IMImage[];
  'im:itemCount': Icon;
  'im:price': IMPrice;
  'im:contentType': EntryIMContentType;
  rights: Icon;
  title: Icon;
  link: Link;
  id: ID;
  'im:artist': IMArtist;
  category: Category;
  'im:releaseDate': IMReleaseDate;
}

export interface Category {
  attributes: CategoryAttributes;
}

export interface CategoryAttributes {
  'im:id': string;
  term: string;
  scheme: string;
  label: string;
}

export interface ID {
  label: string;
  attributes: IDAttributes;
}

export interface IDAttributes {
  'im:id': string;
}

export interface IMArtist {
  label: string;
  attributes?: IMArtistAttributes;
}

export interface IMArtistAttributes {
  href: string;
}

export interface EntryIMContentType {
  'im:contentType': IMContentTypeIMContentType;
  attributes: IMContentTypeAttributes;
}

export interface IMContentTypeAttributes {
  term: Label;
  label: Label;
}

export type Label = 'Music' | 'Album';

export interface IMContentTypeIMContentType {
  attributes: IMContentTypeAttributes;
}

export interface IMImage {
  label: string;
  attributes: IMImageAttributes;
}

export interface IMImageAttributes {
  height: string;
}

export interface IMPrice {
  label: string;
  attributes: IMPriceAttributes;
}

export interface IMPriceAttributes {
  amount: string;
  currency: Currency;
}

export type Currency = 'USD';

export interface IMReleaseDate {
  label: string;
  attributes: Icon;
}

export interface Link {
  attributes: LinkAttributes;
}

export interface LinkAttributes {
  rel: Rel;
  type?: Type;
  href: string;
}

export type Rel = 'alternate' | 'self';

export type Type = 'text/html';
