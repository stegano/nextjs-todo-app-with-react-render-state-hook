export interface Todo {
  id: string;
  text: string;
  isDone: boolean;
}

export interface TodoList extends Array<Todo> {}
