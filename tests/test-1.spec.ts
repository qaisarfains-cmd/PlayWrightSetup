import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {
  await page.goto('https://qme.outsystemscloud.com/OrderManagement/login');
  await page.waitForLoadState('networkidle');

  await page.getByRole('link', { name: 'Sample Users' }).click();
  await page.getByRole('link', { name: 'Manuel Luís' }).click();
  await page.goto('https://qme.outsystemscloud.com/OrderManagement/Dashboard');
  await page.waitForLoadState('networkidle');

  await page.locator('#feedbackMessageContainer i').click();
  await page.getByRole('link', { name: 'Orders' }).click();
  await page.locator('.vscomp-toggle-button').click();
  await page.getByRole('option', { name: 'Manuel Luís' }).click();
  await page.getByRole('link', { name: 'Dashboard' }).click();
  await page.waitForLoadState('networkidle');

  await page.locator('#b1-Header').getByRole('link').filter({ hasText: /^$/ }).click();
});