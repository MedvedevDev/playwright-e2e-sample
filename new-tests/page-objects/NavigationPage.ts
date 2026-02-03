import { Locator, Page } from "@playwright/test";
import { HelperBase } from "./HelperBase";

export class NavigationPage extends HelperBase {
  readonly formLayoutsMenu: Locator;
  readonly datepickerMenu: Locator;
  readonly smartTableMenu: Locator;
  readonly toastrMenu: Locator;
  readonly tooltipMenu: Locator;

  constructor(page: Page) {
    super(page);
    this.formLayoutsMenu = page.getByText("Form Layouts");
    this.datepickerMenu = page.getByText("Datepicker");
    this.smartTableMenu = page.getByText("Smart Table");
    this.toastrMenu = page.getByText("Toastr");
    this.tooltipMenu = page.getByText("Tooltip");
  }

  async toFormLayoutsPage() {
    await this.selectGroupMenuItem("Forms");
    await this.formLayoutsMenu.click();

    await this.waitForNumberOfSeconds(2);
  }

  async toDatepickerPage() {
    await this.selectGroupMenuItem("Forms");
    await this.datepickerMenu.click();

    await this.waitForNumberOfSeconds(2);
  }

  async toSmartTablePage() {
    await this.page.getByText("Tables & Data").click();
    await this.smartTableMenu.click();

    await this.waitForNumberOfSeconds(2);
  }

  async toToastrPage() {
    await this.selectGroupMenuItem("Modal & Overlays");
    await this.toastrMenu.click();

    await this.waitForNumberOfSeconds(2);
  }

  async toTooltipPage() {
    await this.selectGroupMenuItem("Modal & Overlays");
    await this.tooltipMenu.click();

    await this.waitForNumberOfSeconds(2);
  }

  // helper method
  private async selectGroupMenuItem(groupTitle: string) {
    const groupMenu = this.page.getByTitle(groupTitle);
    const expandedState = await groupMenu.getAttribute("aria-expanded");
    if (expandedState === "false") {
      await groupMenu.click();
    }
  }
}
