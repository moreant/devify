export const numberToFullHex = (num: number) => {
  return `0x${num.toString(16).padStart(2, '0').toUpperCase()}`
}

export const strToHexNum = (str: string, split?: string) =>
  parseInt(str.split(split || ' ').join(''), 16)
