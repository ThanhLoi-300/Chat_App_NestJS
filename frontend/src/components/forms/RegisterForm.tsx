import { Button, InputContainer, InputField, InputLabel } from '../../utils/styles'
import styles from './index.module.scss'
import { Link, useNavigate } from 'react-router-dom'
import { ChangeEvent, useState } from 'react'
import { postRegisterUser } from '../../utils/api'
// import { toast } from 'react-toastify';

const RegisterForm = () => {
    const navigate = useNavigate();
    const init = {
        email: '', name: '', password: ''
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
            await postRegisterUser(info);
            navigate('/login');
            // toast.clearWaitingQueue();
            // toast('Account created!', { type: 'success', icon: true });
        } catch (err) {
            console.log(err);
            // toast.clearWaitingQueue();
            // toast('Error creating user', { type: 'error', icon: true });
        }
    }

    return (
        <form className={styles.form} onSubmit={onSubmit}>
            <InputContainer>
                <InputLabel htmlFor='email'>Email</InputLabel>
                <InputField type="email" id='email' name='email' value={info.email} required onChange={onChange} />
            </InputContainer>
            <InputContainer>
                <InputLabel htmlFor='name'>Name</InputLabel>
                <InputField type="text" id='name' name='name' value={info.name} required onChange={onChange} />
            </InputContainer>
            <InputContainer>
                <InputLabel htmlFor='password'>Password</InputLabel>
                <InputField type="password" id='password' name='password' value={info.password} required onChange={onChange} />
            </InputContainer>
            <Button type="submit" className={styles.button}>Create My Account</Button>
            <div className={styles.footerText}>
                <span>Already have an account? </span>
                <Link to="/login"><span>Login</span></Link>
            </div>
        </form>
    )
}

export default RegisterForm
