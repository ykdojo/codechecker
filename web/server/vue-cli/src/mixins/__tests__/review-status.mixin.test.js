import { useReviewStatus } from "@/composables/useReviewStatus";
import { ReviewStatus } from "@cc/report-server-types";

describe("Convert review status", () => {
  const { reviewStatusFromCodeToString, reviewStatusFromStringToCode } = useReviewStatus();

  test("Convert existing review statuses to string", () => {
    expect(reviewStatusFromCodeToString(ReviewStatus.UNREVIEWED)).toEqual("Unreviewed");
    expect(reviewStatusFromCodeToString(ReviewStatus.CONFIRMED)).toEqual("Confirmed bug");
    expect(reviewStatusFromCodeToString(ReviewStatus.FALSE_POSITIVE)).toEqual("False positive");
    expect(reviewStatusFromCodeToString(ReviewStatus.INTENTIONAL)).toEqual("Intentional");
  });

  test("Convert non existing review statuses to string", () => {
    expect(reviewStatusFromCodeToString(-1)).toEqual("");
    expect(reviewStatusFromCodeToString(null)).toEqual("");
  });

  test("Convert string to review status", () => {
    expect(reviewStatusFromStringToCode("Unreviewed")).toEqual(ReviewStatus.UNREVIEWED);
    expect(reviewStatusFromStringToCode("Confirmed bug")).toEqual(ReviewStatus.CONFIRMED);
    expect(reviewStatusFromStringToCode("false positive")).toEqual(ReviewStatus.FALSE_POSITIVE);
    expect(reviewStatusFromStringToCode("intentional")).toEqual(ReviewStatus.INTENTIONAL);
  });

  test("Convert non existing review statuses to string", () => {
    expect(reviewStatusFromStringToCode("")).toEqual(-1);
    expect(reviewStatusFromStringToCode("dummy")).toEqual(-1);
  });
});