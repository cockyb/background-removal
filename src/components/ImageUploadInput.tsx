import clsx from 'clsx';
import { useId, useState } from 'react';
import { SlCloudUpload } from 'react-icons/sl';

interface ImageUploadInputProps {
    onFileChange: (files: FileList) => void;
}

export default function ImageUploadInput(props: ImageUploadInputProps) {
    const { onFileChange } = props;
    const [dragEnter, setDragEnter] = useState<boolean>(false);
    const inputId = useId();

    const handleDragEnter = () => {
        setDragEnter(true);
    };

    const handleDragExit = () => {
        setDragEnter(false);
    };

    const handleDrop = (e: React.DragEvent<HTMLLabelElement>) => {
        e.preventDefault();
        setDragEnter(false);
        onFileChange(e.dataTransfer.files);
    };

    const handleDragOver = (e: React.DragEvent<HTMLLabelElement>) => {
        e.preventDefault();
        setDragEnter(true);
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = e.target.files;
        if (!files) return;
        onFileChange(files);
    };

    const labelClass = clsx('mx-auto cursor-pointer flex w-full max-w-lg flex-col items-center rounded-xl border-2 border-dashed border-blue-400 bg-white p-6 text-center', {
        'bg-gray-200 animate-pulse': dragEnter,
    });

    return (
        <label htmlFor={inputId} className={labelClass} onDragEnter={handleDragEnter} onDragExit={handleDragExit} onDrop={handleDrop} onDragOver={handleDragOver}>
            <SlCloudUpload className="w-8 h-8 text-blue-400" />

            <h2 className="mt-4 text-xl font-medium text-gray-700 tracking-wide">이미지 파일</h2>

            <p className="mt-2 text-gray-500 tracking-wide">
                이미지 파일을 여기에 끌어다 놓거나 <br /> <span className="text-blue-500">클릭</span>하여 업로드하세요.
            </p>

            <input id={inputId} type="file" className="hidden" multiple onChange={handleFileChange} />
        </label>
    );
}
