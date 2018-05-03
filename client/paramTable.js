const html = require('choo/html')
const css = require('sheetify')

const styles = require('./styles')
const strike = require('./strike')

const tableContainerStyle = css`
  :host {
    display: flex;
    flex-wrap: wrap;
    flex-direction: column;
    overflow: auto;
    margin: 5px;
  }

  :host > table {
    width: 100%;
    border-collapse: collapse;
  }

  :host > label {
    font-weight: bold;
    font-size: 120%;
    margin: 10px;
  }
`

const paramTable = (url, emit) => {
  return html`
    <div>
      ${strike()}
      <div class=${styles.cell}>
        <label class=${styles.label}>Params Table</label>
          <table class="f6 w-100 mw8 center"  cellspacing="0">
            <thead>
              <tr>
                <th class="fw6 tl pb3 pr3">Key</th>
                <th class="fw6 tl pb3 pr3">Value</th>
              </tr>
            </thead>
            <tbody class="lh-copy">
              <tr>
                <td class="pr3">
                  <input class=${styles.input} type="text" oninput=${e =>
    emit('addTempKey', e.target.value)} />            
                </td>
                <td class="pr3">
                  <input class=${styles.input} type="text" oninput=${e =>
    emit('addTempValue', e.target.value)} />
                </td>
                <td class="pr3">
                  <a class="sans-serif f6 link dim br3 ph3 pv2 mb2 dib white bg-dark-blue" onclick=${() =>
                    emit('addParam')}>+</a>
                </td>
              </tr>
            ${
              url.params.length
                ? url.params.map((item, index) => {
                    const [key, value] = Object.entries(item)[0]
                    return html`
                  <tr>
                    <td class="pr3">
                      <input class=${
                        styles.input
                      } type=text value=${key} oninput=${e =>
                      editParam(e.target.value, value, index)} />
                    </td>
                    <td class="pr3">
                      <input class=${
                        styles.input
                      } type=text value=${value} oninput=${e =>
                      editParam(key, e.target.value, index)} />
                    </td>
                    <td class="pr3">
                    <a class="sans-serif f6 link dim br3 ph3 pv2 mb2 dib white bg-light-red" onclick=${() =>
                      deleteParam(item)}>x</a></td>
                  </tr>
                  `
                  })
                : ''
            }
          </tbody>
        </table>
      </div>
    </div>
    
  `

  function deleteParam(param) {
    emit('deleteParam', param)
  }

  function editParam(key, value, index) {
    emit('editParam', key, value, index)
  }
}

module.exports = paramTable
