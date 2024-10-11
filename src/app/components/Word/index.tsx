import { capitalize } from '../../utils';
import styles from './styles.module.css';

interface WordProps {
	word: string;
}

export function Word({ word }: WordProps) {
	return (
		<div className={styles.container}>
			<p className={styles.word}>{capitalize(word)}</p>
		</div>
	);
}
