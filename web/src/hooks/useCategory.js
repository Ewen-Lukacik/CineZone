import { useQuery } from '@tanstack/react-query';
import { getCategories } from '../services/categoryService';

export function useCategories() {
    const { data: categories, isLoading } = useQuery({
        queryKey: ['categories'],
        queryFn: getCategories,
        staleTime: Infinity
    });

    return { categories, isLoading };
}