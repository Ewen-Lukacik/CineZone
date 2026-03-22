import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useToast } from '../context/ToastContext';
import { useMoviePoster } from '../hooks/useMoviePoster';
import { useRandomMovie } from '../hooks/useRandomMovie';
import { loginUser } from '../services/authService';
import styles from './Auth.module.css';

export default function Login() {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const { login } = useAuth();
    const navigate = useNavigate();
    const movie = useRandomMovie();
    const posterUrl = useMoviePoster(movie?.title, movie?.release_year);
    const { addToast } = useToast();

    async function onSubmit(data) {
        try {
            const { token } = await loginUser(data);
            const payload = JSON.parse(atob(token.split('.')[1]));
            login(token, payload);
            addToast('Logged in successfully !', 'success');
            navigate('/');
        } catch (err) {
            console.error(err);
            addToast('Invalid credentials', 'error');
        }
    }

    return (
        <div className={styles.page}>
            <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
                <h1>Login</h1>

                <div className={styles.field}>
                    <label>Email</label>
                    <input
                        type="email"
                        {...register('email', {
                            required: 'Email required',
                            pattern: {
                                value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                                message: 'Invalid email format'
                            }
                        })}
                    />
                    {errors.email && <span className={styles.error}>{errors.email.message}</span>}
                </div>

                <div className={styles.field}>
                    <label>Password</label>
                    <input
                        type="password"
                        {...register('password', {
                            required: 'Password required',
                        })}
                    />
                    {errors.password && <span className={styles.error}>{errors.password.message}</span>}
                </div>

                <button type="submit">Login</button>

                <p>No account ? <Link to="/register">Register</Link></p>
            </form>
            <div className={styles.poster}>
                {posterUrl && (
                    <>
                        <img src={posterUrl} alt={movie.title} />
                        <div className={styles.posterOverlay}>
                            <h2>{movie.title}</h2>
                            <p>{movie.release_year} — {movie.director}</p>
                        </div>
                    </>
                )}
            </div>
        </div>
    );
}