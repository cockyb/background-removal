import ImageConvertor from 'components/ImageConvertor';
import { useSequentialList } from 'hooks/useSequentialList';

export interface ImageInfo {
    blob: string;
    name: string;
}

interface ImageConvertorListProps {
    items: ImageInfo[];
}
export default function ImageConvertorList(props: ImageConvertorListProps) {
    const { items } = props;

    const { items: sequentialItems } = useSequentialList(items);

    return (
        <ul className="grid grid-cols-2 gap-3">
            {sequentialItems.map(({ blob, name, done }) => (
                <ImageConvertor key={name} image={blob} fileName={name} done={() => done()} />
            ))}
        </ul>
    );
}
