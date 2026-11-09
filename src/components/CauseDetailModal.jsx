import DetailModal from './DetailModal'

export default function CauseDetailModal({ cause, onClose, triggerRef }) {
  return (
    <DetailModal
      content={cause}
      sectionLabel="MEKANISME PEMBENTUKAN"
      closeLabel="Tutup detail penyebab"
      onClose={onClose}
      triggerRef={triggerRef}
    />
  )
}
