import { expect, type Locator,type Page} from '@playwright/test';
import { PlaywrightOSInterations } from './OSInterations';

export class PlaywrightOSBehaviors {
    readonly page: Page;
    readonly customOSInterations: PlaywrightOSInterations;
  
    constructor(page: Page) {
      this.page = page;
      this.customOSInterations = new PlaywrightOSInterations(page);
    }
    
    
    async ExecuteSimpleSearchPattern(InputOSName: string, searchword: string){
        await this.customOSInterations.FillOSInputByOSPropertyName(InputOSName, searchword);
        await this.page.keyboard.press('Enter');
        await this.page.waitForTimeout(2000); // Simulates time to refresh data
    }

    async ExecuteSimpleLoginPattern(usernameInputOSName: string, passwordInputOSName: string, username: string, password: string){
        // Fill username
        await this.customOSInterations.FillOSInputByOSPropertyName(usernameInputOSName, username);
        // Fill password
        await this.customOSInterations.FillOSInputByOSPropertyName(passwordInputOSName, password);
        await this.page.keyboard.press('Enter');
    }

  }