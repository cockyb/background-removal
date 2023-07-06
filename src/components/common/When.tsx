interface WhenProps {
    children: React.ReactNode;
    condition: boolean;
    fallback?: React.ReactNode;
}

export default function When(props: WhenProps) {
    const { children, condition, fallback } = props;

    if (condition) {
        return <>{children}</>;
    }

    if (fallback) {
        return <>{fallback}</>;
    }

    return null;
}
