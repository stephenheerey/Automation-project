import { Page, Locator } from '@playwright/test';

export class CheckoutSummaryPage {
    readonly page: Page;
    readonly finishButton: Locator;
    readonly itemTotalPrice: Locator;
    readonly cancelButton: Locator;
    

    constructor(page: Page) {
        this.page = page;
        this.finishButton = page.locator('[data-test="finish"]');
        this.itemTotalPrice = page.locator('[data-test="subtotal-label"]');
        this.cancelButton = page.locator('[data-test="cancel"]');
    }



    async clickOnFinish(){
        await this.finishButton.click();
    }

    async itemsCount(){
        return this.page.locator('[data-test="inventory-item"]').count();
    }

    async clickOnCancel(){
        await this.cancelButton.click();
    }

    async addPriceOfAllItems(){
        return this.page.locator('[class="inventory_item_price"]').allInnerTexts();
    }

    async totalPrice(){
        return (await this.itemTotalPrice.innerText()).split("$")[1];
    }
}