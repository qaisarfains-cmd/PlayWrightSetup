import { expect,type Page} from '@playwright/test';
import { PlaywrightOSAbstraction } from './OSAbstraction';
/**
 * This is a library to have custom assertions with OutSystem objects
 */
export class PlaywrightOSAssertions {
    readonly page: Page;
    readonly customAbstractions: PlaywrightOSAbstraction;
  
    constructor(page: Page) {
      this.page = page;
      this.customAbstractions = new PlaywrightOSAbstraction(page);
    }

    async AssertElementVisibleInTableRowColumn(OSTableName: string, rowNum: number, colNum: number){
      const table = this.customAbstractions.GetElementLocatorByOSName(OSTableName);
      await expect(table.locator("tr:nth-of-type("+rowNum+") td:nth-child("+colNum+")"), "Element is not visible in table").toBeVisible();
    }

    async AssertElementTextInTableCellByRowColumn(OSTableName: string, rowNum: number, colNum: number, searchtext: string){
        const table = this.customAbstractions.GetElementLocatorByOSName(OSTableName);
        const tableCell = table.locator("tr:nth-of-type("+rowNum+") td:nth-child("+colNum+")");  
        await expect(tableCell, "Table cell does not contain the text").toContainText(searchtext);
    }

    async AssertDropdownOptionExists(optionName: string){
        const element = this.page.getByRole('option', { name: optionName}).locator('span');
        await expect(element, "Dropdown option does not exists").toBeVisible();
    }

    async AssertElementVisible(OSName: string){
        const element = this.customAbstractions.GetElementLocatorByOSName(OSName);
        await expect(element, "Element is not visible").toBeVisible();
    }

    async AssertElementChecked(OSInputName: string){
        const element = this.customAbstractions.GetElementLocatorByOSName(OSInputName);
        await expect(element, "Element is not checked").toBeChecked();

    }

  }