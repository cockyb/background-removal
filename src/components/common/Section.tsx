import clsx from 'clsx';
import type { ComponentProps } from 'react';

type SectionProps = ComponentProps<'section'>;

export default function Section(props: SectionProps) {
    const { className, ...rest } = props;
    return <section className={clsx('py-6', className)} {...rest} />;
}
