import { Todo, TodoList } from "./todo.interface";
import { createMockAxios } from "./create-mock-axios";

const axios = createMockAxios();

export const parseFetchListResponse = (responseData: any): TodoList => {
  const { data } = responseData;
  return data;
};

export const fetchList = async (): Promise<TodoList> => {
  const { data: responseData } = await axios.get("/todos");
  return parseFetchListResponse(responseData);
};

export const postItem = async (item: Todo): Promise<any> => {
  try {
    await axios.post(`/todos`, item);
    return item;
  } catch (e) {
    (e as Error).message = "Oops, something went wrong!";
    throw e;
  }
};

export const putItem = async (item: Todo): Promise<any> => {
  try {
    await axios.put(`/todos`, item);
    return item;
  } catch (e) {
    (e as Error).message = "Oops, something went wrong!";
    throw e;
  }
};

export const deleteItem = async (item: Todo): Promise<any> => {
  try {
    await axios.delete(`/todos`);
    return item;
  } catch (e) {
    (e as Error).message = "Oops, something went wrong!";
    throw e;
  }
};
