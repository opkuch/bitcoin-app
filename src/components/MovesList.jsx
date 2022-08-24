import React from 'react'
import { MovePreview } from './MovePreview'
import transactionImg from '../assets/images/transaction.svg'

export function MovesList({lastMoves}) {
  return (
    <div className='flex column'>
      <span className='home-title small-title flex column align-center'>
        <img className='svg-medium' src={transactionImg} />
        Your last transactions
        </span>
      <ul className='clean-list moves-list flex column'>
        {lastMoves.length? lastMoves.map(move => <MovePreview key={move.id} move={move} />) : 'No transactions made yet..'}
        </ul>
    </div>
  )
}
  