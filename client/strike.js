const html = require('choo/html')

const styles = require('./styles')

const strike = () => html`
  <div class=${styles.strike}>
    <span>AND</span>
  </div>
`

module.exports = strike
