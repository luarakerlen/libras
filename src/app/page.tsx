'use client';
import { useState } from 'react';
import { Header, Word } from './components';
import styles from './page.module.css';
import { useFilter } from './hooks/useFilter';
import { TODAS } from './constants';

export default function Home() {
	const [selectedCategory, setSelectedCategory] = useState<string>(TODAS);
	const { filteredWords } = useFilter({ category: selectedCategory });

	return (
		<div className={styles.container}>
			<Header
				selectedCategory={selectedCategory}
				setSelectedCategory={setSelectedCategory}
			/>
			<div
				style={{
					display: 'flex',
					gap: '1rem',
				}}
			>
				{filteredWords.map((word) => (
					<Word key={word.term} word={word.term} />
				))}
			</div>
		</div>
	);
}
