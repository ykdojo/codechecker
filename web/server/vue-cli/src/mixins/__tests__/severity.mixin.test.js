import { useSeverity } from "@/composables/useSeverity";
import { Severity } from "@cc/report-server-types";

describe("Convert severity", () => {
  const { severityFromCodeToString, severityFromStringToCode } = useSeverity();

  test("Convert existing severity value to string", () => {
    expect(severityFromCodeToString(Severity.UNSPECIFIED)).toEqual("Unspecified");
    expect(severityFromCodeToString(Severity.STYLE)).toEqual("Style");
    expect(severityFromCodeToString(Severity.LOW)).toEqual("Low");
    expect(severityFromCodeToString(Severity.MEDIUM)).toEqual("Medium");
    expect(severityFromCodeToString(Severity.HIGH)).toEqual("High");
    expect(severityFromCodeToString(Severity.CRITICAL)).toEqual("Critical");
  });

  test("Convert non existing severity to string", () => {
    expect(severityFromCodeToString(-1)).toEqual("");
    expect(severityFromCodeToString(null)).toEqual("");
  });

  test("Convert string to severity", () => {
    expect(severityFromStringToCode("Unspecified")).toEqual(Severity.UNSPECIFIED);
    expect(severityFromStringToCode("style")).toEqual(Severity.STYLE);
    expect(severityFromStringToCode("LOW")).toEqual(Severity.LOW);
    expect(severityFromStringToCode("MediUM")).toEqual(Severity.MEDIUM);
    expect(severityFromStringToCode("HIGH")).toEqual(Severity.HIGH);
    expect(severityFromStringToCode("critical")).toEqual(Severity.CRITICAL);
  });

  test("Convert string to non existing severity", () => {
    expect(severityFromStringToCode("")).toEqual(-1);
    expect(severityFromStringToCode("dummy")).toEqual(-1);
  });
});