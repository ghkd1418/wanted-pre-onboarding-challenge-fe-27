import type { InputHTMLAttributes } from 'react';
import { forwardRef } from 'react';

const Input = forwardRef<
	HTMLInputElement,
	InputHTMLAttributes<HTMLInputElement>
>((props, ref) => {
	return <input ref={ref} {...props} />;
});

export default Input;
