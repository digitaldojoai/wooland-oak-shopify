/**
 * @param {string} num string representing a number, i.e. '0' or '1'
 * @return {string} '001'
 */
export function padZeros (num) {
  return num.length < 3 ? (
    padZeros(0 + num)
  ) : (
    num
  )
}
