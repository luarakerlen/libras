import { useEffect, useState } from 'react';
import { TODAS } from '../constants';
import { Word } from '../interfaces';
import { WordsContext } from './WordsContext';
import { useWords } from '../hooks';

interface WordsProviderProps {
	children: React.ReactNode;
}

export function WordsProvider({ children }: WordsProviderProps) {
	const [selectedCategory, setSelectedCategory] = useState<string>(TODAS);
	const [filteredWords, setFilteredWords] = useState<Word[]>([]);
	const [randomWord, setRandomWord] = useState<Word | null>(null);

	return (
		<WordsContext.Provider
			value={{
				selectedCategory,
				setSelectedCategory,
				// filteredWords,
				// setFilteredWords,
				// randomWord,
				// setRandomWord,
			}}
		>
			{children}
		</WordsContext.Provider>
	);
}
