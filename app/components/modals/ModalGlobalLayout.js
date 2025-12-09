
export default function ModalGlobalLayout({ isOpen, onClose, title, children }) {
    if (!isOpen) return null;
    return (
        <div className="modal-overlay" onClick={onClose}>
            <div className="modal-global">
                <div className="modal-header">
                    <div className="modal-wrapper">
                        <h1>{title}</h1>
                        <button className="modal-close" onClick={onClose}>✕</button>
                    </div>
                </div>
                <div className="modal-box" onClick={(e) => e.stopPropagation()}>
                    <div className="modal-wrapper">
                        <div className="modal-content">
                            {children}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}