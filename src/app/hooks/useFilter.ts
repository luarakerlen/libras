import { useCallback, useEffect, useState } from 'react';
import { Word } from '../interfaces';
import { TODAS } from '../constants';

interface FilterProps {
	words: Word[];
	selectedCategory: string;
	searchedWord: string;
}

export function useFilter({
	words,
	selectedCategory,
	searchedWord,
}: FilterProps) {
	const [filteredWords, setFilteredWords] = useState<Word[]>([]);
	const [searchedWords, setSearchedWords] = useState<Word[]>([]);

	const searchWords = useCallback(
		(availableWords: Word[]) => {
			if (!!searchedWord) {
				const searched = availableWords.filter((word) =>
					word.term.toLowerCase().includes(searchedWord.toLowerCase())
				);
				setSearchedWords(searched);
			} else {
				setSearchedWords(availableWords);
			}
		},
		[searchedWord]
	);

	useEffect(() => {
		if (selectedCategory === TODAS) {
			setFilteredWords(words);
			searchWords(words);
		} else {
			const filtered = words.filter((word) =>
				word.categories.includes(selectedCategory.toLowerCase())
			);
			setFilteredWords(filtered);
			searchWords(filtered);
		}
	}, [selectedCategory, words, searchedWord]);

	return { filteredWords, searchedWords };
}
