import { useStrToColor } from "@/composables/useStrToColor";

describe("Convert string to color", () => {
  const { strToColor } = useStrToColor();

  test("Convert empty string to color", () => {
    expect(strToColor("")).toEqual("#000000");
  });

  test("Different strings converted to different colors", () => {
    expect(strToColor("x")).not.toEqual(strToColor("y"));
  });
});