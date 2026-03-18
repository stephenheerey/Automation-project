import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { InventoryPage } from '../pages/InventoryPage';
import { CartPage } from '../pages/CartPage';
import { CheckoutDetailsPage } from '../pages/CheckoutDetailsPage';
import { users } from '../utils/testData';

test.describe('Checkout Details', () => {

    test.beforeEach(async ({ page }) => {
        const loginPage = new LoginPage(page);
        await loginPage.goto();
        await loginPage.login(users.standard.username, users.standard.password);
        await expect(page).toHaveURL(/inventory/);

        const inventoryPage = new InventoryPage(page);
        await inventoryPage.addBagToInventory();
        await expect(inventoryPage.cartItemsCount).toBeVisible();
        await inventoryPage.clickOnCart();
        await expect(page).toHaveURL(/cart/);

        const cartPage = new CartPage(page);
        await cartPage.clickOnCheckout();
        await expect(page).toHaveURL(/checkout/);
    });

    test('add details and continue to summary', async({page}) => {
        const checkoutDetailsPage = new CheckoutDetailsPage(page);
        await checkoutDetailsPage.enterFormDetails();
        await checkoutDetailsPage.clickOnContinue();
        await expect(page).toHaveURL(/step-two/);
    });

    test('return to cart', async({ page }) => {
        const checkoutDetailsPage = new CheckoutDetailsPage(page);
        await checkoutDetailsPage.clickOnCancel();
        await expect(page).toHaveURL(/cart/);
    });
});