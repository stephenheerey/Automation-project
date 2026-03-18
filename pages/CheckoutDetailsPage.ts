import { Page, Locator } from '@playwright/test';

export class CheckoutDetailsPage {
    readonly page: Page;
    readonly firstNameInput: Locator;
    readonly lastNameInput: Locator;
    readonly postalCodeInput: Locator;
    readonly continueButton: Locator;
    readonly cancelButton: Locator;
    

    constructor(page: Page) {
        this.page = page;
        this.firstNameInput = page.locator('[data-test="firstName"]');
        this.lastNameInput = page.locator('[data-test="lastName"]');
        this.postalCodeInput = page.locator('[data-test="postalCode"]');
        this.continueButton = page.locator('[data-test="continue"]');
        this.cancelButton = page.locator('[data-test="cancel"]');
    }

    async enterFormDetails(){
        await this.firstNameInput.fill("test");
        await this.lastNameInput.fill("name");
        await this.postalCodeInput.fill("123");
    }

    async clickOnContinue(){
        await this.continueButton.click();
    }

    async clickOnCancel(){
        await this.cancelButton.click();
    }


}