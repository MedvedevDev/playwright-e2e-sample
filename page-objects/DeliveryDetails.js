import { expect } from "@playwright/test";

export class DeliveryDetails {
  constructor(page) {
    this.page = page;
    this.firstnameInput = page.getByPlaceholder("First name");
    this.lastnameInput = page.getByPlaceholder("Last name");
    this.streetInput = page.getByPlaceholder("Street");
    this.postcodeInput = page.getByPlaceholder("Post code");
    this.cityInput = page.getByPlaceholder("City");
    this.countryDropdown = page.locator('[data-qa="country-dropdown"]');
    this.saveDetailsButton = page.getByRole("button", {
      name: "Save address for next time",
    });
    this.savedDetailsContainer = page.locator(
      '[data-qa="saved-address-container"]'
    );
  }

  fillDetails = async (deliveryDetails) => {
    await this.firstnameInput.waitFor();
    await this.firstnameInput.fill(deliveryDetails.firstName);
    await this.lastnameInput.fill(deliveryDetails.lastName);
    await this.streetInput.fill(deliveryDetails.street);
    await this.postcodeInput.fill(deliveryDetails.postcode);
    await this.cityInput.fill(deliveryDetails.city);
    await this.countryDropdown.selectOption(deliveryDetails.country);
  };

  saveDetails = async () => {
    await this.saveDetailsButton.waitFor();

    const detailsCountBeforeSaving = await this.savedDetailsContainer.count(); // if there is already some saved adress details
    await this.saveDetailsButton.click();
    await expect(this.savedDetailsContainer).toHaveCount(
      detailsCountBeforeSaving + 1
    ); // check that new data is saved  and desplayed after cliking button
  };
}
