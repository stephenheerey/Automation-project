import { Page, Locator } from '@playwright/test';

export class InventoryPage {
  readonly page: Page;
  readonly backpackAddToCart: Locator;
  readonly cartItemsCount: Locator;

  constructor(page: Page) {
    this.page = page;
    this.backpackAddToCart = page.locator('[data-test="add-to-cart-sauce-labs-backpack"]');
    this.cartItemsCount = page.locator('[data-test="shopping-cart-badge"]')
  }

  async addBagToInventory(){
    this.backpackAddToCart.click();
  }
}