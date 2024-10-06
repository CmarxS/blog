import { forwardRef, InputHTMLAttributes, ReactNode, useMemo } from "react";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
    label?: ReactNode
    customError?: string | null
}

const Input = forwardRef<HTMLInputElement, InputProps>(({ disabled, readOnly, label, customError, className = "", ...props }, ref) => {
    const errorMessage = useMemo(() => customError, [customError]);
    const hasActionsState = useMemo(() => disabled || readOnly, [disabled, readOnly]);
    const hasControllState = useMemo(() => hasActionsState || errorMessage, [hasActionsState, errorMessage]);
    const canShowError = useMemo(() => errorMessage && !hasActionsState, [errorMessage, hasActionsState]);

    return (
        <div className="w-full">
            {label && (
                <label
                    className="text-sm font-semibold text-white"
                    htmlFor={props.id ?? props.name ?? ""}
                >
                    {label}
                </label>
            )}
            <input
                className={`
                    w-full block p-2 border rounded focus:outline-none focus:ring-1 ring-current border-neutral-900 
                    ${!hasControllState ? "bg-white border-neutral-900" : ""}
                    ${disabled ? "bg-gray-300 border-gray-300 cursor-not-allowed" : ""}
                    ${readOnly ? "bg-gray-100 border-gray-300 cursor-not-allowed" : ""}
                    ${canShowError ? "border-red-500 border-2 ring-red-500" : ""}
                    ${className}
                `}
                disabled={disabled}
                readOnly={readOnly}
                ref={ref}
                {...props}
            />
            <span className={`min-h-4 text-red-500 text-xs px-0.5 pt-0.5 block leading-none ${canShowError ? "opacity-100" : "opacity-0"}`}>
                {errorMessage}
            </span>
        </div>
    );
});

Input.displayName = "Input";
export default Input;
