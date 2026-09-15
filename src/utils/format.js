export function formatCurrencyBRL(value) {
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  }).format(value)
}

export function formatDateBRL(isoDate) {
  const date = new Date(isoDate)
  return new Intl.DateTimeFormat('pt-BR', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    timeZone: 'UTC',
  }).format(date)
}

// Converte uma data de input (YYYY-MM-DD) para o formato DD/MM/YYYY
// esperado pela API de upload de fatura.
export function toApiDate(inputDate) {
  const [year, month, day] = inputDate.split('-')
  return `${day}/${month}/${year}`
}
