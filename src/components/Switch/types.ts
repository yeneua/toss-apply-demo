

export interface SwitchProps {
    /** Whether the switch is checked (controlled) */
    checked?: boolean;
    /** Default checked state (uncontrolled) */
    defaultChecked?: boolean;
    /** Callback when checked state changes */
    onCheckedChange?: (checked: boolean) => void;
    /** Whether the switch is disabled */
    disabled?: boolean;
    /** Size of the switch */
    size?: 'sm' | 'md' | 'lg';
    /** Additional CSS classes */
    className?: string;
    /** Accessible label for the switch */
    'aria-label'?: string;
    /** ID of the element labeling the switch */
    'aria-labelledby'?: string;
}
