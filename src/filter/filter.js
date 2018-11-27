export default {
  /**
   * 金额格式化
   */
  moneyFormatFilter (money) {
    return ((money - 0) / 100).toFixed(2)
  },
  test (money) {
    return ((money - 0) / 100).toFixed(2)
  }
}
