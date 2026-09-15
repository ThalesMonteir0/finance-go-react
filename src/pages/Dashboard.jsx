import { useState } from 'react'
import SpentCard from '../components/SpentCard'
import TransactionsTable from '../components/TransactionsTable'
import EstablishmentPieChart from '../components/EstablishmentPieChart'
import AnalyzeInvoiceModal from '../components/AnalyzeInvoiceModal'
import './Dashboard.css'

function Dashboard() {
  const [summary, setSummary] = useState(null)
  const [isAnalyzeModalOpen, setAnalyzeModalOpen] = useState(false)

  const hasData = Boolean(summary)

  return (
    <div className="dashboard">
      <h1 className="dashboard__title">Painel financeiro</h1>

      <div className="dashboard__top">
        <div className="dashboard__spent-column">
          <SpentCard totalAmountOut={summary?.total_amount_out ?? 0} />
          <button
            type="button"
            className="button button--primary dashboard__analyze-button"
            onClick={() => setAnalyzeModalOpen(true)}
          >
            Analisar Extrato
          </button>
        </div>

        {hasData ? (
          <EstablishmentPieChart data={summary.percentage_per_establishment} />
        ) : (
          <div className="dashboard__empty-state">
            Envie um Extrato em "Analisar Extrato" para ver o gasto por
            estabelecimento.
          </div>
        )}
      </div>

      {hasData ? (
        <TransactionsTable transactions={summary.transactions} />
      ) : (
        <div className="dashboard__empty-state">
          Nenhuma transação carregada ainda. Analise um extrato para começar.
        </div>
      )}

      {isAnalyzeModalOpen && (
        <AnalyzeInvoiceModal
          onClose={() => setAnalyzeModalOpen(false)}
          onAnalyzed={setSummary}
        />
      )}
    </div>
  )
}

export default Dashboard
