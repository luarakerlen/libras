import {
	Button,
	Checkbox,
	FormControl,
	FormControlLabel,
	FormGroup,
	FormLabel,
	Input,
} from '@mui/material';
import { capitalize } from '../../utils';
import styles from './styles.module.css';
import { useState } from 'react';
import { Word } from '../../interfaces';
import Swal from 'sweetalert2';

interface AddWordFormProps {
	words: Word[];
	categories: string[];
	addWord: (word: Word) => void;
	setIsAddingWord: (isAddingWord: boolean) => void;
}

export function AddWordForm({
	words,
	categories,
	addWord,
	setIsAddingWord,
}: AddWordFormProps) {
	const [term, setTerm] = useState<string>('');
	const [wroteCategories, setWroteCategories] = useState<string[]>([]);
	const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
	const [newCategories, setNewCategories] = useState<string[]>([]);

	const availableCategories = categories.filter(
		(category) => category !== 'todas'
	);

	const handleAddCategories = (event: React.SyntheticEvent<Element, Event>) => {
		const target = event.target as HTMLInputElement;

		if (target.checked) {
			setSelectedCategories([...selectedCategories, target.name]);
		} else {
			setSelectedCategories(
				selectedCategories.filter((category) => category !== target.name)
			);
		}
	};

	const getWroteCategories = (wroteCategories: string) => {
		if (!wroteCategories) {
			return;
		}

		const categories = wroteCategories
			.split(',')
			.map((category) => category.trim());

		const unrepeatedCategories = categories.filter(
			(category) => !newCategories.includes(category)
		);

		setWroteCategories(unrepeatedCategories);
	};

	const handleAddWord = () => {
		const categories = [...selectedCategories, ...wroteCategories];
		const normalizedCategories = categories.map((category) =>
			category.toLowerCase()
		);

		setNewCategories(normalizedCategories);

		if (!term) {
			Swal.fire({
				icon: 'error',
				title: 'Oops...',
				text: 'Preencha o campo de palavra',
			});
			return;
		}
		if (categories.length === 0) {
			Swal.fire({
				icon: 'error',
				title: 'Oops...',
				text: 'Selecione ou escreva pelo menos uma categoria',
			});
			return;
		}
		if (words.find((word) => word.term.toLowerCase() === term.toLowerCase())) {
			Swal.fire({
				icon: 'error',
				title: 'Oops...',
				text: 'Essa palavra já foi adicionada!',
			});
			setIsAddingWord(false);
			return;
		}

		const newWord: Word = {
			term: term.toLowerCase(),
			categories: normalizedCategories,
		};

		addWord(newWord);
		setIsAddingWord(false);
	};

	return (
		<div>
			<FormControl sx={{ width: '100%' }}>
				<FormLabel htmlFor='word' required>
					Palavra
				</FormLabel>
				<Input
					id='word'
					value={term}
					onChange={(e) => setTerm(e.target.value)}
				/>
			</FormControl>
			<FormControl sx={{ mt: 2 }}>
				<FormLabel htmlFor='categories'>Categorias</FormLabel>
				<FormGroup sx={{ flexDirection: 'row' }}>
					{availableCategories.map((category) => (
						<FormControlLabel
							key={category}
							name={category}
							control={<Checkbox />}
							label={capitalize(category)}
							onChange={(e) => handleAddCategories(e)}
						/>
					))}
				</FormGroup>
			</FormControl>
			<FormControl sx={{ width: '100%', mt: 2 }}>
				<FormLabel htmlFor='otherCategories'>
					Outras categorias (separe por vírgulas)
				</FormLabel>
				<Input
					id='otherCategories'
					onChange={(e) => getWroteCategories(e.target.value)}
				/>
			</FormControl>

			<div className={styles.buttons}>
				<Button type='submit' variant='contained' onClick={handleAddWord}>
					Adicionar
				</Button>
				<Button onClick={() => setIsAddingWord(false)}>Cancelar</Button>
			</div>
		</div>
	);
}
