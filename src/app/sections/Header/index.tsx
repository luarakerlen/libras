import {
	Button,
	FormControl,
	InputLabel,
	MenuItem,
	Select,
} from '@mui/material';
import styles from './styles.module.css';
import { capitalize } from '../../utils';
import { Word } from '../../interfaces';

interface HeaderProps {
	filteredWords: Word[];
	categories: string[];
	selectedCategory: string;
	setSelectedCategory: (category: string) => void;
	setRandomWord: (word: Word | null) => void;
	setIsAddingWord: (isAddingWord: boolean) => void;
}

export function Header({
	filteredWords,
	categories,
	selectedCategory,
	setSelectedCategory,
	setRandomWord,
	setIsAddingWord,
}: HeaderProps) {
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
				<Button
					className={styles.button}
					variant='outlined'
					onClick={() => setIsAddingWord(true)}
				>
					Adicionar palavra
				</Button>
			</div>
		</div>
	);
}
