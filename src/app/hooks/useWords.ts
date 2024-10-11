import { useEffect, useState } from 'react';
import { Word } from '../interfaces';
import { collection, getDocs } from 'firebase/firestore';
import db from '../../../configuration';

export function useWords() {
	const [words, setWords] = useState<Word[]>([]);

	useEffect(() => {
		const fetchWords = async () => {
			const querySnapshot = await getDocs(collection(db, 'words'));
			const wordsData: Word[] = querySnapshot.docs.map(
				(doc) => doc.data() as Word
			);

			setWords(wordsData);
		};

		fetchWords();
	}, []);

	return { words };
}
