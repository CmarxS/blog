'use client'
import { yupResolver } from '@hookform/resolvers/yup';
import { useMemo, useRef, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import * as yup from 'yup';
import Input from './Input';
import Button from './Button';
import Link from 'next/link';

type LoginFormData = {
    email: string;
    password: string;
};

const schema = yup
    .object({
        email: yup.string().email('E-mail inválido').required('E-mail é obrigatório'),
        password: yup.string().min(6, 'A senha deve ter no mínimo 6 caracteres').required('A senha é obrigatória'),
    }).required();

const LoginForm = () => {
    const formRef = useRef<HTMLFormElement>(null);
    const [loading, setLoading] = useState(false);
    const { control, handleSubmit, formState } = useForm<LoginFormData>({
        defaultValues: {
            email: '',
            password: ''
        },
        resolver: yupResolver(schema),
        mode: 'onChange'
    });
    const { errors, isValid } = useMemo(() => formState, [formState]);
    async function submitErrorCallback() {

    }
    async function submitCallback(values: LoginFormData) {
        setLoading(true);

        if (!isValid) {
            await submitErrorCallback()
            setLoading(false);
            return;
        }
        console.log(values);
        await new Promise((resolve) => setTimeout(resolve, 5000));
        setLoading(false);
        //limpe o formulário
        formRef.current?.reset();
    }

    return (
        <form
            className='flex flex-col gap-4 w-1/2 bg-slate-600 p-4 rounded'
            onSubmit={handleSubmit(submitCallback)}
            ref={formRef}
            noValidate
        >
            <Controller
                name='email'
                control={control}
                render={({ field }) => (
                    <Input
                        {...field}
                        type='email'
                        label='E-mail'
                        id='email'
                        placeholder='Digite seu e-mail'
                        readOnly={loading}
                        customError={errors.email?.message}
                        {...field}
                    />
                )}
            />
            <Controller
                name='password'
                control={control}
                render={({ field }) => (
                    <Input
                        {...field}
                        type='password'
                        label='Senha'
                        id='password'
                        placeholder='Digite sua senha'
                        minLength={6}
                        readOnly={loading}
                        customError={errors.password?.message}
                        {...field}
                    />
                )}
            />
            <Button type='submit' backgroundColor='pink' disabled={loading || !isValid || !formRef.current}>
                {loading ? 'Carregando...' : 'Entrar'}
            </Button>
            <Link href='/register'
                className='text-center text-blue-100 underline mr-auto'>Criar uma conta
            </Link>
        </form>
    );
};
export default LoginForm;
