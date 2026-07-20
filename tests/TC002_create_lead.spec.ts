import { test } from "../customFixtures/salesForceFixture"
import { FakerData } from "../helpers/fakerUtils"

let firstName = FakerData.getFirstName()
test.use({ storageState: "logins/salesforceLogin.json" })
test(` creating Lead`, async ({ SalesforceLogin, SalesforceHome, SalesforceLead }) => {
    test.info().annotations.push(
        { type: 'TestCase', description: 'Creating Lead' },
    );

    await SalesforceLogin.salesforceLogin("ADMINLOGIN");
    //await SalesforceLogin.saveLoginState();
    await SalesforceHome.appLauncher();
    await SalesforceHome.viewAll();
    await SalesforceHome.searchApp("Leads");
    await SalesforceHome.selectApp("Leads");
    await SalesforceLead.newButton();
    await SalesforceLead.salutation("Mr.");
    await SalesforceLead.firstName(firstName);
    await SalesforceLead.lastName(FakerData.getLastName());
    await SalesforceLead.Company(FakerData.randomCityName());
    await SalesforceLead.saveButton();
    await SalesforceLead.verifiTheLeadAccount(firstName)

})