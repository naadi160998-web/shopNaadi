import Modal from './Modal'

export default function ConfirmDialog({ message, name, onConfirm, onCancel }) {
  return (
    <Modal
      title="Confirm Delete"
      onClose={onCancel}
      footer={
        <>
          <button className="btn-outline" onClick={onCancel}>Cancel</button>
          <button className="btn-danger" onClick={onConfirm}>🗑 Delete</button>
        </>
      }
    >
      <div className="confirm-icon">⚠️</div>
      <p className="confirm-msg">
        {message} <span className="confirm-name">"{name}"</span>? This action cannot be undone.
      </p>
    </Modal>
  )
}
