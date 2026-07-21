import { Page, BrowserContext, expect } from "@playwright/test";
import { PlaywrightWrapper } from "../helpers/playwright";

export class SalesforceAccountPage extends PlaywrightWrapper {
    private readonly selectors = {
        newBtn: `div:text-is('New')`,
        saveBtn: `//button[text()='Save']`,
        accounts: {
            accountNameInput: `//label[text()='Account Name']//following::input[1]`,
            ratingDDBtn: "//label[text()='Rating']//following::button[1]",
            dropdownValueSelector: (data: string) => `//span[text()='${data}']`,
            accountNumberInput: `//label[text()='Account Number']//following::input[1]`,
            accountTypeDDBtn: "//label[text()='Type']//following::button[1]",
            industryDDBtn: `//label[text()='Industry']//following::button[1]`,
            Searchthis: `Search this list...`,
            ownershipDDBtn: `//label[text()='Ownership']//following::button[1]`,
            billingStreetInput: `//label[text()='Billing Street']//following::textarea[1]`,
            billingCityInput: "//label[text()='Billing City']//following::input[1]",
            postalCodeInput: `//label[text()='Billing Zip/Postal Code']//following::input[1]`,
            billingStateInput: `//label[text()='Billing State/Province']//following::input[1]`,
            billingCountryInput: "//label[text()='Billing Country']//following::input[1]",
            verificationText: `//slot//lightning-formatted-text[@slot='primaryField']`,
            closeTab: `a[title$='Account'] + * + button`,
        },
    };

    constructor(page: Page, context: BrowserContext) {
        super(page, context);
    }

    public async newButton() {
        await this.validateElementVisibility(this.selectors.newBtn, "New Button");
        await this.click(this.selectors.newBtn, "New", "Button");
    }

    public async accountName(value: string) {
        await this.type(this.selectors.accounts.accountNameInput, "Account Name", value);
    }

    public async ratingDropdown(data: string) {
        await this.click(this.selectors.accounts.ratingDDBtn, "Rating", "Button");
        await this.click(this.selectors.accounts.dropdownValueSelector(data), data, "Button");
    }

    public async accountNumber(data: string) {
        await this.type(this.selectors.accounts.accountNumberInput, "Account Number", data);
    }

    public async accountType(data: string) {
        await this.click(this.selectors.accounts.accountTypeDDBtn, "Type", "Button");
        await this.click(this.selectors.accounts.dropdownValueSelector(data), data, "Button");
    }

    public async industry(data: string) {
        await this.click(this.selectors.accounts.industryDDBtn, "Industry", "Button");
        await this.click(this.selectors.accounts.dropdownValueSelector(data), data, "Button");
    }

    public async ownerShip(data: string) {
        await this.click(this.selectors.accounts.ownershipDDBtn, "Ownership", "Button");
        await this.click(this.selectors.accounts.dropdownValueSelector(data), data, "Button");
    }

    public async billingStreet(data: string) {
        await this.type(this.selectors.accounts.billingStreetInput, "Billing Street", data);
    }

    public async billingCity(value: string) {
        await this.type(this.selectors.accounts.billingCityInput, "Billing City", value);
    }

    public async postalCode(value: string) {
        await this.type(this.selectors.accounts.postalCodeInput, "postalCode", value);
    }

    public async billingState(value: string) {
        await this.type(this.selectors.accounts.billingStateInput, "Billing State", value);
    }

    public async billingCountry(value: string) {
        await this.type(this.selectors.accounts.billingCountryInput, "Billing Country", value);
    }

    public async saveButton() {
        await this.click(this.selectors.saveBtn, "Save", "Button");
    }

    public async verifiAccountName(value: string) {
        await this.spinnerDisappear();
        await this.validateElementVisibility(this.selectors.accounts.verificationText, "Account Name");
        const accountName = await this.getInnerText(this.selectors.accounts.verificationText);
        console.log(accountName);
        expect(accountName).toContain(value);
    }

    public async searchAccount(accountName: string) {
        await this.interactWithElement('PLACEHOLDER', this.selectors.accounts.Searchthis, 'fill', accountName);
        await this.keyboardAction(`[placeholder="${this.selectors.accounts.Searchthis}"]`, 'Enter', "Input", "Search This");
    }

    public async closeTAB() {
        await this.click(this.selectors.accounts.closeTab, "Close TAB", "Button");
    }
}