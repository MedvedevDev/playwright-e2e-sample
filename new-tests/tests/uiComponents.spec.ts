import { expect, test } from "@playwright/test";

test.beforeEach(async ({ page }) => {
  await page.goto("http://localhost:4200/pages/iot-dashboard");
});

test.describe("Form Latouts page", () => {
  test.beforeEach(async ({ page }) => {
    await page.getByText("Forms").click();
    await page.getByText("Form Layouts").click();
  });

  test.skip("input fields", async ({ page }) => {
    const usingTheGridEmailInput = page
      .locator("nb-card", { hasText: "Using the Grid" })
      .getByRole("textbox", { name: "Email" });
    const usingTheGridPasswordInput = page
      .locator("nb-card", { hasText: "Using the Grid" })
      .getByRole("textbox", { name: "Password" });

    await usingTheGridEmailInput.fill("thisisemail@test.te");
    // await usingTheGridPasswordInput.pressSequentially("Password", {
    //   delay: 500,
    // });

    // extract value
    const emailValue = await usingTheGridEmailInput.inputValue();
    // generic assertion
    expect(emailValue).toEqual("thisisemail@test.te");
    // locator assertion
    await expect(usingTheGridEmailInput).toHaveValue("thisisemail@test.te");
  });

  test.skip("radio buttons", async ({ page }) => {
    const usingTheGrid = page.locator("nb-card", { hasText: "Using the Grid" });

    // getByLabel
    await usingTheGrid.getByLabel("Option 1").check({ force: true }); //because it has visually-hidden property

    // getByRole
    await usingTheGrid
      .getByRole("radio", { name: "Option 2" })
      .check({ force: true });

    // GENERIC assertion for radio button
    const radioStatus = await usingTheGrid
      .getByRole("radio", { name: "Option 2" })
      .isChecked();

    expect(radioStatus).toBeTruthy();

    // LOCATOR assertion for radio button
    await expect(
      usingTheGrid.getByRole("radio", { name: "Option 2" }),
    ).not.toBeChecked();
  });
});

test.skip("checkboxes", async ({ page }) => {
  await page.getByText("Modal & Overlays").click();
  await page.getByText("Toastr").click();

  // click  - works for checked & uncheked checkboxes
  await page
    .getByRole("checkbox", { name: "Hide on click" })
    .click({ force: true }); //because it has visually-hidden property

  // check  - works only for uncheked checkboxes
  await page
    .getByRole("checkbox", { name: "Prevent arising of duplicate toast" })
    .check({ force: true });

  // uncheck  - works only for uncheked checkboxes
  await page
    .getByRole("checkbox", { name: "Show toast with icon" })
    .uncheck({ force: true });

  // get ALL checkboxes and verify that all are checked
  const allChboxs = page.getByRole("checkbox");

  for (const box of await allChboxs.all()) {
    await box.check({ force: true });
    expect(await box.isChecked()).toBeTruthy();
  }
});

test("list and dropdown", async ({ page }) => {
  const dropdownMenu = page.locator("ngx-header nb-select");
  await dropdownMenu.click();

  // getByRole('list') --> when the list has <ul> tag
  // getByRole('listitem') --> when the list has <li> tag

  //const optionList = page.getByRole('list').locator('nb-option')
  const optionList = page.locator("nb-option-list nb-option"); //array returned
  await expect(optionList).toHaveText(["Light", "Dark", "Cosmic", "Corporate"]);

  await optionList.filter({ hasText: "Cosmic" }).click(); // select another theme color

  // verify that theme color is changed to Cosmic
  const header = page.locator("nb-layout-header");
  await expect(header).toHaveCSS("backgroud-color", "rgb(50, 50, 89)");
});
