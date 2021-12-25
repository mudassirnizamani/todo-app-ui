export interface IItem {
  ID: string;
  CreatedAt: string;
  UpdatedAt: string;
  DeletedAt: string;
  title: string;
  description: string;
  completed: boolean;
  listId: string;
}
