import { colorContrast, keyboardNavigation, screenReader } from './accessibility';

describe('colorContrast', () => {
  it('getContrastRatio returns a number', () => {
    expect(typeof colorContrast.getContrastRatio('#000', '#fff')).toBe('number');
  });
  it('meetsWCAGAA returns true for default placeholder', () => {
    expect(colorContrast.meetsWCAGAA('#000', '#fff')).toBe(true);
    expect(colorContrast.meetsWCAGAA('#000', '#fff', 20)).toBe(true);
  });
});

describe('keyboardNavigation', () => {
  it('isFocusable returns true for button element', () => {
    const button = document.createElement('button');
    document.body.appendChild(button);
    Object.defineProperty(button, 'offsetParent', { value: document.body });
    expect(keyboardNavigation.isFocusable(button)).toBe(true);
    document.body.removeChild(button);
  });
});

describe('screenReader', () => {
  it('optimizeForScreenReader replaces & and trims', () => {
    expect(screenReader.optimizeForScreenReader('Hello &   World')).toBe('Hello and World');
  });
  it('isScreenReaderActive returns a boolean', () => {
    expect(typeof screenReader.isScreenReaderActive()).toBe('boolean');
  });
}); 