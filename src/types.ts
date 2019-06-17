export interface User {
  id: string;
}

export interface TNewItem {
  url: string;
  uid: string;
}

export interface TItem extends TNewItem {
  id: string;
}

export type TData = TItem[];
