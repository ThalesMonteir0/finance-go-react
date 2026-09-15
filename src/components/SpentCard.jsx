import { formatCurrencyBRL } from '../utils/format'
import './SpentCard.css'

function SpentCard({ totalAmountOut }) {
  const spent = Math.abs(totalAmountOut)

  return (
    <div className="spent-card">
      <span className="spent-card__label">QUANTO VOCÊ GASTOU</span>
      <span className="spent-card__value">{formatCurrencyBRL(spent)}</span>
    </div>
  )
}

export default SpentCard
