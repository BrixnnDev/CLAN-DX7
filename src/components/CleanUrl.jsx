import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

function CleanUrl() {
  const location = useLocation()

  useEffect(() => {
    window.history.replaceState(null, '', '/')
  }, [location.pathname])

  useEffect(() => {
    const block = (e) => {
      const k = e.key ?? e.keyCode
      const isDevtools =
        k === 'F12' ||
        k === 123 ||
        (e.ctrlKey && e.shiftKey && ['I', 'J', 'C'].includes(k)) ||
        (e.ctrlKey && k === 'u')
      if (isDevtools) e.preventDefault()
    }
    const noContext = (e) => e.preventDefault()
    window.addEventListener('keydown', block)
    window.addEventListener('contextmenu', noContext)
    return () => {
      window.removeEventListener('keydown', block)
      window.removeEventListener('contextmenu', noContext)
    }
  }, [])

  return null
}

export default CleanUrl
