import { render, fireEvent, screen } from '@testing-library/react';
import React, { useRef } from 'react';
import { useKeyboardNavigation, KeyboardNavigationOptions } from '../useKeyboardNavigation';

describe('useKeyboardNavigation', () => {
  function TestComponent({ options }: { options: KeyboardNavigationOptions }) {
    const ref = useRef<HTMLButtonElement>(null);
    useKeyboardNavigation(ref, options);
    return <button tabIndex={0} ref={ref} data-testid="test-div">Focusable</button>;
  }

  it('should call the correct callback for each key', () => {
    const callbacks = {
      onEnter: jest.fn(),
      onEscape: jest.fn(),
      onArrowUp: jest.fn(),
      onArrowDown: jest.fn(),
      onArrowLeft: jest.fn(),
      onArrowRight: jest.fn(),
      onHome: jest.fn(),
      onEnd: jest.fn(),
    };
    render(<TestComponent options={callbacks} />);
    const div = screen.getByTestId('test-div');
    div.focus();

    fireEvent.keyDown(div, { key: 'Enter' });
    expect(callbacks.onEnter).toHaveBeenCalled();
    fireEvent.keyDown(div, { key: 'Escape' });
    expect(callbacks.onEscape).toHaveBeenCalled();
    fireEvent.keyDown(div, { key: 'ArrowUp' });
    expect(callbacks.onArrowUp).toHaveBeenCalled();
    fireEvent.keyDown(div, { key: 'ArrowDown' });
    expect(callbacks.onArrowDown).toHaveBeenCalled();
    fireEvent.keyDown(div, { key: 'ArrowLeft' });
    expect(callbacks.onArrowLeft).toHaveBeenCalled();
    fireEvent.keyDown(div, { key: 'ArrowRight' });
    expect(callbacks.onArrowRight).toHaveBeenCalled();
    fireEvent.keyDown(div, { key: 'Home' });
    expect(callbacks.onHome).toHaveBeenCalled();
    fireEvent.keyDown(div, { key: 'End' });
    expect(callbacks.onEnd).toHaveBeenCalled();
  });

  it('should not throw if callbacks are missing', () => {
    render(<TestComponent options={{}} />);
    const div = screen.getByTestId('test-div');
    div.focus();
    expect(() => fireEvent.keyDown(div, { key: 'Enter' })).not.toThrow();
    expect(() => fireEvent.keyDown(div, { key: 'Escape' })).not.toThrow();
    expect(() => fireEvent.keyDown(div, { key: 'ArrowUp' })).not.toThrow();
    expect(() => fireEvent.keyDown(div, { key: 'ArrowDown' })).not.toThrow();
    expect(() => fireEvent.keyDown(div, { key: 'ArrowLeft' })).not.toThrow();
    expect(() => fireEvent.keyDown(div, { key: 'ArrowRight' })).not.toThrow();
    expect(() => fireEvent.keyDown(div, { key: 'Home' })).not.toThrow();
    expect(() => fireEvent.keyDown(div, { key: 'End' })).not.toThrow();
  });
}); 