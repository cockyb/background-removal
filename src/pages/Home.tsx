import clsx from 'clsx';
import ImageConvertor from 'components/ImageConvertor';
import type { ChangeEventHandler, DragEventHandler } from 'react';
import { useState } from 'react';
import { SlCloudUpload } from 'react-icons/sl';

type ImageInfo = {
    blob: string;
    name: string;
};

export default function Home() {
    const [images, setImages] = useState<ImageInfo[]>([]);
    const [dragEnter, setDragEnter] = useState<boolean>(false);

    const handleFileChange: ChangeEventHandler<HTMLInputElement> = async (e) => {
        const files = e.target.files;
        if (!files) return;
        handleImages(files);
    };

    const handleDrop: DragEventHandler<HTMLLabelElement> = async (e) => {
        e.preventDefault();
        setDragEnter(false);
        handleImages(e.dataTransfer.files);
    };

    const handleImages = async (files: FileList) => {
        const newImages = await Promise.all(
            [...files].map(async (file) => {
                const blob = await new Promise<string>((resolve) => {
                    const reader = new FileReader();
                    reader.onload = (e) => resolve(e.target?.result as string);
                    reader.readAsDataURL(file);
                });
                return { blob: blob, name: file.name };
            })
        );

        setImages([...images, ...newImages]);
    };

    return (
        <>
            <section className="py-6">
                <label
                    htmlFor="dropzone-file"
                    className={clsx(
                        'mx-auto cursor-pointer flex w-full max-w-lg flex-col items-center rounded-xl border-2 border-dashed border-blue-400 bg-white p-6 text-center',
                        {
                            'bg-gray-200 animate-pulse': dragEnter,
                        }
                    )}
                    onDragEnter={() => setDragEnter(true)}
                    onDragExit={() => setDragEnter(false)}
                    onDrop={handleDrop}
                    onDragOver={(e) => {
                        e.preventDefault();
                        setDragEnter(true);
                    }}
                >
                    <SlCloudUpload className="w-8 h-8 text-blue-400" />

                    <h2 className="mt-4 text-xl font-medium text-gray-700 tracking-wide">이미지 파일</h2>

                    <p className="mt-2 text-gray-500 tracking-wide">
                        이미지 파일을 여기에 끌어다 놓거나 <span className="text-blue-500">클릭</span>하여 업로드하세요.
                    </p>

                    <input id="dropzone-file" type="file" className="hidden" multiple onChange={handleFileChange} />
                </label>
            </section>
            <section className="py-6">
                {images.length > 0 && (
                    <ul className="grid grid-cols-4 gap-3">
                        {images.map(({ blob, name }, index) => (
                            <ImageConvertor
                                key={crypto.randomUUID()}
                                image={blob}
                                fileName={name}
                                onClickClose={() => {
                                    setImages(images.filter((image) => image.blob !== blob));
                                }}
                            />
                        ))}
                    </ul>
                )}
            </section>
        </>
    );
}
