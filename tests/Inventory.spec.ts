import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { InventoryPage } from '../pages/InventoryPage';
import { users } from '../utils/testData';

test.describe('Inventory', () => {

  test.beforeEach(async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.goto();
    await loginPage.login(users.standard.username, users.standard.password);
    await expect(page).toHaveURL(/inventory/);
  });

  test('add bag to basket', async ({ page }) => {

    const inventoryPage = new InventoryPage(page);
    await inventoryPage.addBagToInventory();
    await expect(inventoryPage.cartItemsCount).toBeVisible();
  });

  test('add all items to the basket', async ({ page }) => {

    const inventoryPage = new InventoryPage(page);
    await inventoryPage.addAllToInventory();
    await expect(inventoryPage.cartItemsCount).toHaveText('6');
  });

  test('remove item from basket', async ({ page }) => {

    const inventoryPage = new InventoryPage(page);
    await inventoryPage.addBagToInventory();
    await expect(inventoryPage.cartItemsCount).toBeVisible();

    await inventoryPage.removeBagFromInventory();
    await expect(inventoryPage.cartItemsCount).not.toBeVisible();
  });

  test('sort items in reverse alphabetical order', async ({ page }) => {
    const inventoryPage = new InventoryPage(page);
    const itemsBefore: String[] = await inventoryPage.getNamesOfItems();
    const expectedOrder = [...itemsBefore].reverse();

    await inventoryPage.sortListByReverseAlpha();

    const itemsAfter: String[] = await inventoryPage.getNamesOfItems();
    console.log(`Items after sort:    ${JSON.stringify(itemsAfter)}`);
    console.log(`Expected order:      ${JSON.stringify(expectedOrder)}`);
    console.log(`Match: ${JSON.stringify(itemsAfter) === JSON.stringify(expectedOrder)}`);
    await expect(itemsAfter).toEqual(expectedOrder);
  });

  test('sort items by price', async ({ page }) => {
    const inventoryPage = new InventoryPage(page);
    const items: String[] = await inventoryPage.getPriceOfItems();
    const itemsByPrice = await inventoryPage.sortPricesByCheapest(items);

    await inventoryPage.sortListByLowestPrice();

    const pricesAfter: String[] = await inventoryPage.getPriceOfItems();
    console.log(`Prices after sort:   ${JSON.stringify(pricesAfter)}`);
    console.log(`Expected order:      ${JSON.stringify(itemsByPrice)}`);
    console.log(`Match: ${JSON.stringify(pricesAfter) === JSON.stringify(itemsByPrice)}`);
    await expect(pricesAfter).toEqual(itemsByPrice);
  });
});