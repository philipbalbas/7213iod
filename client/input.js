const html = require('choo/html')

const styles = require('./styles')

const input = (value, label, onInput, onInputType, placeholder) => html`
  <div class=${`${styles.cell}`}>
    <label class=${styles.label}>${label}</label>
    <input
      class=${styles.input}
      type="text" 
      value=${value} 
      oninput=${e => onInput(e.target.value, onInputType)}
      placeholder=${placeholder}
      />  
  </div>
`

module.exports = input
