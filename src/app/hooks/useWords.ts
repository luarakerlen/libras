import { useEffect, useState } from 'react';
import { Word } from '../interfaces';
import { addDoc, collection, getDocs } from 'firebase/firestore';
import db from '../../../configuration';
import Swal from 'sweetalert2';

export function useWords() {
	const [words, setWords] = useState<Word[]>([]);
	const [categories, setCategories] = useState<string[]>(['todas']);

	async function addWord(newWord: Word) {
		await addDoc(collection(db, 'words'), newWord);
		setWords([newWord, ...words]);

		Swal.fire({
			icon: 'success',
			title: 'Palavra adicionada com sucesso!',
			showConfirmButton: false,
			timer: 2000,
		});
	}

	function getCategories(words: Word[]) {
		const availableCategories: string[] = [];

		words.forEach((word) => {
			word.categories.forEach((category) => {
				if (!availableCategories.includes(category)) {
					availableCategories.push(category);
				}
			});
		});

		setCategories([...categories, ...availableCategories]);
	}

	useEffect(() => {
		const fetchWords = async () => {
			const querySnapshot = await getDocs(collection(db, 'words'));
			const wordsData: Word[] = querySnapshot.docs.map(
				(doc) => doc.data() as Word
			);

			setWords(wordsData);
			getCategories(wordsData);
		};

		fetchWords();
	}, []);

	return { words, categories, addWord };
}
