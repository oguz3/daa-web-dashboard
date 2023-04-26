export const findElementInLayout = (layout, name) => {
  const layoutData = JSON.parse(JSON.stringify(layout));
  const result = null;
  Object.keys(layoutData).forEach((key) => {
    if (layoutData[key] && layoutData[key].name === name) {
      result = layoutData[key];
    }
  });

  return result;
};
