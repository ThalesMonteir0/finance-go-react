import { formatCurrencyBRL, formatDateBRL } from '../utils/format'
import './TransactionsTable.css'

function TransactionsTable({ transactions }) {
  const sorted = [...transactions].sort(
    (a, b) => new Date(b.Date) - new Date(a.Date),
  )

  return (
    <div className="transactions-table">
      <h2 className="transactions-table__title">Transações</h2>
      <div className="transactions-table__scroll">
        <table>
          <thead>
            <tr>
              <th>Data</th>
              <th>Descrição</th>
              <th>Tipo</th>
              <th className="transactions-table__amount-col">Valor</th>
            </tr>
          </thead>
          <tbody>
            {sorted.map((tx, index) => (
              <tr key={`${tx.Date}-${tx.Description}-${index}`}>
                <td>{formatDateBRL(tx.Date)}</td>
                <td>{tx.Description}</td>
                <td>
                  <span
                    className={`badge badge--${tx.Type === 'IN' ? 'in' : 'out'}`}
                  >
                    {tx.Type === 'IN' ? 'Entrada' : 'Saída'}
                  </span>
                </td>
                <td
                  className={`transactions-table__amount-col transactions-table__amount transactions-table__amount--${
                    tx.Amount >= 0 ? 'in' : 'out'
                  }`}
                >
                  {formatCurrencyBRL(tx.Amount)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default TransactionsTable
