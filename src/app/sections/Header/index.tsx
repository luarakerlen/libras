import {
	Button,
	FormControl,
	InputLabel,
	MenuItem,
	Select,
} from '@mui/material';
import styles from './styles.module.css';
import { useWords } from '../../hooks';
import { capitalize } from '../../utils';
import { Word } from '../../interfaces';
import { useFilter } from '../../hooks/useFilter';

interface HeaderProps {
	selectedCategory: string;
	setSelectedCategory: (category: string) => void;
	setRandomWord: (word: Word | null) => void;
}

export function Header({
	selectedCategory,
	setSelectedCategory,
	setRandomWord,
}: HeaderProps) {
	const { categories } = useWords();
	const { filteredWords } = useFilter({ selectedCategory });

	function handleSelectCategory(category: string) {
		setSelectedCategory(category);
		setRandomWord(null);
	}

	function handleChooseRandomWord() {
		const randomIndex = Math.floor(Math.random() * filteredWords.length);
		setRandomWord(filteredWords[randomIndex]);
	}

	return (
		<div>
			<h1 className={styles.title}>Libras da Rena e Lua</h1>
			<div className={styles.container}>
				<div className={styles.filterContainer}>
					<p className={styles.text}>Filtrar por:</p>
					<FormControl sx={{ mt: 2, minWidth: 200 }} className={styles.filter}>
						<InputLabel htmlFor='category'>Categoria</InputLabel>
						<Select
							label='category'
							value={selectedCategory}
							onChange={(event) =>
								handleSelectCategory(event.target.value as string)
							}
						>
							{categories.map((category) => (
								<MenuItem key={category} value={capitalize(category)}>
									{capitalize(category)}
								</MenuItem>
							))}
						</Select>
					</FormControl>
				</div>
				<Button
					className={styles.button}
					variant='contained'
					onClick={handleChooseRandomWord}
				>
					Sortear palavra
				</Button>
				<Button className={styles.button} variant='outlined'>
					Adicionar palavra
				</Button>
			</div>
		</div>
	);
}
