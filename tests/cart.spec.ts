import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { InventoryPage } from '../pages/InventoryPage';
import { CartPage } from '../pages/CartPage';
import { users } from '../utils/testData';

test.describe('Cart', () => {

    test.beforeEach(async ({ page }) => {
        const loginPage = new LoginPage(page);
        await loginPage.goto();
        await loginPage.login(users.standard.username, users.standard.password);
        await expect(page).toHaveURL(/inventory/);
    });

    test('move to checkout', async ({ page }) => {
        const inventoryPage = new InventoryPage(page);
        await inventoryPage.addBagToInventory();
        await expect(inventoryPage.cartItemsCount).toBeVisible();
        await inventoryPage.clickOnCart();
        await expect(page).toHaveURL(/cart/);

        const cartPage = new CartPage(page);
        await cartPage.clickOnCheckout();
        await expect(page).toHaveURL(/checkout/);
    });

    test('return to shopping', async ({ page }) => {
        const inventoryPage = new InventoryPage(page);
        await inventoryPage.addBagToInventory();
        await expect(inventoryPage.cartItemsCount).toBeVisible();
        await inventoryPage.clickOnCart();
        await expect(page).toHaveURL(/cart/);

        const cartPage = new CartPage(page);
        await cartPage.clickOnContinueShopping();
        await expect(page).toHaveURL(/inventory/);
    });

    test('remove item from cart', async ({ page }) => {
        const inventoryPage = new InventoryPage(page);
        await inventoryPage.addAllToInventory();
        await expect(inventoryPage.cartItemsCount).toBeVisible();
        await inventoryPage.clickOnCart();
        await expect(page).toHaveURL(/cart/);
        
        const cartPage = new CartPage(page);
        const itemsInCart = await Number(cartPage.getItemsCount());
        await cartPage.removeRandomItemFromCart();
        const itemsRemaining = await Number(cartPage.getItemsCount());
        expect(itemsInCart - 1).toEqual(itemsRemaining);


    });
  

});