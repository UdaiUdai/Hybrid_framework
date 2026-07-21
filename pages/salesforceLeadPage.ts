import { Page, BrowserContext } from "@playwright/test";
import { PlaywrightWrapper } from "../helpers/playwright";

export class SalesforceLeadPage extends PlaywrightWrapper {
    private readonly selectors = {
        newBtn: `div:text-is('New')`,
        saveBtn: `//button[text()='Save']`,
        deleteBtn: "span:text-is('Delete')",
        deletePopUp: `//button/span[text()='Delete']`,
        noItemToDisplay: "//span[text()='No items to display.']",
        leads: {
            salutation: "button[name='salutation']",
            saluationValue: (value: string) => "span:text-is('" + value + "')",
            firstName: "//label[text()='First Name']//following::input[1]",
            lastName: "//label[text()='Last Name']//following::input[1]",
            company: "//label[text()='Company']//following::input[1]",
            verificationText: "slot[name='primaryField'] lightning-formatted-name",
            searchLeadInput: "div[class^='slds-form-element__control'] input",
            userId: (userName: string) => "//a[@title='" + userName + "']",
            expandBtn: "[class^='menu-button-item'] button",
        },
    };

    constructor(page: Page, context: BrowserContext) {
        super(page, context);
    }

    public async newButton() {
        await this.validateElementVisibility(this.selectors.newBtn, "New Button");
        await this.click(this.selectors.newBtn, "New", "Button");
    }

    public async salutation(value: string) {
        await this.click(this.selectors.leads.salutation, "Salutation", "Button");
        await this.click(this.selectors.leads.saluationValue(value), "Salutation Value", "Button");
    }

    public async firstName(value: string) {
        await this.type(this.selectors.leads.firstName, "First Name", value);
    }

    public async lastName(value: string) {
        await this.type(this.selectors.leads.lastName, "Last Name", value);
    }

    public async Company(value: string) {
        await this.type(this.selectors.leads.company, "Last Name", value);
    }

    public async saveButton() {
        await this.forceClick(this.selectors.saveBtn, "Save", "Button");
    }

    public async verifiTheLeadAccount(expectedValue: string) {
        await this.validateElementVisibility(this.selectors.leads.verificationText, "Lead Name");
        const leadName = await this.getInnerText(this.selectors.leads.verificationText);
        console.log(leadName);
        await this.verification(this.selectors.leads.verificationText, expectedValue);
    }

    public async searchLead(value: string) {
        await this.validateElementVisibility(this.selectors.leads.searchLeadInput, "Search Field");
        await this.typeAndEnter(this.selectors.leads.searchLeadInput, "Search Field", value);
    }

    public async leadID(userName: string) {
        await this.spinnerDisappear();
        await this.click(this.selectors.leads.userId(userName), userName, "User Name");
    }

    public async expandButton() {
        await this.click(this.selectors.leads.expandBtn, "Expand Button", "Button");
    }

    public async deleteLead() {
        await this.validateElementVisibility(this.selectors.deleteBtn, "Delete");
        await this.click(this.selectors.deleteBtn, "Delete", "Button");
    }

    public async deletePopUP() {
        await this.click(this.selectors.deletePopUp, "Delete", "Button");
    }

    public async verifiTheDeletedData() {
        await this.page.waitForLoadState('load');
        await this.verification(this.selectors.noItemToDisplay, "No items to display");
    }
}