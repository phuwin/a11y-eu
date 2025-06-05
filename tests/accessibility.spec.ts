import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';

test.describe('Accessibility Tests', () => {
  test('should not have any automatically detectable accessibility issues', async ({ page }) => {
    await page.goto('/');
    
    const accessibilityScanResults = await new AxeBuilder({ page })
      .withTags(['wcag2a', 'wcag2aa', 'wcag21aa'])
      .analyze();
    
    expect(accessibilityScanResults.violations).toEqual([]);
  });

  test('hero section accessibility', async ({ page }) => {
    await page.goto('/');
    
    const accessibilityScanResults = await new AxeBuilder({ page })
      .include('.hero-section')
      .analyze();
    
    expect(accessibilityScanResults.violations).toEqual([]);
  });

  test('timeline section accessibility', async ({ page }) => {
    await page.goto('/');
    
    const accessibilityScanResults = await new AxeBuilder({ page })
      .include('.timeline-section')
      .analyze();
    
    expect(accessibilityScanResults.violations).toEqual([]);
  });

  test('requirements section accessibility', async ({ page }) => {
    await page.goto('/');
    
    const accessibilityScanResults = await new AxeBuilder({ page })
      .include('.requirements-section')
      .analyze();
    
    expect(accessibilityScanResults.violations).toEqual([]);
  });

  test('compliance checker accessibility', async ({ page }) => {
    await page.goto('/');
    
    const accessibilityScanResults = await new AxeBuilder({ page })
      .include('.compliance-checker')
      .analyze();
    
    expect(accessibilityScanResults.violations).toEqual([]);
  });
}); 