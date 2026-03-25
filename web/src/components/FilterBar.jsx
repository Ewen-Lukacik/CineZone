import { useCategories } from "../hooks/useCategory";
import styles from './FilterBar.module.css';

export default function FilterBar({ filters, onChange }){
    const { categories } = useCategories();

    function handleChange(key, value){
        onChange({...filters, [key]: value, page: 1});
    }

    return (
        <div className={styles.bar}>
            <input
                type="text"
                placeholder="Search a movie..."
                value={filters.search || ''}
                onChange={e => handleChange('search', e.target.value)}
                className={styles.search}
            />

            <select
                value={filters.category || ''}
                onChange={e => handleChange('category', e.target.value)}
                className={styles.select}
            >
                <option value="">All categories</option>
                {categories?.map(cat => (
                    <option key={cat.id} value={cat.name}>{cat.name}</option>
                ))}
            </select>

            <select
                value={filters.min_rating || ''}
                onChange={e => handleChange('min_rating', e.target.value)}
                className={styles.select}
            >
                <option value="">Min rating</option>
                {[6, 7, 8, 9].map(r => (
                    <option key={r} value={r}>{r}</option>
                ))}
            </select>

            <button
                className={styles.resetBtn}
                onClick={() => onChange({ page: 1 })}
            >
                Reset
            </button>
        </div>
    );
}