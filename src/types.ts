export interface TNewItem {
  url: string,
}

export interface TItem extends TNewItem{
  id: string,
}

export type TData = TItem[]
