'use client';
import { yupResolver } from '@hookform/resolvers/yup';
import { useMemo, useRef, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import * as yup from 'yup';
import Input from './Input';
import Button from './Button';
import Link from 'next/link';

type RegisterFormData = {
    name: string;
    email: string;
    cpf: string;
    birthDate: string;
    password: string;
    confirmPassword: string;
};

const isValidAge = (birthDate?: string): boolean => {
    const today = new Date();
    if (!birthDate) return false;
    const birth = new Date(birthDate);
    let age = today.getFullYear() - birth.getFullYear();
    const monthDiff = today.getMonth() - birth.getMonth();

    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birth.getDate())) {
        age--;
    }

    return age >= 18;
}

const schema = yup
    .object({
        name: yup.string().required('Nome é obrigatório'),
        email: yup.string().email('E-mail inválido').required('E-mail é obrigatório'),
        cpf: yup
            .string()
            .matches(/^\d{3}\.\d{3}\.\d{3}-\d{2}$/, 'CPF deve estar no formato XXX.XXX.XXX-XX')
            .required('CPF é obrigatório'),
        birthDate: yup
            .string()
            .test('is-18', 'Você precisa ser maior de 18 anos', isValidAge) // Usando a função para calcular a idade
            .required('Data de nascimento é obrigatória'),
        password: yup.string().min(6, 'A senha deve ter no mínimo 6 caracteres').required('A senha é obrigatória'),
        confirmPassword: yup
            .string()
            .oneOf([yup.ref('password')], 'As senhas devem ser iguais')
            .required('Confirmação de senha é obrigatória'),
    })
    .required();

const RegisterForm = () => {
    const formRef = useRef<HTMLFormElement>(null);
    const [loading, setLoading] = useState(false);
    const { control, handleSubmit, formState } = useForm<RegisterFormData>({
        defaultValues: {
            name: '',
            email: '',
            cpf: '',
            birthDate: '',
            password: '',
            confirmPassword: '',
        },
        resolver: yupResolver(schema),
        mode: 'onChange',
    });
    const { errors, isValid } = useMemo(() => formState, [formState]);

    async function submitErrorCallback() {
        // Lidar com erros (se necessário)
    }

    async function submitCallback(values: RegisterFormData) {
        setLoading(true);

        if (!isValid) {
            await submitErrorCallback();
            setLoading(false);
            return;
        }

        console.log(values);
        await new Promise((resolve) => setTimeout(resolve, 5000));
        setLoading(false);

        // Limpar o formulário
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
                name='name'
                control={control}
                render={({ field }) => (
                    <Input
                        {...field}
                        type='text'
                        label='Nome'
                        id='name'
                        placeholder='Digite seu nome'
                        readOnly={loading}
                        customError={errors.name?.message}
                    />
                )}
            />
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
                    />
                )}
            />
            <Controller
                name='cpf'
                control={control}
                render={({ field }) => (
                    <Input
                        {...field}
                        type='text'
                        label='CPF'
                        id='cpf'
                        placeholder='Digite seu CPF'
                        readOnly={loading}
                        customError={errors.cpf?.message}
                    />
                )}
            />
            <Controller
                name='birthDate'
                control={control}
                render={({ field }) => (
                    <Input
                        {...field}
                        type='date'
                        label='Data de nascimento'
                        id='birthDate'
                        readOnly={loading}
                        customError={errors.birthDate?.message}
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
                        readOnly={loading}
                        customError={errors.password?.message}
                    />
                )}
            />
            <Controller
                name='confirmPassword'
                control={control}
                render={({ field }) => (
                    <Input
                        {...field}
                        type='password'
                        label='Confirmar Senha'
                        id='confirmPassword'
                        placeholder='Confirme sua senha'
                        readOnly={loading}
                        customError={errors.confirmPassword?.message}
                    />
                )}
            />
            <Button type='submit' backgroundColor='pink' disabled={loading || !isValid || !formRef.current}>
                {loading ? 'Carregando...' : 'Registrar'}
            </Button>
            <Link href='/login' className='text-center text-blue-100 underline mr-auto'>
                Já tem uma conta? Faça login
            </Link>
        </form>
    );
};

export default RegisterForm;
