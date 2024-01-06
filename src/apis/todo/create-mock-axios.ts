import MockAdapter from "axios-mock-adapter";
import Axios from "axios";

export const createMockAxios = () => {
  const axiosInstance = Axios.create();
  const mock = new MockAdapter(axiosInstance, {
    delayResponse: 300,
  });
  mock
    .onGet("/todos")
    .reply(200, {
      data: [
        {
          id: "1",
          text: "Todo 1",
          isDone: false,
        },
        {
          id: "2",
          text: "Todo 2",
          isDone: true,
        },
        {
          id: "3",
          text: "Todo 3",
          isDone: false,
        },
        {
          id: "4",
          text: "Todo 4",
          isDone: false,
        },
      ],
    })
    .onPost("/todos")
    .reply(() => {
      if (Math.random() > 0.1) {
        return [200, {}];
      }
      return [500, {}];
    })
    .onPut("/todos")
    .reply(() => {
      if (Math.random() > 0.1) {
        return [200, {}];
      }
      return [500, {}];
    })
    .onDelete("/todos")
    .reply(() => {
      if (Math.random() > 0.1) {
        return [200, {}];
      }
      return [500, {}];
    });
  return axiosInstance;
};
