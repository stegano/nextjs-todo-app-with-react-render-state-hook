import type { Meta, StoryObj } from "@storybook/react";

import { RenderStateProvider, Store } from "react-render-state-hook";
import { ITodo } from "@/apis";
import { List as Component } from "./list";

const meta: Meta<typeof Component> = {
  title: "Containers/TodoList/List",
  component: Component,
};

export default meta;

type Story = StoryObj<typeof Component>;

export const Basic: Story = {
  tags: ["autodocs"],
  argTypes: {
    todoList: {
      description: "Todo List Data",
    },
    enableDataUpdateError: {
      description: "Enable Data Update Error",
    },
    dataUpdateErrorMessage: {
      description: "Update Update Error Message",
    },
  },
  args: {
    todoList: [
      {
        id: "1",
        text: "Storybook Todo 1",
        isDone: false,
      },
      {
        id: "2",
        text: "Storybook Todo 2",
        isDone: false,
      },
      {
        id: "3",
        text: "Storybook Todo 3",
        isDone: false,
      },
    ] as ITodo.TodoList,
    enableDataUpdateError: false,
    dataUpdateErrorMessage: "Error has occurred. Please try again later.",
  },
  decorators: [
    (Story, { args }: { args: any }) => {
      return (
        <RenderStateProvider
          store={Store.createStore({ debug: true })}
          dataHandlerExecutorInterceptorList={[
            async (_prevData, dataHandlerExecutor, executorId) => {
              switch (executorId) {
                case "fetchInitData": {
                  await new Promise((resolve) => {
                    setTimeout(resolve, 1000);
                  });
                  return (args as any).todoList;
                }
                case "deleteData":
                case "updateData": {
                  if (args.enableDataUpdateError) {
                    throw new Error(args.dataUpdateErrorMessage);
                  }
                  return dataHandlerExecutor();
                }
                default: {
                  return dataHandlerExecutor();
                }
              }
            },
          ]}
        >
          <Story />
        </RenderStateProvider>
      );
    },
  ],
};
