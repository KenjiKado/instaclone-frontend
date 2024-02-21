import React, { forwardRef, useEffect, useImperativeHandle, useRef, useState } from "react";
import { useForm, UseFormGetValues, UseFormRegister, UseFormSetValue } from "react-hook-form";


interface IObject {
	[key: string]: any
}

interface IParams {
	register: UseFormRegister<IObject>;
	errors?: {
		[key: string]: IParams
	};
	isDisabled?: boolean;
}

interface IProps {
	formRef?: any;
	defaultValues?: IObject;
	mode?: 'onSubmit' | 'onBlur' | 'onChange';
	children: (params: IParams) => JSX.Element;
	resetFields?: {
		[key: string]: boolean;
	};
	className?: string;
	onSubmit?: (params: any) => void;
}

interface IHandlers {
	setValue: UseFormSetValue<IObject>;
	getValues: UseFormGetValues<IObject>;
}


const UIForm: React.ForwardRefRenderFunction<IHandlers, IProps> = ({ defaultValues, children, className, mode = 'onChange', onSubmit = () => { } }: IProps, formRef: any) => {
	const { handleSubmit, setValue, getValues, formState, register } = useForm({
		defaultValues,
		mode
	});

	const ref = useRef(null);

	useImperativeHandle(formRef, () => ({
		setValue,
		getValues
	}));

	const [isDisabled, setIsDisabled] = useState(true);

	useEffect(() => {
		setIsDisabled(!formState.isValid || !formState.isDirty);
	}, [formState.isValid, formState.isDirty])

	return (
		<form ref={ref} onSubmit={handleSubmit(onSubmit)} className={className} autoComplete="off">
			{children({
				register,
				errors: formState.errors,
				isDisabled
			})}
		</form>
	);
}

export default forwardRef(UIForm);