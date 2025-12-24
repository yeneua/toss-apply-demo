export interface ModalProps {
    open: boolean;
    onOpenChange?: (open: boolean) => void;
    closeOnEscape?: boolean;
    closeOnOverlayClick?: boolean;
    children: React.ReactNode;
}

export interface ModalContentProps {
    children: React.ReactNode;
    className?: string;
}

export interface ModalHeaderProps {
    children: React.ReactNode;
    className?: string;
}

export interface ModalTitleProps {
    children: React.ReactNode;
    className?: string;
}

export interface ModalBodyProps {
    children: React.ReactNode;
    className?: string;
}

export interface ModalFooterProps {
    children: React.ReactNode;
    className?: string;
}

export interface ModalCloseProps {
    className?: string;
    children?: React.ReactNode;
}

export interface ModalContextValue {
    open: boolean;
    onClose: () => void;
    titleId: string;
    contentId: string;
}
