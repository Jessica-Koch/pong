import { getElementFontSize } from './getElementFontSize';

export const convertToEm = (val, context) => val * getElementFontSize(context);
