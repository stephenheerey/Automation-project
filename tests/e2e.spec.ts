import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { InventoryPage } from '../pages/InventoryPage';
import { users } from '../utils/testData';
import { CartPage } from '../pages/cartPage';
import { CheckoutPage } from '../pages/checkoutPage';
import { CheckoutDetailsPage } from '../pages/CheckoutDetailsPage';
import { CheckoutSummaryPage } from '../pages/CheckoutSummaryPage';

test.describe('End 2 End', () => {

    test('simple one item purchase', async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.goto();
    await loginPage.login(users.standard.username, users.standard.password);
    await expect(page).toHaveURL(/inventory/);

    const inventoryPage = new InventoryPage(page);
    await inventoryPage.addBagToInventory();
    await expect(inventoryPage.cartItemsCount).toBeVisible();
    await inventoryPage.clickOnCart();

    const cartPage = new CartPage(page);
    cartPage.clickOnCheckout();

    const checkoutDetailsPage = new CheckoutDetailsPage(page);
    await checkoutDetailsPage.enterFormDetails();
    await checkoutDetailsPage.clickOnContinue();

    const checkoutSummaryPage = new CheckoutSummaryPage(page);
    await checkoutSummaryPage.clickOnFinish();
    await expect(page).toHaveURL(/checkout-complete/);
  });
});