'use client';
import { useState } from 'react';
import { Word } from './components';
import styles from './page.module.css';
import { useFilter } from './hooks/useFilter';
import { TODAS } from './constants';
import { Header } from './sections';
import { Word as WordInterface } from './interfaces';

export default function Home() {
	const [selectedCategory, setSelectedCategory] = useState<string>(TODAS);
	const [randomWord, setRandomWord] = useState<WordInterface | null>(null);

	const { filteredWords } = useFilter({ selectedCategory });

	return (
		<div className={styles.container}>
			<Header
				selectedCategory={selectedCategory}
				setSelectedCategory={setSelectedCategory}
				setRandomWord={setRandomWord}
			/>

			{randomWord && (
				<div className={styles.randomWord}>
					<h2>Palavra sorteada:</h2>
					<Word word={randomWord.term} />
				</div>
			)}

			<h2>Palavras aprendidas</h2>
			<div className={styles.wordsContainer}>
				{filteredWords.map((word) => (
					<Word key={word.term} word={word.term} />
				))}
			</div>
		</div>
	);
}
