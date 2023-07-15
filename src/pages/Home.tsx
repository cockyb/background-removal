import type { ImageInfo } from 'components/ImageConvertorList';
import ImageConvertorList from 'components/ImageConvertorList';
import ImageUploadInput from 'components/ImageUploadInput';
import Section from 'components/common/Section';
import When from 'components/common/When';
import { useState } from 'react';

import BeforeImage from 'assets/images/before.jpg';
import AfterImage from 'assets/images/after.png';

export default function Home() {
    const [images, setImages] = useState<ImageInfo[]>([]);

    const handleImages = async (files: FileList) => {
        const newImages = await Promise.all(
            [...files].map(async (file) => {
                const blob = await new Promise<string>((resolve) => {
                    const reader = new FileReader();
                    reader.onload = (e) => resolve(e.target?.result as string);
                    reader.readAsDataURL(file);
                });
                return { blob: blob, name: file.name.split('.')[0] };
            })
        );

        setImages([...images, ...newImages]);
    };

    return (
        <>
            <When condition={images.length === 0}>
                <Section className="flex gap-12 items-center flex-col lg:flex-row">
                    <div className="flex flex-col gap-4 items-center">
                        <div className="relative w-72 h-72">
                            <img
                                className="w-72 h-72 object-cover rounded-xl shadow-xl animate-[fade-out_3s_2000ms] absolute top-0 left-0"
                                src={BeforeImage}
                                alt="before image"
                                style={{ animationFillMode: 'backwards' }}
                            />
                            <img
                                className="w-72 h-72 object-cover rounded-xl shadow-xl animate-fade-in absolute top-0 left-0 bg-white hover:opacity-0 transition-opacity duration-300"
                                src={AfterImage}
                                alt="after image"
                            />
                        </div>
                        <span className="flex flex-col gap-2">
                            <p className="text-4xl font-bold">
                                <strong className="bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-green-500 font-bold">무료로 </strong>
                                이미지 배경을 제거해 보세요.
                            </p>
                            <p className="text-gray-500 text-sm">추가 비용 및 개인 정보 보호 문제 없이 브라우저에서 직접 이미지의 배경을 쉽게 제거할 수 있습니다.</p>
                        </span>
                    </div>
                    <div className="flex flex-col gap-2">
                        <ImageUploadInput onFileChange={handleImages} />
                        <p className="text-xs text-center">여러 개의 이미지를 한 번에 업로드할 수 있습니다.</p>
                    </div>
                </Section>
            </When>

            <When condition={images.length > 0}>
                <Section>
                    <ImageConvertorList items={images} />
                </Section>
            </When>
        </>
    );
}
