import type { Meta, StoryObj } from "@storybook/react";

import { RenderStateProvider, Store } from "react-render-state-hook";
import { InputForm as Component } from "./input-form";

const meta: Meta<typeof Component> = {
  title: "Containers/TodoList/InputForm",
  component: Component,
};

export default meta;

type Story = StoryObj<typeof Component>;

export const Basic: Story = {
  tags: ["autodocs"],
  args: {},
  decorators: [
    (Story) => {
      return (
        <RenderStateProvider
          store={Store.createStore({ debug: true })}
          dataHandlerExecutorInterceptorList={[
            async (_prevData, dataHandlerExecutor, executorId) => {
              switch (executorId) {
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
