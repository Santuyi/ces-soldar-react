import { useEffect, useState } from 'react'

export default function useAsync(loader, parameter) {
  const [state, setState] = useState({ data: null, loading: true, error: '' })
  const [attempt, setAttempt] = useState(0)
  useEffect(() => {
    let active = true
    loader(parameter).then((data) => {
      if (active) setState({ data, loading: false, error: '', parameter, attempt })
    }).catch(() => {
      if (active) setState({ data: null, loading: false, error: 'No pudimos cargar la informacion. Revisa tu conexion e intenta nuevamente.', parameter, attempt })
    })
    return () => { active = false }
  }, [loader, parameter, attempt])
  const current = state.parameter === parameter && state.attempt === attempt
  return { data: current ? state.data : null, loading: !current || state.loading, error: current ? state.error : '', retry: () => setAttempt((value) => value + 1) }
}
