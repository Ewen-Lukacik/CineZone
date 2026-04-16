import styles from './Pagination.module.css';

export default function Pagination({ pagination, onPageChange }) {
    if (!pagination || pagination.totalPages <= 1) return null;

    const { page, totalPages } = pagination;

    const pages = [];

    if (page > 2){
        pages.push(1);
    } 
    if (page > 3){
        pages.push('...')
    } ;
    if (page > 1){
        pages.push(page - 1);
    } 

    pages.push(page);

    if (page < totalPages){
        pages.push(page + 1);
    } 
    if (page < totalPages - 2){
        pages.push('...');
    } 
    if (page < totalPages - 1){
        pages.push(totalPages);
    } 

    return (
        <div className={styles.pagination}>
            <button
                className={styles.btn}
                disabled={page === 1}
                onClick={() => onPageChange(page - 1)}
            >
                Previous
            </button>

            {pages.map((p, i) => (
                p === '...' ? (
                    <span key={`dots-${i}`} className={styles.dots}>...</span>
                ) : (
                    <button
                        key={p}
                        className={`${styles.btn} ${p === page ? styles.active : ''}`}
                        onClick={() => onPageChange(p)}
                    >
                        {p}
                    </button>
                )
            ))}

            <button
                className={styles.btn}
                disabled={page === totalPages}
                onClick={() => onPageChange(page + 1)}
            >
                Next
            </button>
        </div>
    );
}