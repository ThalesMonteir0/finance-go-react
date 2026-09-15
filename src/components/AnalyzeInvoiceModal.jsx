import { useRef, useState } from 'react'
import Modal from './Modal'
import { analyzeInvoice } from '../api/invoice'
import './AnalyzeInvoiceModal.css'

const initialErrors = { file: '', startDate: '', endDate: '' }

function AnalyzeInvoiceModal({ onClose, onAnalyzed }) {
  const [file, setFile] = useState(null)
  const [startDate, setStartDate] = useState('')
  const [endDate, setEndDate] = useState('')
  const [errors, setErrors] = useState(initialErrors)
  const [status, setStatus] = useState('idle') // idle | submitting | success | error
  const [errorMessage, setErrorMessage] = useState('')
  const fileInputRef = useRef(null)

  function handleFileChange(event) {
    const selected = event.target.files?.[0] ?? null

    if (selected && selected.type !== 'application/pdf') {
      setFile(null)
      event.target.value = ''
      setErrors((prev) => ({ ...prev, file: 'O arquivo precisa ser um PDF.' }))
      return
    }

    setFile(selected)
    setErrors((prev) => ({ ...prev, file: '' }))
  }

  function validate() {
    const nextErrors = { ...initialErrors }

    if (!file) nextErrors.file = 'Anexe o PDF do extrato.'
    if (!startDate) nextErrors.startDate = 'Informe a data inicial.'
    if (!endDate) nextErrors.endDate = 'Informe a data final.'
    if (startDate && endDate && endDate < startDate) {
      nextErrors.endDate = 'A data final não pode ser anterior à inicial.'
    }

    setErrors(nextErrors)
    return Object.values(nextErrors).every((message) => !message)
  }

  async function handleSubmit(event) {
    event.preventDefault()
    if (!validate()) return

    setStatus('submitting')
    try {
      const data = await analyzeInvoice({ file, startDate, endDate })
      setStatus('success')
      onAnalyzed?.(data)
      setTimeout(onClose, 1200)
    } catch (err) {
      setErrorMessage(
        err.response?.data?.message ||
          err.message ||
          'Tente novamente em instantes.',
      )
      setStatus('error')
    }
  }

  return (
    <Modal
      title="Analisar Extrato"
      onClose={onClose}
      footer={
        <>
          <button
            type="button"
            className="button button--ghost"
            onClick={onClose}
            disabled={status === 'submitting'}
          >
            Cancelar
          </button>
          <button
            type="submit"
            form="analyze-invoice-form"
            className="button button--primary"
            disabled={status === 'submitting'}
          >
            {status === 'submitting' ? 'Analisando...' : 'Analisar'}
          </button>
        </>
      }
    >
      <form
        id="analyze-invoice-form"
        className="analyze-form"
        onSubmit={handleSubmit}
        noValidate
      >
        <div className="analyze-form__field">
          <label htmlFor="invoice-file">
            Arquivo do Extrato (PDF) <span className="required">*</span>
          </label>
          <input
            id="invoice-file"
            ref={fileInputRef}
            type="file"
            accept=".pdf,application/pdf"
            onChange={handleFileChange}
          />
          {file && <span className="analyze-form__file-name">{file.name}</span>}
          {errors.file && <span className="analyze-form__error">{errors.file}</span>}
        </div>

        <div className="analyze-form__row">
          <div className="analyze-form__field">
            <label htmlFor="start-date">
              Data inicial <span className="required">*</span>
            </label>
            <input
              id="start-date"
              type="date"
              value={startDate}
              max={endDate || undefined}
              onChange={(event) => {
                setStartDate(event.target.value)
                setErrors((prev) => ({ ...prev, startDate: '' }))
              }}
            />
            {errors.startDate && (
              <span className="analyze-form__error">{errors.startDate}</span>
            )}
          </div>

          <div className="analyze-form__field">
            <label htmlFor="end-date">
              Data final <span className="required">*</span>
            </label>
            <input
              id="end-date"
              type="date"
              value={endDate}
              min={startDate || undefined}
              onChange={(event) => {
                setEndDate(event.target.value)
                setErrors((prev) => ({ ...prev, endDate: '' }))
              }}
            />
            {errors.endDate && (
              <span className="analyze-form__error">{errors.endDate}</span>
            )}
          </div>
        </div>

        {status === 'success' && (
          <p className="analyze-form__status analyze-form__status--success">
            Extrato enviado para análise com sucesso.
          </p>
        )}
        {status === 'error' && (
          <p className="analyze-form__status analyze-form__status--error">
            Não foi possível enviar o extrato. {errorMessage}
          </p>
        )}
      </form>
    </Modal>
  )
}

export default AnalyzeInvoiceModal
