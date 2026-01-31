import { expect, test } from "@playwright/test";

test.beforeEach(async ({ page }) => {
  await page.goto("http://localhost:4200/pages/iot-dashboard");
});

test("datepicker", async ({ page }) => {
  await page.getByText("Forms").click();
  await page.getByText("Datepicker ").click();

  // open the calendar
  const calendarInputField = page.getByPlaceholder("Form Picker");
  await calendarInputField.click();

  // get all the elements that related to current month | previous month has different classes
  const currentMonth = page.locator('[class="day-cell ng-star-inserted"]');

  // pick a date in current month
  await currentMonth.getByText("1", { exact: true }).click();

  await expect(calendarInputField).toHaveValue("Jun 1, 2026");
});

test("dynamically select a date in the datepicker", async ({ page }) => {
  await page.getByText("Forms").click();
  await page.getByText("Datepicker ").click();

  // open the calendar
  const calendarInputField = page.getByPlaceholder("Form Picker");
  await calendarInputField.click();

  let date = new Date();
  date.setDate(date.getDate() - 1); // previous date
  const expectedDate = date.getDate().toString();
  const expectedMonthShort = date.toLocaleString("En-US", { month: "short" });
  const expectedYear = date.getFullYear();

  const dateToAssert = `${expectedMonthShort} ${expectedDate}, ${expectedYear}`;

  // get all the elements that related to current month | previous month has different classes
  const currentMonth = page.locator('[class="day-cell ng-star-inserted"]');

  // set the date
  await currentMonth.getByText(expectedDate, { exact: true }).click();
  await expect(calendarInputField).toHaveValue(dateToAssert);
});
