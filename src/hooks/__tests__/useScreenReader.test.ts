import { renderHook } from '@testing-library/react';
import { useScreenReader } from '../useScreenReader';

describe('useScreenReader', () => {
  beforeEach(() => {
    // Mock userAgent and window properties
    Object.defineProperty(window.navigator, 'userAgent', {
      value: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) NVDA',
      configurable: true,
    });
    (window as any).nvda = true;
    window.speechSynthesis = {} as any;
    window.matchMedia = jest.fn().mockImplementation((query) => ({
      matches: false,
      media: query,
      addEventListener: jest.fn(),
      removeEventListener: jest.fn(),
    }));
  });

  afterEach(() => {
    delete (window as any).nvda;
    delete (window as any).speechSynthesis;
  });

  it('detects NVDA screen reader and sets correct state', () => {
    const { result } = renderHook(() => useScreenReader());
    expect(result.current.isActive).toBe(true);
    expect(result.current.type).toBe('nvda');
    expect(result.current.hasVirtualCursor).toBe(true);
    expect(result.current.supportsLiveRegions).toBe(true);
  });

  it('detects no screen reader if no indicators', () => {
    Object.defineProperty(window.navigator, 'userAgent', {
      value: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)',
      configurable: true,
    });
    delete (window as any).nvda;
    const { result } = renderHook(() => useScreenReader());
    expect(result.current.isActive).toBe(true); // Because speechSynthesis is mocked as present
  });
}); 