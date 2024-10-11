import { FormControl, InputLabel, MenuItem, Select } from '@mui/material';
import styles from './styles.module.css';
import { useWords } from '../../hooks';
import { capitalize } from '../../utils';

interface HeaderProps {
	selectedCategory: string;
	setSelectedCategory: (category: string) => void;
}

export function Header({ selectedCategory, setSelectedCategory }: HeaderProps) {
	const { categories } = useWords();

	return (
		<div>
			<h1 className={styles.title}>Palavras aprendidas</h1>
			<div className={styles.filterContainer}>
				<p className={styles.text}>Filtrar por:</p>
				<FormControl sx={{ mt: 2, minWidth: 120 }}>
					<InputLabel htmlFor='category'>Categoria</InputLabel>
					<Select
						label='category'
						value={selectedCategory}
						onChange={(event) =>
							setSelectedCategory(event.target.value as string)
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
			{/* adicionar nova palavra */}
		</div>
	);
}
