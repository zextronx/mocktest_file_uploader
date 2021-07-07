import {useState} from 'react';
import {useDropzone} from 'react-dropzone';
import {useDispatch, useSelector} from 'react-redux';
import {Redirect} from 'react-router-dom';

import {fileActions} from '../../actions';
import './styles.css';

const maxSize = 200;

const fileSizeValidator = (file) => {
    const sizeInMB = (file.size / (1024*1024)).toFixed(2);

    if (sizeInMB > maxSize) {
        return {
            code: 'file-too-large',
            messgae: `File size is larger than ${maxSize} mb`
        };
    }
};

const toBase64 = file => new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = error => reject(error);
});

const AddFile = () => {
    const [files, setFiles] = useState([]);
    const {redirectTo} = useSelector(state => state.files);

    const dispatch = useDispatch();

    const {acceptedFiles, fileRejections, getRootProps, getInputProps} = useDropzone({
        validator: fileSizeValidator,
        accept: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/pdf',
        onDrop: async acceptedFiles => {
            const data = [];
            for (let i = 0; i < acceptedFiles.length; i++) {
                const {name, type, size} = acceptedFiles[i];
                try {
                    const preview = await toBase64(acceptedFiles[i]);
                    data.push({
                        name,
                        type,
                        size,
                        preview
                    })
                } catch (e) {}
            }
            setFiles([...data]);
        }
    });

    if (redirectTo) {
        return <Redirect to="/" />;
    }

    const acceptedFileItems = acceptedFiles.map(file => (
        <li key={file.path}>
          {file.path} - {file.size} bytes
        </li>
      ));

    const fileRejectionItems = fileRejections.map(({ file, errors }) => (
        <li key={file.path}>
            {file.path} - {file.size} bytes
            <ul>
                {errors.map(e => (
                    <li key={e.code}>{e.message}</li>
                ))}
            </ul>
        </li>
    ));

    const handleUpload = async () => {
        dispatch(fileActions.addFile(files));
    }

    return (
        <section className="row mt-5">
            <div {...getRootProps({className: 'dropzone'})}>
                <input {...getInputProps()} />
                <p>Drag 'n' drop some files here, or click to select files</p>
                <em>(Only files with less than 200 mb size will be accepted)</em>
            </div>
            <hr />
            <div className="row mt-5">
                <div className="col">
                    <h4>Accepted files</h4>
                    <ul>{acceptedFileItems}</ul>
                </div>
                <div className="col">
                    <h4>Rejected files</h4>
                    <ul>{fileRejectionItems}</ul>
                </div>
            </div>

            <div className="row mt-5">
                <button disabled={!files.length} className="btn btn-outline-primary" onClick={handleUpload}>Upload</button>
            </div>
        </section>
    );
};

export default AddFile;
