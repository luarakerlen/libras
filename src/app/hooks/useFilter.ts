import { useEffect, useState } from 'react';
import { Word } from '../interfaces';
import { useWords } from './useWords';
import { TODAS } from '../constants';

interface FilterProps {
	category: string;
}

export function useFilter({ category }: FilterProps) {
	const { availableWords, setAvailableWords } = useWords();
	const [filteredWords, setFilteredWords] = useState<Word[]>([]);

	useEffect(() => {
		if (category === TODAS) {
			setFilteredWords(availableWords);
		} else {
			const filtered = availableWords.filter((word) =>
				word.categories.includes(category.toLowerCase())
			);
			setFilteredWords(filtered);
		}
	}, [category, availableWords]);

	return { filteredWords };
}
