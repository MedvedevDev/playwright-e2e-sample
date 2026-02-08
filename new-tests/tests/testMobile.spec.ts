import { expect, test } from "@playwright/test";

test.beforeEach(async ({ page }, testInfo) => {
  await page.goto("/pages/iot-dashboard");
  if (testInfo.project.name === "mobile") {
    await page.locator(".sidebar-toggle").click();
  }
  await page.getByText("Forms").click();
  await page.getByText("Form Layouts").click();
  if (testInfo.project.name === "mobile") {
    await page.locator(".sidebar-toggle").click();
  }
});

test("input fields", async ({ page }) => {
  const usingTheGridEmailInput = page
    .locator("nb-card", { hasText: "Using the Grid" })
    .getByRole("textbox", { name: "Email" });
  const usingTheGridPasswordInput = page
    .locator("nb-card", { hasText: "Using the Grid" })
    .getByRole("textbox", { name: "Password" });

  await usingTheGridEmailInput.fill("thisisemail@test.te");

  // extract value
  const emailValue = await usingTheGridEmailInput.inputValue();
  // generic assertion
  expect(emailValue).toEqual("thisisemail@test.te");
  // locator assertion
  await expect(usingTheGridEmailInput).toHaveValue("thisisemail@test.te");
  await page.waitForTimeout(2000);
});

test("radio buttons", async ({ page }) => {
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
  ).toBeChecked();
});
