import { useQueryClient } from "@tanstack/react-query";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useAuth } from "../context/AuthContext";
import { useToast } from "../context/ToastContext";
import { useCategories } from "../hooks/useCategory";
import { createMovie, updateMovie } from "../services/movieService";
import styles from "./MovieForm.module.css";

export default function MovieForm({ movie, onClose }) {
  const { token } = useAuth();
  const { addToast } = useToast();
  const { categories } = useCategories();
  const queryClient = useQueryClient();
  const isEditing = !!movie;

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    if (movie) reset(movie);
  }, [movie, reset]);

  async function onSubmit(data) {
    try {
      if (isEditing) {
        await updateMovie(token, movie.id, data);
        addToast("Movie updated successfully", "success");
      } else {
        await createMovie(token, data);
        addToast("Movie created successfully", "success");
      }
      queryClient.invalidateQueries(["movies"]);
      onClose();
    } catch {
      addToast("An error occurred", "error");
    }
  }

  return (
    <div className={styles.overlay}>
      <div className={styles.modal}>
        <div className={styles.modalHeader}>
          <h2>{isEditing ? "Edit movie" : "Add movie"}</h2>
          <button className={styles.closeBtn} onClick={onClose}>
            ✕
          </button>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
          <div className={styles.field}>
            <label>Title</label>
            <input {...register("title", { required: "Title required" })} />
            {errors.title && (
              <span className={styles.error}>{errors.title.message}</span>
            )}
          </div>

          <div className={styles.field}>
            <label>Director</label>
            <input
              {...register("director", { required: "Director required" })}
            />
            {errors.director && (
              <span className={styles.error}>{errors.director.message}</span>
            )}
          </div>

          <div className={styles.row}>
            <div className={styles.field}>
              <label>Release year</label>
              <input
                type="number"
                {...register("release_year", {
                  required: "Year required",
                  min: { value: 1895, message: "Invalid year" },
                })}
              />
              {errors.release_year && (
                <span className={styles.error}>
                  {errors.release_year.message}
                </span>
              )}
            </div>

            <div className={styles.field}>
              <label>Rating</label>
              <input
                type="number"
                step="0.1"
                {...register("rating", {
                  required: "Rating required",
                  min: { value: 0, message: "Min 0" },
                  max: { value: 10, message: "Max 10" },
                })}
              />
              {errors.rating && (
                <span className={styles.error}>{errors.rating.message}</span>
              )}
            </div>
          </div>

          <div className={styles.field}>
            <label>Category</label>
            <select
              {...register("category_id", { required: "Category required" })}
            >
              <option value="">Select a category</option>
              {categories?.map((cat) => (
                <option key={cat.id} value={cat.id}>
                  {cat.name}
                </option>
              ))}
            </select>
            {errors.category_id && (
              <span className={styles.error}>{errors.category_id.message}</span>
            )}
          </div>

          <div className={styles.modalFooter}>
            <button
              type="button"
              onClick={onClose}
              className={styles.cancelBtn}
            >
              Cancel
            </button>
            <button type="submit" className={styles.submitBtn}>
              {isEditing ? "Update" : "Create"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
