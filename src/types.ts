export type ColumnType = string;

export interface Stamp {
  by: string;
  at: string;
}

export interface Label {
  name: string;
  color: string;
}

export interface Card {
  id: string;
  title: string;
  description: string;
  columnId: string;
  icon?: string;
  assignee?: string;
  labels: Label[];
  created: Stamp;
  completed?: Stamp;
}

export interface Column {
  id: string;
  name: string;
  icon?: string;
  order: number;
}

export interface Board {
  id: string;
  name: string;
  columns: Column[];
  cards: Card[];
  createdAt: string;
}

export interface KandoData {
  version: string;
  boards: Board[];
  settings: {
    user: string;
    theme?: string;
    showIcons: boolean;
  };
}

export const DEFAULT_COLUMNS: Column[] = [
  { id: 'backlog', name: 'Backlog', icon: '○', order: 0 },
  { id: 'in-progress', name: 'In Progress', icon: '◐', order: 1 },
  { id: 'done', name: 'Done', icon: '●', order: 2 }
];

export const LABEL_COLORS = [
  'red', 'orange', 'yellow', 'green', 'blue', 'purple', 'pink'
];
