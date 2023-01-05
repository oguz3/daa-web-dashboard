export const hash = () =>
  Math.round(
    +(new Date().getTime() + '' + Math.round(Math.random() * Math.pow(10, 6))),
  ).toString(36)
