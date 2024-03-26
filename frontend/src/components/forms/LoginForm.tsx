import React, { ChangeEvent, useState } from 'react'
import { Button, InputContainer, InputField, InputLabel } from '../../utils/styles'
import styles from './index.module.scss'
import { Link, useNavigate } from 'react-router-dom'
import { postLoginUser } from '../../utils/api'

const LoginForm = () => {
    const navigate = useNavigate();
    const init = {
        email: '', password: ''
    }
    const [info, setInfo] = useState(init)

    const onChange = (e: ChangeEvent<HTMLInputElement>) => {
        setInfo({
            ...info, [e.target.name]: e.target.value
        })
    }

    const onSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            await postLoginUser(info);
            navigate('/conversations');
        } catch (err) {
            console.log(err);
        }
    }

    return (
        <form className={styles.form} onSubmit={onSubmit}>
            <InputContainer>
                <InputLabel htmlFor='email'>Email</InputLabel>
                <InputField type="email" id='email' name='email' value={info.email} required onChange={onChange} />
            </InputContainer>
            <InputContainer>
                <InputLabel htmlFor='password'>Password</InputLabel>
                <InputField type="password" id='password' name='password' value={info.password} required onChange={onChange} />
            </InputContainer>
            <Button className={styles.button}>Login</Button>
            <div className={styles.footerText}>
                <span>Don't have an account? </span>
                <Link to="/register"><span>Register</span></Link>
            </div>
        </form>
    )
}

export default LoginForm
