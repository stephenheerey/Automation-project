import { Page, Locator } from '@playwright/test';

export class CartPage {
    readonly page: Page;
    readonly checkoutButton: Locator;
    readonly continueShoppingButton: Locator;
    readonly cartItemsCount: Locator;
    

    constructor(page: Page) {
        this.page = page;
        this.checkoutButton = page.locator('[data-test="checkout"]');
        this.continueShoppingButton = page.locator('[data-test="continue-shopping"]');
        this.cartItemsCount = page.locator('[data-test="shopping-cart-badge"]');

    }

    async clickOnCheckout(){
        await this.checkoutButton.click();
    }

    async clickOnContinueShopping(){
        await this.continueShoppingButton.click();
    }

    async getItemsCount(){
        await this.cartItemsCount.innerText();
    }

    async removeRandomItemFromCart(){
        const removeButtons = this.page.locator("button[id*='remove']");
        const count = await removeButtons.count();
        const randomIndex = Math.floor(Math.random() * count);
        const randomButton = removeButtons.nth(randomIndex);
        await randomButton.click();
    }

}