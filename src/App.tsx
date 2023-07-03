'use client'
import imglyRemoveBackground from '@imgly/background-removal';
import { useState } from 'react';


// type ImageSource = ImageData | ArrayBuffer | Uint8Array | Blob | URL | string;

export default function App() {
    const [downloadUrl, setDownloadUrl] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);

    return (
        <>
            <input
                type="file"
                value=''
                onChange={async (e) => {
                    if (!e.target.files) return;
                    const file = e.target.files[0];
                    const image_src = URL.createObjectURL(file);

                    setLoading(true);
                    const blob = await imglyRemoveBackground(image_src);
                    setLoading(false);
                    const url = URL.createObjectURL(blob);
                    setDownloadUrl(url);
                }}
            />
            {loading && <p>loading...</p>}
            {downloadUrl && (
                <a href={downloadUrl} download>
                    test
                </a>
            )}
        </>
    );
}
