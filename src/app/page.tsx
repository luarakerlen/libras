'use client';
import { useState } from 'react';
import { Word } from './components';
import styles from './page.module.css';
import { useFilter } from './hooks/useFilter';
import { TODAS } from './constants';
import { AddWordForm, Header } from './sections';
import { Word as WordInterface } from './interfaces';
import { useWords } from './hooks';

export default function Home() {
	const [selectedCategory, setSelectedCategory] = useState<string>(TODAS);
	const [randomWord, setRandomWord] = useState<WordInterface | null>(null);
	const [isAddingWord, setIsAddingWord] = useState<boolean>(false);

	const { words, categories, addWord } = useWords();
	const { filteredWords } = useFilter({ selectedCategory, words });

	return (
		<div className={styles.container}>
			<Header
				filteredWords={filteredWords}
				categories={categories}
				selectedCategory={selectedCategory}
				setSelectedCategory={setSelectedCategory}
				setRandomWord={setRandomWord}
				setIsAddingWord={setIsAddingWord}
			/>

			{isAddingWord && (
				<AddWordForm
					words={words}
					categories={categories}
					addWord={addWord}
					setIsAddingWord={setIsAddingWord}
				/>
			)}

			{randomWord && (
				<div className={styles.randomWord}>
					<h2>Palavra sorteada:</h2>
					<Word word={randomWord.term} />
				</div>
			)}

			<h2>Palavras aprendidas ({filteredWords.length})</h2>
			<div className={styles.wordsContainer}>
				{filteredWords.map((word) => (
					<Word key={word.term} word={word.term} />
				))}
			</div>
		</div>
	);
}
