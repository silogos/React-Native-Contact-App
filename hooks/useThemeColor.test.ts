// useThemeColor.test.ts

import { renderHook } from '@testing-library/react-hooks';
import { useColorScheme } from 'react-native';
import { useThemeColor } from './useThemeColor'; // Adjust the import path according to your file structure
import { Colors } from '@/constants/Colors';

// Mock useColorScheme
jest.mock('react-native', () => ({
  ...jest.requireActual('react-native'),
  useColorScheme: jest.fn(),
}));

// Mock Colors
jest.mock('@/constants/Colors', () => ({
  Colors: {
    light: {
      background: '#ffffff',
      text: '#000000',
    },
    dark: {
      background: '#000000',
      text: '#ffffff',
    },
  },
}));

const mockUseColorScheme = useColorScheme as jest.Mock;
const { Colors: MockColors } = require('@/constants/Colors');

describe('useThemeColor', () => {
  it('returns the light color from props when the theme is light', () => {
    mockUseColorScheme.mockReturnValue('light');

    const { result } = renderHook(() =>
      useThemeColor({ light: 'lightColor', dark: 'darkColor' }, 'background')
    );

    expect(result.current).toBe('lightColor');
  });

  it('returns the dark color from props when the theme is dark', () => {
    mockUseColorScheme.mockReturnValue('dark');

    const { result } = renderHook(() =>
      useThemeColor({ light: 'lightColor', dark: 'darkColor' }, 'background')
    );

    expect(result.current).toBe('darkColor');
  });

  it('returns the light color from Colors when the theme is light and no prop color is provided', () => {
    mockUseColorScheme.mockReturnValue('light');

    const { result } = renderHook(() =>
      useThemeColor({}, 'background')
    );

    expect(result.current).toBe(MockColors.light.background);
  });

  it('returns the dark color from Colors when the theme is dark and no prop color is provided', () => {
    mockUseColorScheme.mockReturnValue('dark');

    const { result } = renderHook(() =>
      useThemeColor({}, 'background')
    );

    expect(result.current).toBe(MockColors.dark.background);
  });

  it('returns the correct color based on colorName', () => {
    mockUseColorScheme.mockReturnValue('light');

    const { result } = renderHook(() =>
      useThemeColor({}, 'text')
    );

    expect(result.current).toBe(MockColors.light.text);

    mockUseColorScheme.mockReturnValue('dark');

    const { result: resultDark } = renderHook(() =>
      useThemeColor({}, 'text')
    );

    expect(resultDark.current).toBe(MockColors.dark.text);
  });
});
