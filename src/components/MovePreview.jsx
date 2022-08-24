import React from 'react'
import Moment from 'react-moment'

export function MovePreview({ move }) {
  return (
    <div className="move-preview flex column">
      {/* <span className="small-title smaller">Transaction</span> */}
      <span>{move.to}</span>
      <span>{move.amount}$</span>
      <span>
        <Moment format="YYYY/MM/DD">{move.transferDate}</Moment>
      </span>
    </div>
  )
}
