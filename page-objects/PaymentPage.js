import { expect } from "@playwright/test";

export class PaymentPage {
  constructor(page) {
    this.page = page;
    this.discountCode = page
      .frameLocator('[data-qa="active-discount-container"]')
      .locator('[data-qa="discount-code"]');
    this.discountInput = page.getByPlaceholder("Discount code");
    this.totalValue = page.locator('[data-qa="total-value"]');
    this.discountedValue = page.locator(
      '[data-qa="total-with-discount-value"]'
    );
    this.discountMessage = page.locator('[data-qa="discount-active-message"]');

    // Credit card form fields
    this.creditCardOwnerInput = page.getByPlaceholder("Credit card owner");
    this.creditCardNumberInput = page.getByPlaceholder("Credit card number");
    this.creditCardValidUntilInput = page.getByPlaceholder("Valid until");
    this.creditCardCvcInput = page.getByPlaceholder("Credit card CVC");

    // Buttons
    this.activateDiscountButton = page.locator(
      '[data-qa="submit-discount-button"]'
    );
    this.payButton = page.locator('[data-qa="pay-button"]');
  }

  activateDiscount = async () => {
    await this.discountCode.waitFor();

    const code = await this.discountCode.innerText();

    // fill out the discount input
    await this.discountInput.fill(code);
    await expect(this.discountInput).toHaveValue(code);

    // slow typing the discount input
    // ---1) With keyboard typing
    //await this.discountInput.focus();
    //await this.page.keyboard.type(code, { delay: 1000 });
    // ---2) With pressSequentially method
    // await this.discountInput.pressSequentially(code, { delay: 1000 });
    // expect(await this.discountInput.inputValue()).toBe(code);

    // Discount message and amount are not shown before clicking
    expect(await this.discountMessage.isVisible()).toBe(false);
    expect(await this.discountedValue.isVisible()).toBe(false);

    // Activate discount by clicking the button
    await this.activateDiscountButton.click();

    // Check that "Discount activated" text is displayed
    await this.discountMessage.waitFor();
    // Check that there is now a discounted price total showing
    await this.discountedValue.waitFor();
    // Check that the discounted price total is smaller than the regular price
    const totalValueText = await this.totalValue.innerText();
    const totalValueClear = totalValueText.replace("$", "");
    const totalValueNumber = parseInt(totalValueClear);

    const discountedValueText = await this.discountedValue.innerText();
    const discountedValueClear = discountedValueText.replace("$", "");
    const discountedValueNumber = parseInt(discountedValueClear);

    expect(discountedValueNumber).toBeLessThan(totalValueNumber);
  };

  fillPaymentDetails = async (paymentDetails) => {
    await this.creditCardOwnerInput.fill(paymentDetails.owner);
    await this.creditCardNumberInput.fill(paymentDetails.number);
    await this.creditCardValidUntilInput.fill(paymentDetails.validUntil);
    await this.creditCardCvcInput.fill(paymentDetails.cvc);
  };

  completePayment = async () => {
    await this.payButton.waitFor();

    await this.payButton.click();
    await this.page.waitForURL(/\/thank-you/, { timeout: 3000 });
  };
}
