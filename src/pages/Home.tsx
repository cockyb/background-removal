import type { ImageInfo } from 'components/ImageConvertorList';
import ImageConvertorList from 'components/ImageConvertorList';
import ImageUploadInput from 'components/ImageUploadInput';
import Section from 'components/common/Section';
import When from 'components/common/When';
import { useState } from 'react';

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
                <Section>
                    <ImageUploadInput onFileChange={handleImages} />
                </Section>
            </When>

            <Section>
                <ImageConvertorList items={images} />
            </Section>
        </>
    );
}
