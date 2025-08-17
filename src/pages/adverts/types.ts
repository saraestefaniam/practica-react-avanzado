export interface Advert {
  id: string;
  name: string;
  price: number;
  sale: boolean;
  tags: string[];
  photo?: string;
}

export interface Tag {
  name: string;
}