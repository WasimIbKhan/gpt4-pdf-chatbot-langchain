import React, { useRef, ChangeEvent } from 'react';
import styles from '@/styles/DropFileInputStyles.module.css';
import uploadImg from '../../assets/cloud-upload-regular-240.png';

interface DropFileInputProps {
    onFileChange: (files: File[] | null) => void;
}

const DropFileInput: React.FC<DropFileInputProps> = ({ onFileChange }) => {
    const wrapperRef = useRef<HTMLDivElement | null>(null);

    const toggleDragoverClass = (add: boolean) => {
        if (wrapperRef.current) {
            const method = add ? 'add' : 'remove';
            wrapperRef.current.classList[method](styles.dragover);
        }
    };

    const onFileDrop = (e: ChangeEvent<HTMLInputElement>) => {
        const newFileList = e.target.files;
        onFileChange(newFileList ? Array.from(newFileList) : null);
    };

    return (
        <>
            <div
                ref={wrapperRef}
                className={styles.dropFileInput}
                onDragEnter={() => toggleDragoverClass(true)}
                onDragLeave={() => toggleDragoverClass(false)}
                onDrop={() => toggleDragoverClass(false)}
            >
                <div className={styles.dropFileInputLabel}>
                    <img src={uploadImg} alt="Upload icon" />
                    <p>Drag & Drop your files here</p>
                </div>
                <input 
                    type="file"
                    id="fileUploader"
                    onChange={onFileDrop}
                />
                <label htmlFor="fileUploader" className={styles.visuallyHidden}>File Uploader</label>
            </div>
        </>
    );
}

export default DropFileInput;
