import { describe } from "node:test";
import { parseFetchListResponse } from "./todo";

describe("Todo API", () => {
  it("parseFetchListResponse", () => {
    expect(
      parseFetchListResponse({
        data: "test",
      }),
    ).toBe("test");
  });
});
