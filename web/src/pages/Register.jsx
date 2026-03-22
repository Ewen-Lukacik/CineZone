import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import { useToast } from '../context/ToastContext';
import { useMoviePoster } from '../hooks/useMoviePoster';
import { useRandomMovie } from '../hooks/useRandomMovie';
import { registerUser } from '../services/authService';
import styles from './Auth.module.css';

export default function Register() {
    const { register, handleSubmit, watch, formState: { errors } } = useForm();
    const navigate = useNavigate();
    const movie = useRandomMovie();
    const posterUrl = useMoviePoster(movie?.title, movie?.release_year);
    const { addToast } = useToast();


    async function onSubmit(data) {
        try {
            await registerUser(data);
            addToast('Account created successfully !', 'success');
            navigate('/login');
        } catch (err) {
            console.error(err);
            addToast('An error has occurred', 'error');
        }
    }

    return (
        <div className={styles.page}>
            <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
                <h1>Register</h1>

                <div className={styles.field}>
                    <label>Name</label>
                    <input
                        type="text"
                        {...register('name', {
                            required: 'Name required',
                            minLength: {
                                value: 2,
                                message: '2 characters minimum'
                            }
                        })}
                    />
                    {errors.name && <span className={styles.error}>{errors.name.message}</span>}
                </div>

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
                            minLength: {
                                value: 10,
                                message: '10 characters minimum'
                            },
                            pattern: {
                                value: /^(?=.*[A-Z])(?=.*[0-9])/,
                                message: 'Must contain at least one uppercase letter and one number'
                            }
                        })}
                    />
                    {errors.password && <span className={styles.error}>{errors.password.message}</span>}
                </div>

                <div className={styles.field}>
                    <label>Confirm password</label>
                    <input
                        type="password"
                        {...register('confirmPassword', {
                            required: 'Please confirm your password',
                            validate: value => value === watch('password') || 'Passwords do not match'
                        })}
                    />
                    {errors.confirmPassword && <span className={styles.error}>{errors.confirmPassword.message}</span>}
                </div>

                <button type="submit">Register</button>

                <p>Already have an account ? <Link to="/login">Login</Link></p>
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