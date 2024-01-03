// import { render } from "@testing-library/react-native";
// import React from "react";

// import App from "../../App";

// describe("App", () => {
//   it("App-komponenten innehåller viss text", () => {
//     const { getByText } = render(<App />);

//     const textElement = getByText(
//       "Open up App.tsx to start working on your app!"
//     );
//     expect(textElement).toBeDefined();
//   });
// });

// describe("App", () => {
//   it("should have a white background", () => {
//     const { getByTestId } = render(<App />);

//     const appContainer = getByTestId("app-container");

//     expect(appContainer.props.style.backgroundColor).toBe("#fff");
//   });
// });

import TabNavigator from "@/src/navigation/TabNavigator";
import * as ReactNavigation from "@react-navigation/native";
import { render } from "@testing-library/react-native";
import {
  MockBirthdaysMessagesStackNavigator,
  MockContactsStackNavigator,
} from "./App-components.test";

jest.mock("@/src/navigation/BirthdayMessagesNavigator", () => ({
  __esModule: true,
  default: jest.fn().mockReturnValue(<MockBirthdaysMessagesStackNavigator />),
}));

jest.mock("@/src/navigation/ContactsNavigator", () => ({
  __esModule: true,
  default: jest.fn().mockReturnValue(<MockContactsStackNavigator />),
}));

describe("TabNavigator", () => {
  test("renders correct screens inside Tab.Navigator", () => {
    const mockNavigation = jest.spyOn(ReactNavigation, "useNavigation");

    render(<TabNavigator />);

    expect(mockNavigation).toHaveBeenCalledWith(
      "mock-BirthdaysMessagesStackNavigator"
    );
    expect(mockNavigation).toHaveBeenCalledWith("mock-ContactsStackNavigator");
  });
});
