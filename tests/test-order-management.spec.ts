import { test, expect } from '@playwright/test';
import { PlaywrightOSAssertions } from './OSAssertions';
import { PlaywrightOSInterations} from './OSInterations';
import { PlaywrightOSBehaviors } from './OSBehaviors';
import { PlaywrightOrderManagementStack } from './OrderManagementStackScripts';


test('test', async ({ page }) => { 
  const customerOrderMngtStack = new PlaywrightOrderManagementStack(page);   
  await customerOrderMngtStack.NavigateOrderListWithFilterAndAssertTableData(page, 'ORD0001','Manuel Luís');

});