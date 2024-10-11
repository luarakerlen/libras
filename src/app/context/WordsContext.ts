import { createContext } from 'react';
import { Word } from '../interfaces';

interface WordsContextInterface {
	selectedCategory: string;
	setSelectedCategory: (category: string) => void;
	// filteredWords: Word[];
	// setFilteredWords: (words: Word[]) => void;
	// randomWord: Word | null;
	// setRandomWord: (word: Word | null) => void;
}

export const WordsContext = createContext<WordsContextInterface>(
	{} as WordsContextInterface
);
