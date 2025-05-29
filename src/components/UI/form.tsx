import type { ComponentProps } from "react";

interface FormProps extends ComponentProps<"input"> {
    label: string;
}

const TheForm = ({ label, ...props }: FormProps) => {
    return (
        <div>
            <label>
                <span>{label}</span>
                <input autoComplete="off" {...props} />
            </label>
        </div>
    )
}

export default TheForm;
