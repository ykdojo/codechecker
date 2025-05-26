import { FillHeight } from "./FillHeightDirective";

export const fillHeight = (app) => {
  app.directive('fill-height', FillHeight);
};

export {
  FillHeight
};