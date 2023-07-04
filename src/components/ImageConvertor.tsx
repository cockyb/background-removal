import imglyRemoveBackground from '@imgly/background-removal';
import { useState } from 'react';

interface ImageConvertorProps {
    image: string;
}

// let image_src: ImageData | ArrayBuffer | Uint8Array | Blob | URL | string = ...;

export default function ImageConvertor(props: ImageConvertorProps) {
    const { image: originImage } = props;
    const [convertedImage, setConvertedImage] = useState<string>('');

    const onClickConvert = async () => {
        const blob = await imglyRemoveBackground(originImage);
        const url = URL.createObjectURL(blob);
        setConvertedImage(url);
    };
    return (
        <div>
            <img src={originImage} alt="" />
            <button onClick={onClickConvert}>변환</button>
            <img src={convertedImage} alt="" />
            <a href={convertedImage} download="image.png">
                다운로드
            </a>
        </div>
    );
}
