import { render } from "@testing-library/react-native";
import React from "react";

import HomeScreen from "../../src/screens/HomeScreen";

describe("App", () => {
  it("App-komponenten innehåller viss text", () => {
    const { getByText } = render(
      <HomeScreen navigation={undefined} route={undefined} />
    );

    const textElement = getByText("HomeScreen");
    expect(textElement).toBeDefined();
  });
});

describe("App", () => {
  it("should have a grayish background", () => {
    const { getByTestId } = render(
      <HomeScreen navigation={undefined} route={undefined} />
    );

    const appContainer = getByTestId("app-container");

    expect(appContainer.props.style.backgroundColor).toBe("#f0f0f0");
  });
});
