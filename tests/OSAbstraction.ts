import { Location, Locator, type Page } from '@playwright/test';

export class PlaywrightOSAbstraction {
    readonly page: Page;
  
    constructor(page: Page) {
      this.page = page;
    }

    GetElementLocatorByOSName(OSName: string):Locator{
        const element = "[id$="+OSName+"]";
        return this.page.locator(element);
    }

    getElementByInnerText(innerText: string): Locator {
        return this.page.locator(`text="${innerText}"`);
    }
    
}