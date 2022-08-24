import React from 'react'
import NumberFormat from 'react-number-format'
var amount = 0

function onHandleChange({ target }) {
  const { value } = target
  amount = +(value.slice(1))
}
export function TransferFund({ contact, maxCoins, onTransferCoins }) {
  var inputRef = React.createRef()
  function transferCoins(ev) {
    ev.preventDefault()
    if (typeof amount !== 'number' || amount > maxCoins || !amount) return
    else {
      onTransferCoins(amount, contact.name)
      inputRef.current.value = ''
    }
  }

  return (
    <form className="flex align-center" onSubmit={transferCoins}>
      <label htmlFor="amount">
        {/* <input
          ref={inputRef}
          type="text"
          onChange={onHandleChange}
          placeholder="Transfer coins.."
        /> */}
        <NumberFormat
          thousandSeparator={true}
          prefix={'$'}
          onChange={onHandleChange}
          placeholder="Transfer coins.."
          getInputRef={inputRef}
        />

        <button className="nice-button">Transfer</button>
      </label>
    </form>
  )
}
