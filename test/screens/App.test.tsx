import { render } from "@testing-library/react-native";
import React from "react";

import HomeScreen from "../../src/screens/home/HomeScreen";

describe("App", () => {
  it("should have a grayish background", () => {
    const { getByTestId } = render(
      <HomeScreen navigation={undefined} route={undefined} />
    );

    const appContainer = getByTestId("app-container");

    expect(appContainer.props.style.backgroundColor).toBe("#f0f0f0");
  });
});
