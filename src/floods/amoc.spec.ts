import { getWarnings } from "./amoc";
import { getAmocToStateId } from "../getAmocToStateId";

describe("getting data", () => {
  it("should download data", async () => {
    const warnings = await getWarnings(getAmocToStateId('ACT'));

    expect(Object.keys(warnings).length).toBeGreaterThan(1);
  });

  it("should download data", async () => {
    const warnings = await getWarnings(getAmocToStateId('QLD'));

    expect(Object.keys(warnings)).toContain("IDQ11307.amoc.xml");
  });
});
