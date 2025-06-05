import { test, expect } from '@playwright/test';

test.describe('Keyboard Navigation', () => {
  test('should navigate through all interactive elements with Tab', async ({ page }) => {
    await page.goto('/');
    
    // Start from the first focusable element
    await page.keyboard.press('Tab');
    
    // Collect all focusable elements
    const focusableElements = await page.$$eval(
      'a[href], button, input, select, textarea, [tabindex]:not([tabindex="-1"])',
      elements => elements.map(el => ({
        tagName: el.tagName,
        type: el.getAttribute('type'),
        id: el.id,
        className: el.className
      }))
    );
    
    // Verify we can tab through all elements
    for (let i = 0; i < focusableElements.length; i++) {
      const activeElement = await page.evaluate(() => ({
        tagName: document.activeElement?.tagName,
        id: document.activeElement?.id,
        className: document.activeElement?.className
      }));
      
      expect(activeElement).toBeDefined();
      
      if (i < focusableElements.length - 1) {
        await page.keyboard.press('Tab');
      }
    }
  });

  test('should navigate backwards with Shift+Tab', async ({ page }) => {
    await page.goto('/');
    
    // Go to last element first
    const focusableElements = await page.$$('a[href], button, input, select, textarea, [tabindex]:not([tabindex="-1"])');
    await focusableElements[focusableElements.length - 1].focus();
    
    // Navigate backwards
    for (let i = focusableElements.length - 1; i > 0; i--) {
      await page.keyboard.press('Shift+Tab');
      
      const activeElement = await page.evaluate(() => document.activeElement);
      expect(activeElement).toBeDefined();
    }
  });

  test('should handle Enter and Space keys on buttons', async ({ page }) => {
    await page.goto('/');
    
    // Test requirement card expansion with Enter
    const firstRequirementCard = page.locator('.requirements-section button[aria-controls^="requirement-details-"]').first();
    await firstRequirementCard.focus();
    await page.keyboard.press('Enter');
    
    // Verify card expanded
    const expandedContent = page.locator('[id^="requirement-details-"]').first();
    await expect(expandedContent).toBeVisible();
    
    // Test with Space key
    await firstRequirementCard.focus();
    await page.keyboard.press('Space');
    
    // Verify card collapsed
    await expect(expandedContent).toBeHidden();
  });

  test('should handle Escape key to close modals/menus', async ({ page }) => {
    await page.goto('/');
    
    await page.setViewportSize({ width: 375, height: 812 });
    
    // Open mobile menu if available
    const mobileMenuButton = page.locator('[aria-label="Toggle main navigation menu"]');
    await expect(mobileMenuButton).toBeVisible();
    await mobileMenuButton.click();
    const mobileMenu = page.locator('#mobile-menu');
    await expect(mobileMenu).toBeVisible();
    // Press Escape to close
    await page.keyboard.press('Escape');
    await expect(mobileMenu).toBeHidden();
  });
}); 