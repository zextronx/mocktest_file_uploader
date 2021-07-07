import {useEffect, useState} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {AgGridColumn, AgGridReact} from 'ag-grid-react';

import {fileActions} from '../../actions';
import Preview from './preview';

import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine.css';

const actionRenderer = (props) => {
    const {onPreviewClick, data} = props;
    return (
        <div>
            <button onClick={() => onPreviewClick(data)} type="button" className="m-1 btn btn-outline-secondary btn-sm"><i className="bi bi-eye"></i></button>
            <a download={data.name} className="m-1 btn btn-outline-secondary btn-sm" href={data.preview} role="button"><i className="bi bi-download"></i></a>
        </div>
    );
};

const FileList = () => {
    const {files} = useSelector(state => state.files);
    const dispatch = useDispatch();
    const [showModal, setShowModal] = useState(false);
    const [docData, setDocData] = useState({});

    useEffect(() => {
        dispatch(fileActions.fileList());
    }, [dispatch]);

    const onPreviewClick = (data) => {
        setShowModal(true);
        setDocData(data)
    }

    return (
        <div className="row mt-5 ag-theme-alpine" style={{height: 400}}>
           <AgGridReact
               rowData={files}
               domLayout={'autoHeight'}>
               <AgGridColumn width={300} field="name"></AgGridColumn>
               <AgGridColumn width={300} field="type"></AgGridColumn>
               <AgGridColumn width={150} headerName="Size (bytes)" field="size"></AgGridColumn>
               <AgGridColumn width={150} headerName="Actions" field="preview" cellRendererFramework={actionRenderer}
                cellRendererParams={{onPreviewClick}}></AgGridColumn>
           </AgGridReact>
           <Preview
                docData={docData}
                hideModal={() => setShowModal(false)} 
                showModal={showModal} />
       </div>
    );
};

export default FileList;
