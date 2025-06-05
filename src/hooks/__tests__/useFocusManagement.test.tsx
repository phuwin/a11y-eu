import React, { useRef } from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { useFocusManagement } from '../useFocusManagement';

describe('useFocusManagement', () => {
  function TestComponent() {
    const containerRef = useRef<HTMLDivElement>(null);
    const ref1 = useRef<HTMLButtonElement>(null);
    const ref2 = useRef<HTMLButtonElement>(null);
    const { moveFocusToStart, saveFocus, restoreFocus } = useFocusManagement();

    return (
      <div ref={containerRef}>
        <button ref={ref1} data-testid="btn1" onClick={() => saveFocus()}>Btn1</button>
        <button ref={ref2} data-testid="btn2" onClick={() => moveFocusToStart(containerRef.current!)}>Btn2</button>
        <button data-testid="restore" onClick={() => restoreFocus()}>Restore</button>
      </div>
    );
  }

  it('should move, save, and restore focus', () => {
    render(<TestComponent />);
    const btn1 = screen.getByTestId('btn1');
    const btn2 = screen.getByTestId('btn2');
    const restore = screen.getByTestId('restore');

    // Move focus to btn2, then save focus (btn1)
    btn1.focus();
    userEvent.click(btn1);
    expect(btn1).toHaveFocus();

    // Move focus to btn1 using moveFocusToStart
    userEvent.click(btn2);
    expect(btn1).toHaveFocus();

    // Move focus away, then restore
    userEvent.click(btn2);
    userEvent.click(restore);
    expect(btn1).toHaveFocus();
  });
}); 