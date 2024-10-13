import {
	Box,
	Button,
	Checkbox,
	Dialog,
	DialogContent,
	DialogTitle,
	FormControl,
	FormControlLabel,
	FormGroup,
	FormLabel,
	Input,
} from '@mui/material';
import { Word } from '../../interfaces';
import { capitalize, removeDuplication } from '../../utils';
import styles from './styles.module.css';
import { useState } from 'react';
import Swal from 'sweetalert2';
import '../../styles.css';

interface EditWordModalProps {
	word: Word;
	categories: string[];
	isOpen: boolean;
	onClose: () => void;
	editWordCategories: (word: Word, categories: string[]) => void;
}

export function EditWordModal({
	word,
	categories,
	isOpen,
	onClose,
	editWordCategories,
}: EditWordModalProps) {
	const wordCategories = word.categories;
	const availableCategories = categories.filter(
		(category) => !wordCategories.includes(category) && category !== 'todas'
	);

	const [selectedCategories, setSelectedCategories] =
		useState<string[]>(wordCategories);
	const [wroteCategories, setWroteCategories] = useState<string[]>([]);

	const handleUpdateCategories = (
		event: React.SyntheticEvent<Element, Event>
	) => {
		const target = event.target as HTMLInputElement;

		if (target.checked) {
			setSelectedCategories([...selectedCategories, target.name.toLowerCase()]);
		} else {
			setSelectedCategories(
				selectedCategories.filter(
					(category) => category.toLowerCase() !== target.name.toLowerCase()
				)
			);
		}
	};

	const getWroteCategories = (wroteCategories: string) => {
		if (!wroteCategories) {
			return;
		}

		const categories = wroteCategories
			.split(',')
			.map((category) => category.trim().toLowerCase());

		setWroteCategories(categories);
	};

	function updateWord() {
		const categories = [...selectedCategories, ...wroteCategories];
		const unrepeatedCategories = removeDuplication(categories);

		if (categories.length === 0) {
			Swal.fire({
				icon: 'error',
				title: 'Oops...',
				text: 'Selecione ou escreva pelo menos uma categoria',
				customClass: {
					container: 'swal2-container-error-update-word',
				},
			});
			return;
		}

		editWordCategories(word, unrepeatedCategories);
		onClose();
	}

	function handleClose() {
		setSelectedCategories(wordCategories);
		onClose();
	}

	return (
		<Dialog open={isOpen} onClose={handleClose} fullWidth>
			<DialogTitle>
				Editando a palavra{' '}
				<span
					style={{
						fontWeight: 'bold',
					}}
				>
					{capitalize(word.term)}
				</span>
			</DialogTitle>
			<DialogContent>
				<Box>
					<FormControl>
						<FormLabel htmlFor='categories'>
							Categorias já adicionadas
						</FormLabel>
						<FormGroup sx={{ flexDirection: 'row' }}>
							{wordCategories.map((category) => (
								<FormControlLabel
									key={category}
									name={category}
									control={<Checkbox defaultChecked />}
									label={capitalize(category)}
									onChange={(e) => handleUpdateCategories(e)}
								/>
							))}
						</FormGroup>
					</FormControl>
					<FormControl sx={{ mt: 2 }}>
						<FormLabel htmlFor='categories'>
							Outras categorias existentes
						</FormLabel>
						<FormGroup sx={{ flexDirection: 'row' }}>
							{availableCategories.map((category) => (
								<FormControlLabel
									key={category}
									name={category}
									control={<Checkbox />}
									label={capitalize(category)}
									onChange={(e) => handleUpdateCategories(e)}
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
						<Button
							sx={{ flex: 1 }}
							type='submit'
							variant='contained'
							onClick={updateWord}
						>
							Atualizar
						</Button>
						<Button sx={{ flex: 1 }} onClick={handleClose}>
							Cancelar
						</Button>
					</div>
				</Box>
			</DialogContent>
		</Dialog>
	);
}
