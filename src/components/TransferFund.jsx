import React from 'react'
import { useRef } from 'react'
var amount = 0

function onHandleChange({ target }) {
  const { value } = target
  amount = +value
}
export function TransferFund({contact, maxCoins, onTransferCoins }) {
  const inputRef = useRef(null)
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
        <input
          ref={inputRef}
          type="text"
          onChange={onHandleChange}
          placeholder="Transfer coins.."
        />
        <button className='nice-button'>Transfer</button>
      </label>
    </form>
  )
}
