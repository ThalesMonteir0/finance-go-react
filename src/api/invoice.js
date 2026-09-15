import apiClient from './client'
import { toApiDate } from '../utils/format'

// POST http://localhost:5005/upload?startDate=DD%2FMM%2FYYYY&endDate=DD%2FMM%2FYYYY
// com o PDF anexado no campo "file" (multipart/form-data), ex:
// curl --location 'http://localhost:5005/upload?startDate=01%2F09%2F2026&endDate=12%2F09%2F2026' \
//   --form 'file=@"/caminho/para/extrato.pdf"'
export async function analyzeInvoice({ file, startDate, endDate }) {
  const formData = new FormData()
  formData.append('file', file)

  const { data } = await apiClient.post('/upload', formData, {
    params: {
      start_date: toApiDate(startDate),
      end_date: toApiDate(endDate),
    },
  })

  return data
}
