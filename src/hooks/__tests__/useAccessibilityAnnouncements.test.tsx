/* eslint-disable testing-library/no-node-access */
import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import { useAccessibilityAnnouncements } from '../useAccessibilityAnnouncements';

describe('useAccessibilityAnnouncements', () => {
  function TestComponent() {
    const { announce, announceNavigation, announceUpdate } = useAccessibilityAnnouncements();
    return (
      <div>
        <button onClick={() => announce('Hello!')}>Announce</button>
        <button onClick={() => announceNavigation('Main')}>Announce Nav</button>
        <button onClick={() => announceUpdate('Updated!')}>Announce Update</button>
      </div>
    );
  }

  it('should create a live region in the DOM when announce functions are called', async () => {
    jest.useFakeTimers();
    render(<TestComponent />);

    // Announce
    screen.getByText('Announce').click();
    await waitFor(() => {
      const liveRegions = document.querySelectorAll('[aria-live]');
      const lastLiveRegion = liveRegions[liveRegions.length - 1];
      expect(lastLiveRegion).toHaveTextContent('Hello!');
    });

    // Announce Navigation
    screen.getByText('Announce Nav').click();
    await waitFor(() => {
      const liveRegions = document.querySelectorAll('[aria-live]');
      const lastLiveRegion = liveRegions[liveRegions.length - 1];
      expect(lastLiveRegion).toHaveTextContent('Navigated to Main section');
    });

    // Announce Update
    screen.getByText('Announce Update').click();
    await waitFor(() => {
      const liveRegions = document.querySelectorAll('[aria-live]');
      const lastLiveRegion = liveRegions[liveRegions.length - 1];
      expect(lastLiveRegion).toHaveTextContent('Updated!');
    });

    // Fast-forward timers to remove the live region
    jest.runAllTimers();
    await waitFor(() => {
      expect(document.querySelector('[aria-live]')).toBeNull();
    });
    jest.useRealTimers();
  });
}); 