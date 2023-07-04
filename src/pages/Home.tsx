import { ChangeEventHandler, useState } from 'react';
import ImageConvertor from '../components/ImageConvertor';

// type ImageSource = ImageData | ArrayBuffer | Uint8Array | Blob | URL | string;

export default function Home() {
    const [images, setImages] = useState<string[]>([]);

    const handleFileChange: ChangeEventHandler<HTMLInputElement> = async (e) => {
        const files = e.target.files;
        if (!files) return;

        const newImages = await Promise.all(
            [...files].map(async (file) => {
                const url = URL.createObjectURL(file);
                const image = await fetch(url).then((res) => res.blob());
                return URL.createObjectURL(image);
            })
        );

        setImages([...images, ...newImages]);
    };

    return (
        <>
            <input type="file" value="" multiple onChange={handleFileChange} />
            <ul>
                {images.map((image) => (
                    <li>
                        <ImageConvertor image={image} />
                    </li>
                ))}
            </ul>
        </>
    );
}
