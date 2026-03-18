import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { InventoryPage } from '../pages/InventoryPage';
import { CartPage } from '../pages/CartPage';
import { CheckoutDetailsPage } from '../pages/CheckoutDetailsPage';
import { CheckoutSummaryPage } from '../pages/CheckoutSummaryPage';
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

        const checkoutDetailsPage = new CheckoutDetailsPage(page);
        await checkoutDetailsPage.enterFormDetails();
        await checkoutDetailsPage.clickOnContinue();
        await expect(page).toHaveURL(/step-two/);
    });

    test('review summary and finish', async({page}) => {

        const checkoutSummaryPage = new CheckoutSummaryPage(page);
        expect(await checkoutSummaryPage.itemsCount()).toEqual(1);
        const totalPrice = await checkoutSummaryPage.addPriceOfAllItems();
        const totalPriceNum = totalPrice[0].split("$")[1];
        expect(await checkoutSummaryPage.totalPrice()).toEqual(totalPriceNum);
        await checkoutSummaryPage.clickOnFinish();
        await expect(page).toHaveURL(/complete/);  
    });

    test('return to checkout details page', async({page}) => {
        const checkoutSummaryPage = new CheckoutSummaryPage(page);
        await checkoutSummaryPage.clickOnCancel();
        await expect(page).toHaveURL(/inventory/);
    });
});