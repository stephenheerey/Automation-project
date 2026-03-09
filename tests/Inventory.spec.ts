import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { InventoryPage } from '../pages/InventoryPage';
import { users } from '../utils/testData';

test.describe('Inventory', () => {

  test('add bag to basket', async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.goto();
    await loginPage.login(users.standard.username, users.standard.password);
    await expect(page).toHaveURL(/inventory/);

    const inventoryPage = new InventoryPage(page);
    await inventoryPage.addBagToInventory();
    await expect(inventoryPage.cartItemsCount).toBeVisible();
  });

});