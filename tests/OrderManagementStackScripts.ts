import { Page, test, expect } from '@playwright/test';
import { PlaywrightOSAssertions } from './OSAssertions';
import { PlaywrightOSInterations } from './OSInterations';
import { PlaywrightOSBehaviors } from './OSBehaviors';

export class PlaywrightOrderManagementStack {
    readonly page: Page;
    constructor(page: Page) {
        this.page = page;
    }

    async NavigateOrderListWithFilterAndAssertTableData(page: Page, searchWord: string, optionName: string) {
        const customAsserstions = new PlaywrightOSAssertions(page);
        const customInteractions = new PlaywrightOSInterations(page);
        const customBehaviors = new PlaywrightOSBehaviors(page);

        await page.goto('https://qme.outsystemscloud.com/OrderManagement/login');
        await page.waitForLoadState('networkidle');

        await page.getByRole('link', { name: 'Sample Users' }).click();
        await page.getByRole('link', { name: 'Manuel Luís' }).click();
        await page.goto('https://qme.outsystemscloud.com/OrderManagement/Dashboard');
        await page.waitForLoadState('networkidle');


        await page.getByRole('link', { name: 'Orders' }).click();
        await customAsserstions.AssertElementVisible("ButtonNewOrder");

        await page.locator('.vscomp-toggle-button').click();
        await page.getByRole('option', { name: 'Manuel Luís' }).click();
        await page.getByRole('link', { name: 'Dashboard' }).click();
        await page.waitForLoadState('networkidle');

        await page.locator('#b1-Header').getByRole('link').filter({ hasText: /^$/ }).click();
    }
}