import type { Config } from '@imgly/background-removal';
import imglyRemoveBackground from '@imgly/background-removal';
import clsx from 'clsx';
import { useEffect, useState } from 'react';
import { ImSpinner } from 'react-icons/im';
import React from 'react';
import When from 'components/common/When';

const config: Config = {
    publicPath: 'https://cropbg.net/assets/',
};

interface ImageConvertorProps {
    image: string;
    fileName: string;
    done: () => void;
}

const TABS = ['원본', '제거된 배경'] as const;
type Tab = (typeof TABS)[number];

function ImageConvertor(props: ImageConvertorProps) {
    const { image: originImage, fileName: originFileName, done } = props;
    const [convertedImage, setConvertedImage] = useState<string>('');
    const [fileName, setFileName] = useState<string>('');
    const [tab, setTab] = useState<Tab>('원본');
    const [loaded, setLoaded] = useState(false);

    useEffect(() => {
        (async () => {
            const blob = await imglyRemoveBackground(originImage, config);
            const url = URL.createObjectURL(blob);
            setConvertedImage(url);
            done();
            setLoaded(true);
        })();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        setFileName(originFileName);
    }, [originFileName]);

    useEffect(() => {
        return () => {
            URL.revokeObjectURL(convertedImage);
        };
    }, [convertedImage]);

    if (loaded === false) {
        return (
            <div className="w-full aspect-square flex flex-col gap-3 items-center justify-center rounded-sm shadow-sm p-4">
                <ImSpinner className="w-6 h-6 animate-spin" />
                <p className="text-xs text-center">이미지를 순차적으로 변환 중입니다.</p>
            </div>
        );
    }
    return (
        <div className="px-4 py-3 border border-gray-300 rounded-sm shadow-sm flex flex-col justify-between gap-4">
            <div className="flex gap-3">
                {TABS.map((t) => (
                    <button key={t} className={clsx('text-center', { 'text-blue-400 font-bold': tab === t })} onClick={() => setTab(t)}>
                        {t}
                    </button>
                ))}
            </div>
            {tab === '원본' && <img className="w-full aspect-square object-cover" src={originImage} alt="" />}
            {tab === '제거된 배경' && (
                <When
                    condition={!!convertedImage}
                    fallback={
                        <div className="w-full aspect-square flex items-center justify-center">
                            <ImSpinner className="w-6 h-6 animate-spin" />
                        </div>
                    }
                >
                    <img className="w-full aspect-square object-cover" src={convertedImage} alt="" />
                </When>
            )}

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

export default React.memo(ImageConvertor);
