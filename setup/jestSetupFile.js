import "react-native-gesture-handler/jestSetup";
import fetchMock from "jest-fetch-mock";

fetchMock.enableMocks();

global.console = {
  ...console,
  // log: jest.fn(),
  // debug: jest.fn(),
  // info: jest.fn(),
  warn: jest.fn(),
  error: jest.fn(),
};

jest.mock("react-native", () => ({
  ...jest.requireActual("react-native"),
  useColorScheme: jest.fn(),
}));

jest.mock("react-native/Libraries/Settings/NativeSettingsManager", () => ({
  getConstants: () => ({
    settings: {},
  }),
}));
