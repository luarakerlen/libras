import { useEffect, useState } from 'react';
import { Word } from '../interfaces';
import { TODAS } from '../constants';

interface FilterProps {
	words: Word[];
	selectedCategory: string;
}

export function useFilter({ words, selectedCategory }: FilterProps) {
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
