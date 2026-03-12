import { Page, Locator } from '@playwright/test';

export class InventoryPage {
  readonly page: Page;
  readonly filterButton: Locator;
  readonly backpackAddToCart: Locator;
  readonly backpackRemoveFromCart: Locator;
  readonly bikeLightAddToCart: Locator;
  readonly boltShirtAddToCart: Locator;
  readonly fleeceAddToCart: Locator;
  readonly onesieAddToCart: Locator;
  readonly redShirtAddToCart: Locator;
  readonly cartItemsCount: Locator;

  constructor(page: Page) {
    this.page = page;
    this.filterButton = page.locator('[data-test="product-sort-container"]');
    this.backpackAddToCart = page.locator('[data-test="add-to-cart-sauce-labs-backpack"]');
    this.backpackRemoveFromCart = page.locator('[data-test="remove-sauce-labs-backpack"]');
    this.bikeLightAddToCart = page.locator('[data-test="add-to-cart-sauce-labs-bike-light"]');
    this.boltShirtAddToCart = page.locator('[data-test="add-to-cart-sauce-labs-bolt-t-shirt"]');
    this.fleeceAddToCart = page.locator('[data-test="add-to-cart-sauce-labs-fleece-jacket"]');
    this.onesieAddToCart = page.locator('[data-test="add-to-cart-sauce-labs-onesie"]');
    this.redShirtAddToCart = page.locator('[data-test="add-to-cart-test.allthethings()-t-shirt-(red)"]');
    this.cartItemsCount = page.locator('[data-test="shopping-cart-badge"]');
  }

  async addBagToInventory(){
    this.backpackAddToCart.click();
  }

  async removeBagFromInventory(){
    this.backpackRemoveFromCart.click();
  }

  async addAllToInventory(){
    await this.backpackAddToCart.click();
    await this.bikeLightAddToCart.click();
    await this.boltShirtAddToCart.click();
    await this.fleeceAddToCart.click();
    await this.onesieAddToCart.click();
    await this.redShirtAddToCart.click();
  }

  async getNamesOfItems(){
    return this.page.locator('[class="inventory_item_name "]').allInnerTexts();
  }

  async getPriceOfItems(){
    return this.page.locator('[class="inventory_item_price"]').allInnerTexts();
  }

  async sortPricesByCheapest(stringArray: string[]) {
  return [...stringArray].sort((a, b) => {
    const priceA = parseFloat(a.replace('$', ''));
    const priceB = parseFloat(b.replace('$', ''));
    return priceA - priceB;
  });
}

  async sortListByReverseAlpha(){
    await this.filterButton.selectOption('za');
  }

  async sortListByLowestPrice(){
    await this.filterButton.selectOption('lohi');
  }
}