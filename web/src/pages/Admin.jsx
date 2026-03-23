import { useState } from 'react';
import { useQueryClient } from '@tanstack/react-query';
import Navbar from '../components/Navbar';
import { useAuth } from '../context/AuthContext';
import { useToast } from '../context/ToastContext';
import { useMovies } from '../hooks/useMovies';
import { deleteMovie } from '../services/movieService';
import MovieForm from '../components/MovieForm';
import styles from './Admin.module.css';

export default function Admin() {
    const { token } = useAuth();
    const { addToast } = useToast();
    const { movies, isLoading } = useMovies();
    const queryClient = useQueryClient();

    const [showForm, setShowForm] = useState(false);
    const [editingMovie, setEditingMovie] = useState(null);

    async function handleDelete(id) {
        if (!window.confirm('Delete this movie ?')){
            return;
        } 
        try {
            await deleteMovie(token, id);
            queryClient.invalidateQueries(['movies']);
            addToast('Movie deleted successfully', 'success');
        } catch (err) {
            addToast('Failed to delete movie', 'error');
        }
    }

    function handleEdit(movie) {
        setEditingMovie(movie);
        setShowForm(true);
    }

    function handleClose() {
        setShowForm(false);
        setEditingMovie(null);
    }

    return (
        <>
            <Navbar />
            <div className={styles.page}>
                <div className={styles.header}>
                    <h1>Admin Panel</h1>
                    <button className={styles.addBtn} onClick={() => setShowForm(true)}>
                        + Add movie
                    </button>
                </div>

                {showForm && (
                    <MovieForm
                        movie={editingMovie}
                        onClose={handleClose}
                    />
                )}

                {isLoading ? <p>Loading...</p> : (
                    <table className={styles.table}>
                        <thead>
                            <tr>
                                <th>Title</th>
                                <th>Director</th>
                                <th>Year</th>
                                <th>Rating</th>
                                <th>Category</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {movies?.map(movie => (
                                <tr key={movie.id}>
                                    <td>{movie.title}</td>
                                    <td>{movie.director}</td>
                                    <td>{movie.release_year}</td>
                                    <td>{movie.rating}</td>
                                    <td>{movie.name}</td>
                                    <td className={styles.actions}>
                                        <button
                                            className={styles.editBtn}
                                            onClick={() => handleEdit(movie)}
                                        >
                                            Edit
                                        </button>
                                        <button
                                            className={styles.deleteBtn}
                                            onClick={() => handleDelete(movie.id)}
                                        >
                                            Delete
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                )}
            </div>
        </>
    );
}