import {
  Cell,
  Legend,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
} from 'recharts'
import './EstablishmentPieChart.css'

const COLORS = ['#aa3bff', '#2e9e5b', '#f5a623', '#3b9dff', '#e5484d', '#00b8a9']

function EstablishmentPieChart({ data }) {
  const chartData = data.map((item) => ({
    name: item.estabelecimento,
    value: item.porcentagem,
  }))

  return (
    <div className="pie-card">
      <h2 className="pie-card__title">Gasto por estabelecimento</h2>
      <ResponsiveContainer width="100%" height={320}>
        <PieChart>
          <Pie
            data={chartData}
            dataKey="value"
            nameKey="name"
            cx="50%"
            cy="50%"
            outerRadius={110}
            label={({ value }) => `${value.toFixed(1)}%`}
          >
            {chartData.map((entry, index) => (
              <Cell key={entry.name} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip
            formatter={(value) => [`${value.toFixed(2)}%`, 'Percentual']}
          />
          <Legend
            layout="vertical"
            verticalAlign="middle"
            align="right"
            wrapperStyle={{ fontSize: 13 }}
          />
        </PieChart>
      </ResponsiveContainer>
    </div>
  )
}

export default EstablishmentPieChart
