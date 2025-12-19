import { expect, type Locator,type Page} from '@playwright/test';
import { PlaywrightOSAbstraction } from './OSAbstraction';
/**
 * This is a library to have custom interactions with OutSystem objects
 */
export class PlaywrightOSInterations {
    readonly page: Page;
    readonly customAbstractions: PlaywrightOSAbstraction;

    constructor(page: Page) {
      this.page = page;
      this.customAbstractions = new PlaywrightOSAbstraction(page);
    }

    async ClickElementByOSPropertyName(OSName: string){
      const element = this.customAbstractions.GetElementLocatorByOSName(OSName);
      await element.click();
      await this.page.waitForTimeout(1000);
    }

    async ClickLinkInTableRowColumnByOSPropertyName(OSTableName: string, rowNum: number, colNum: number){
      const table = this.customAbstractions.GetElementLocatorByOSName(OSTableName);
      const tableCellLink = table.locator("tr:nth-of-type("+rowNum+") td:nth-child("+colNum+") a");
      await tableCellLink.click();
      await this.page.waitForTimeout(1000);
    }
    
    async DropdownSelectOptionByOSPropertyName(OSDropdownName: string, optionName: string){
        this.ClickElementByOSPropertyName(OSDropdownName);
        const dropdwnOption =  this.page.getByRole('option', { name: optionName}).locator('span');
        await dropdwnOption.click();
        await this.page.waitForTimeout(1000);
    }

    async SlideXValuesByOSPropertyName(OSSlideName: string, xMaxValue: number, xShiftLowerValue?: number, xShiftUpperValue?: number){
      const slider = this.customAbstractions.GetElementLocatorByOSName(OSSlideName);

      // get slider handlers
      const sliderLowerHandler = slider.locator('.noUi-handle.noUi-handle-lower');
      await expect(sliderLowerHandler,"Slider is visible").toBeVisible();
      const sliderUpperHandler = slider.locator('.noUi-handle.noUi-handle-upper'); // fetch upper handler
      await expect(sliderUpperHandler,"Slider is visible").toBeVisible();
      
      // Get the initial lower position of the slider handle
      const initiallowerPosition = await sliderLowerHandler.boundingBox();
      const initialLowerX =  initiallowerPosition ? initiallowerPosition.x+ (initiallowerPosition.width/2) : 0;
      await this.page.waitForTimeout(1000);//time to calculate position

      // Get the initial upper position of the slider handle
      const initialupperPosition = await sliderUpperHandler.boundingBox();
      const initialUpperX =  initialupperPosition ? initialupperPosition.x + (initialupperPosition.width/2) : 0;
      await this.page.waitForTimeout(1000);//time to calculate position

      //Get total slider width 
      const totalSliderWidth = initialUpperX - initialLowerX;

      //Calculate the needed x upper movement in px
      let xUpperMovement = 0;
      if(xShiftUpperValue != null){
        xUpperMovement = (totalSliderWidth * xShiftUpperValue) / xMaxValue;
        // Manual upper target coordinates
        const targetUpperX = (initialUpperX - xUpperMovement); 
        const targetUpperY = initialupperPosition ? initialupperPosition.y : 0;
        await this.page.waitForTimeout(1000); 

        // Drag the slider handle to the new position
        // Perform the drag-and-drop
        await this.ElementManualDragAndDropAtTargetCoordinates(sliderUpperHandler, targetUpperX, targetUpperY);  
      }

      if(xShiftLowerValue != null){
        //Calculate the needed x lower movement in px
        const xLowerMovement = (totalSliderWidth * xShiftLowerValue) / xMaxValue;

        // Locate the target location for the drag (e.g., where you want to move the slider)
        // calculate the target exact value
        const targetLowerX = (initialLowerX + xLowerMovement);
        const targetLowerY = initialupperPosition ? initiallowerPosition?.y : 0;

        // Drag the slider handle to the new position
        // Perform the drag-and-drop
        await this.ElementManualDragAndDropAtTargetCoordinates(sliderLowerHandler, targetLowerX, targetLowerY);
      }
      
    }

    async OSElementGetPageCoordinates(OSName:string){
      const element = this.customAbstractions.GetElementLocatorByOSName(OSName);
      return await element.boundingBox();
    }

    async ElementManualDragAndDropAtTargetCoordinates(OSElem: Locator, xTargetPosition: number, yTargetPosition: number | undefined){
      await OSElem.hover();
      await this.page.mouse.down();
      await this.page.mouse.move(xTargetPosition, yTargetPosition ? yTargetPosition : 0);
      await this.page.waitForTimeout(1000);
      await this.page.mouse.up();
      await this.page.waitForTimeout(1000);
    }

    async ElementDragAndDropAtElementLocator(ItemToBeDraggedOSName: string, ItemToDropAtOSName: string ){
      const eleToDrag = this.customAbstractions.GetElementLocatorByOSName(ItemToBeDraggedOSName);
      const eleToDropAt = this.customAbstractions.GetElementLocatorByOSName(ItemToDropAtOSName);
      await eleToDrag.dragTo(eleToDropAt);
    }

    async FillOSInputByOSPropertyName(OSInputName: string, textInput: string){
      const element = this.customAbstractions.GetElementLocatorByOSName(OSInputName);
        await element.fill(textInput);
        await this.page.waitForTimeout(1000);
    }

  }