import { useCallback, useEffect, useId, useRef, useState } from 'react'
import { AlertCircle, X } from 'lucide-react'

export default function DetailModal({
  content,
  sectionLabel,
  closeLabel = 'Tutup detail',
  onClose,
  triggerRef,
}) {
  const dialogRef = useRef(null)
  const closeButtonRef = useRef(null)
  const closeTimerRef = useRef(null)
  const isClosingRef = useRef(false)
  const titleId = useId()
  const [isClosing, setIsClosing] = useState(false)

  const requestClose = useCallback(() => {
    if (isClosingRef.current) return
    isClosingRef.current = true
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      onClose()
      return
    }
    setIsClosing(true)
    closeTimerRef.current = window.setTimeout(onClose, 180)
  }, [onClose])

  useEffect(() => {
    const scrollY = window.scrollY
    const triggerElement = triggerRef.current
    const body = document.body
    const root = document.documentElement
    const previousBodyOverflow = body.style.overflow
    const previousRootOverflow = root.style.overflow
    const previousScrollBehavior = root.style.scrollBehavior

    body.style.overflow = 'hidden'
    root.style.overflow = 'hidden'
    closeButtonRef.current?.focus()

    const handleKeyDown = (event) => {
      if (event.key === 'Escape') {
        event.preventDefault()
        requestClose()
        return
      }

      if (event.key !== 'Tab') return

      const dialog = dialogRef.current
      const focusableElements = dialog?.querySelectorAll(
        'button:not([disabled]), a[href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])',
      )
      if (!dialog || !focusableElements?.length) {
        event.preventDefault()
        dialog?.focus()
        return
      }

      const firstElement = focusableElements[0]
      const lastElement = focusableElements[focusableElements.length - 1]
      const focusIsOutside = !dialog.contains(document.activeElement)

      if (event.shiftKey && (document.activeElement === firstElement || focusIsOutside)) {
        event.preventDefault()
        lastElement.focus()
      } else if (!event.shiftKey && (document.activeElement === lastElement || focusIsOutside)) {
        event.preventDefault()
        firstElement.focus()
      }
    }

    document.addEventListener('keydown', handleKeyDown)

    return () => {
      window.clearTimeout(closeTimerRef.current)
      document.removeEventListener('keydown', handleKeyDown)
      body.style.overflow = previousBodyOverflow
      root.style.overflow = previousRootOverflow
      root.style.scrollBehavior = 'auto'
      window.scrollTo(0, scrollY)
      root.style.scrollBehavior = previousScrollBehavior
      triggerElement?.focus({ preventScroll: true })
    }
  }, [requestClose, triggerRef])

  return (
    <div
      className={`fixed inset-0 z-[100] flex items-center justify-center bg-black/75 p-4 backdrop-blur-[2px] transition-opacity duration-200 ease-out motion-reduce:transition-none sm:p-6 ${
        isClosing ? 'opacity-0' : 'animate-in fade-in duration-200'
      }`}
      onClick={(event) => {
        if (event.target === event.currentTarget) requestClose()
      }}
    >
      <div
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        tabIndex={-1}
        className={`flex max-h-[calc(100dvh-2rem)] w-full max-w-2xl flex-col overflow-hidden rounded-xl border border-[#1e293b] bg-[#111827] shadow-2xl transition-[opacity,transform] duration-200 ease-out motion-reduce:transition-none sm:max-h-[calc(100dvh-3rem)] ${
          isClosing
            ? 'scale-95 opacity-0'
            : 'animate-in fade-in zoom-in-95 duration-200'
        }`}
      >
        <header className="relative shrink-0 border-b border-[#1e293b] px-5 py-5 pr-16 sm:px-7">
          <span className={`mb-2 inline-flex min-h-7 items-center rounded-md border px-2.5 py-1 text-[11px] font-bold ${content.badgeColor}`}>
            {content.tag}
          </span>
          <h2 id={titleId} className="text-xl font-bold leading-snug text-white sm:text-2xl">
            {content.title}
          </h2>
          <button
            ref={closeButtonRef}
            type="button"
            onClick={requestClose}
            aria-label={closeLabel}
            className="absolute right-4 top-4 inline-flex min-h-11 min-w-11 cursor-pointer items-center justify-center rounded-lg text-[#cbd5e1] transition-colors hover:bg-[#1a2234] hover:text-white active:bg-[#222f46] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#38bdf8]"
          >
            <X className="h-5 w-5" aria-hidden="true" />
          </button>
        </header>

        <div className="min-h-0 flex-1 overflow-y-auto overscroll-contain px-5 py-5 sm:px-7">
          <p className="mb-4 text-xs font-bold tracking-wide text-[#38bdf8]">
            {sectionLabel}
          </p>
          <ol className="list-decimal space-y-3 pl-5 text-sm leading-relaxed text-[#e2e8f0] marker:font-bold marker:text-[#38bdf8]">
            {content.details.map((detail, index) => {
              const text = typeof detail === 'string' ? detail : detail.text
              const highlight = typeof detail === 'object' && detail.highlight
              return (
                <li
                  key={`${content.id}-${index}`}
                  className={
                    highlight
                      ? 'rounded-lg border border-[#f97316]/40 bg-[#f97316]/10 px-3 py-3 pl-2 text-[#fff7ed]'
                      : 'pl-1'
                  }
                >
                  {text}
                </li>
              )
            })}
          </ol>

          {content.note && (
            <aside className="mt-5 flex items-start gap-3 rounded-lg border border-[#f97316]/40 bg-[#f97316]/10 p-4 text-sm leading-relaxed text-[#fff7ed]">
              <AlertCircle className="mt-0.5 h-4 w-4 shrink-0 text-[#fb923c]" aria-hidden="true" />
              <p>
                {content.noteLabel && <span className="font-semibold">{content.noteLabel}: </span>}
                {content.note}
              </p>
            </aside>
          )}
        </div>

        <footer className="shrink-0 border-t border-[#1e293b] px-5 py-4 sm:px-7">
          <button
            type="button"
            onClick={requestClose}
            className="ml-auto flex min-h-11 cursor-pointer items-center justify-center rounded-lg border border-[#334155] bg-[#1a2234] px-5 text-sm font-semibold text-white transition-colors hover:bg-[#222f46] active:bg-[#28354b] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#38bdf8]"
          >
            Tutup
          </button>
        </footer>
      </div>
    </div>
  )
}
