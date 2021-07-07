import Modal from 'react-modal';

Modal.setAppElement('#root');

const customStyles = {
    content: {
        top: '50%',
        left: '50%',
        right: '30%',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',
    },
};

const Preview = (props) => {
    const {showModal, hideModal, docData} = props;
    const {name, preview} = docData;

    return (
        <Modal
            isOpen={showModal}
            onRequestClose={hideModal}
            style={customStyles}
        >
            <div className="modal-header">
                <h5 className="modal-title">Preview: {name}</h5>
                <button onClick={hideModal} type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div style={{height: "500px", overflowY: "auto"}} className="modal-body">
                <iframe width={600} height={600} src={`${preview}`} frameBorder="0" title={name} />
            </div>
            <div className="modal-footer">
                <button onClick={hideModal} type="button" className="btn btn-primary">Close</button>
            </div>
      </Modal>
    );
};

export default Preview;
