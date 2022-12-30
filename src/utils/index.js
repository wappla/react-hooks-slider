// eslint-disable-next-line import/prefer-default-export
export const roundToX = (num, X) => +(`${Math.round(`${num}e${X}`)}e-${X}`)
