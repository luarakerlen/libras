import { useEffect, useState } from 'react';
import { Word } from '../interfaces';
import {
	addDoc,
	collection,
	deleteDoc,
	doc,
	getDocs,
	updateDoc,
} from 'firebase/firestore';
import db from '../../../configuration';
import Swal from 'sweetalert2';
import { capitalize } from '../utils';

export function useWords() {
	const [words, setWords] = useState<Word[]>([]);
	const [categories, setCategories] = useState<string[]>(['todas']);
	const [isLoading, setIsLoading] = useState(true);

	async function addWord(newWord: Word) {
		await addDoc(collection(db, 'words'), {
			term: newWord.term,
			categories: newWord.categories,
		});
		setWords([newWord, ...words]);

		Swal.fire({
			icon: 'success',
			title: 'Palavra adicionada com sucesso!',
			showConfirmButton: false,
			timer: 2000,
		});
	}

	async function deleteWord(wordId: string) {
		await deleteDoc(doc(db, 'words', wordId));
		const updatedWords = words.filter((word) => word.id !== wordId);
		setWords(updatedWords);

		Swal.fire({
			icon: 'success',
			title: 'Palavra excluída com sucesso!',
			showConfirmButton: false,
			timer: 2000,
		});
	}

	async function editWordCategories(updatedWord: Word, categories: string[]) {
		await updateDoc(doc(db, 'words', updatedWord.id), {
			categories,
		});

		const updatedWords = words.map((word) => {
			if (word.id === updatedWord.id) {
				return {
					...word,
					categories,
				};
			}

			return word;
		});
		setWords(updatedWords);

		Swal.fire({
			icon: 'success',
			title: `Categorias da palavra ${capitalize(
				updatedWord.term
			)} atualizadas com sucesso!`,
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
		setIsLoading(true);
		const fetchWords = async () => {
			const querySnapshot = await getDocs(collection(db, 'words'));
			const wordsData: Word[] = querySnapshot.docs.map((doc) => {
				return {
					id: doc.id,
					...doc.data(),
				} as Word;
			});

			const orderedWords = wordsData.sort((a, b) =>
				a.term.localeCompare(b.term)
			);
			setWords(orderedWords);
			getCategories(orderedWords);

			if (!!wordsData) {
				setIsLoading(false);
			}
		};

		fetchWords();
	}, []);

	return {
		words,
		categories,
		addWord,
		isLoading,
		deleteWord,
		editWordCategories,
	};
}
