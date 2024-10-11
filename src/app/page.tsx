'use client';
import { Word } from './components';
import { useWords } from './hooks/useWords';
import styles from './page.module.css';

export default function Home() {
	const { words } = useWords();

	return (
		<div className={styles.container}>
			<h1 className={styles.title}>Palavras aprendidas</h1>
			<div
				style={{
					display: 'flex',
					gap: '1rem',
				}}
			>
				{words.map((word) => (
					<Word key={word.term} word={word.term} />
				))}
			</div>
		</div>
	);
}
