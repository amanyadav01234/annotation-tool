import Button from '@editor/components/common/Button'
import Modal from '@editor/components/common/Modal'
import './ShortcutsModal.css'

const TITLE = 'Keyboard Shortcuts'

type ShortcutsModalProps = {
  isOpen: boolean
  onClose: () => void
}

const SHORTCUTS = [
  { key: 'Ctrl + Z / Cmd + Z', description: 'Undo action' },
  { key: 'Ctrl + Y / Cmd + Shift + Z', description: 'Redo action' },
  { key: 'Ctrl + A / Cmd + A', description: 'Select all shapes' },
  { key: 'Ctrl + X / Cmd + X', description: 'Cut selection' },
  { key: 'Ctrl + C / Cmd + C', description: 'Copy selection' },
  { key: 'Ctrl + V / Cmd + V', description: 'Paste selection' },
  { key: 'Delete / Backspace', description: 'Delete selected shape' },
  { key: 'Space + Drag', description: 'Pan canvas' },
  { key: 'Shift + Resize', description: 'Preserve aspect ratio' },
  { key: 'Alt + Resize', description: 'Resize from center' }
]

const ShortcutsModal = ({ isOpen, onClose }: ShortcutsModalProps) => {
  if (!isOpen) return null

  return (
    <Modal className='react-paint-editor-toolbox-shortcuts-modal' onClose={onClose} title={TITLE}>
      <h3>{TITLE}</h3>
      <hr />
      <div className='react-paint-shortcuts-list'>
        {SHORTCUTS.map(sc => (
          <div key={sc.key} className='react-paint-shortcut-item'>
            <kbd>{sc.key}</kbd>
            <span>{sc.description}</span>
          </div>
        ))}
      </div>
      <Button selected onClick={onClose}>
        Close
      </Button>
    </Modal>
  )
}

export default ShortcutsModal
