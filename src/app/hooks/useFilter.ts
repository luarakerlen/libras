import { useEffect, useState } from 'react';
import { Word } from '../interfaces';
import { useWords } from './useWords';
import { TODAS } from '../constants';

interface FilterProps {
	selectedCategory: string;
}

export function useFilter({ selectedCategory }: FilterProps) {
	const { words } = useWords();
	const [filteredWords, setFilteredWords] = useState<Word[]>([]);

	useEffect(() => {
		if (selectedCategory === TODAS) {
			setFilteredWords(words);
		} else {
			const filtered = words.filter((word) =>
				word.categories.includes(selectedCategory.toLowerCase())
			);
			setFilteredWords(filtered);
		}
	}, [selectedCategory, words]);

	return { filteredWords };
}
