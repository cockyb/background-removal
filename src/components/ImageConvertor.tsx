import type { Config } from '@imgly/background-removal';
import imglyRemoveBackground from '@imgly/background-removal';
import clsx from 'clsx';
import { useEffect, useState } from 'react';
import { SlClose } from 'react-icons/sl';
import { ImSpinner } from 'react-icons/im';

interface ImageConvertorProps {
    image: string;
    fileName: string;
    onClickClose: () => void;
}

const TABS = ['원본', '제거된 배경'] as const;
type Tab = (typeof TABS)[number];

export default function ImageConvertor(props: ImageConvertorProps) {
    const { image: originImage, fileName: originFileName, onClickClose } = props;
    const [convertedImage, setConvertedImage] = useState<string>('');
    const [fileName, setFileName] = useState<string>('');
    const [tab, setTab] = useState<Tab>('원본');

    const onClickReConvert = async () => {
        setConvertedImage('');
        const url = await convertImage(originImage);
        setConvertedImage(url);
    };

    const convertImage = async (image: string) => {
        const config: Config = {
            publicPath: 'https://dq2ft8ldnul0t.cloudfront.net/assets/', // path to the wasm files
        };

        const blob = await imglyRemoveBackground(image, config);
        const url = URL.createObjectURL(blob);
        return url;
    };

    useEffect(() => {
        (async () => {
            const url = await convertImage(originImage);
            setConvertedImage(url);
        })();
    }, [originImage]);

    useEffect(() => {
        setFileName(originFileName);
    }, [originFileName]);

    return (
        <div className="px-4 py-3 border border-gray-300 rounded-sm shadow-sm flex flex-col justify-between gap-4">
            <div className="flex gap-3">
                {TABS.map((t) => (
                    <button key={t} className={clsx('text-center', { 'text-blue-400 font-bold': tab === t })} onClick={() => setTab(t)}>
                        {t}
                    </button>
                ))}
                <button className="ml-auto" onClick={onClickClose}>
                    <SlClose className="w-5 h-5 hover:text-gray-400 duration-150" />
                </button>
            </div>
            {tab === '원본' && <img className="w-full aspect-square object-cover" src={originImage} alt="" />}
            {tab === '제거된 배경' && <ConvertedImage image={convertedImage} />}

            <label className="flex gap-2 items-center justify-center flex-wrap">
                <span className="text-gray-500">파일명</span>
                <input
                    className="w-auto border border-gray-300 focus:outline-none focus:border-blue-400 px-3 py-1 rounded-md"
                    type="text"
                    value={fileName}
                    onChange={(e) => setFileName(e.target.value)}
                />
                <span>.png</span>
            </label>

            <div className="flex gap-3 items-center justify-center flex-wrap">
                <button className="px-4 py-2 text-gray-500 rounded-md border-gray-400 border text-sm" onClick={onClickReConvert}>
                    다시변환
                </button>
                <a
                    className={clsx('px-4 py-2 text-white bg-blue-400 rounded-md text-sm', {
                        'opacity-50 cursor-not-allowed pointer-events-none': !convertedImage,
                    })}
                    href={convertedImage}
                    download={fileName}
                >
                    다운로드
                </a>
            </div>
        </div>
    );
}

function ConvertedImage(props: { image: string }) {
    const { image } = props;

    if (!image)
        return (
            <div className="w-full aspect-square flex items-center justify-center">
                <ImSpinner className="w-6 h-6 animate-spin" />
            </div>
        );
    return <img className="w-full aspect-square object-cover" src={image} alt="" />;
}
