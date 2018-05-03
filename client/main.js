const html = require('choo/html')
const css = require('sheetify')

const styles = require('./styles')
const inputGroup = require('./inputGroup')
const paramTable = require('./paramTable')

const main = ({ url, error }, emit) => {
  return html`
    <body class=${styles.container}>
      <div class=${styles.box}>
        <div class=${`${styles.cell} bg-navy light-blue`}>
          <label class=${styles.label}>URL Editor</label>
          <input 
            class=${`${styles.input}`}
            type="text" 
            placeholder="Paste your URL here" 
            value=${url.original} 
            oninput=${edit} />
          <span class=${styles.error}>${error}</span>
        </div>
      
        ${inputGroup(url, emit)}
        ${!error.length && url.original.length ? paramTable(url, emit) : ''}
      </div>
    </body>`

  function edit(e) {
    emit('testUrl', e.target.value)
    emit('editUrl', e.target.value)
  }
}

module.exports = main
