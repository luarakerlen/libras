import {
	Button,
	Checkbox,
	FormControl,
	FormControlLabel,
	FormGroup,
	FormLabel,
	Input,
} from '@mui/material';
import { useWords } from '../../hooks';
import { capitalize } from '../../utils';
import styles from './styles.module.css';

export function AddWordForm() {
	const { categories } = useWords();
	const availableCategories = categories.filter(
		(category) => category !== 'todas'
	);
	return (
		<div>
			<FormControl sx={{ width: '100%' }}>
				<FormLabel htmlFor='word' required>
					Palavra
				</FormLabel>
				<Input id='word' />
			</FormControl>
			<FormControl sx={{ mt: 2 }}>
				<FormLabel htmlFor='categories'>Categorias</FormLabel>
				<FormGroup sx={{ flexDirection: 'row' }}>
					{availableCategories.map((category) => (
						<FormControlLabel
							key={category}
							control={<Checkbox />}
							label={capitalize(category)}
						/>
					))}
				</FormGroup>
			</FormControl>
			<FormControl sx={{ width: '100%', mt: 2 }}>
				<FormLabel htmlFor='otherCategories'>
					Outras categorias (separe por vírgulas)
				</FormLabel>
				<Input id='otherCategories' />
			</FormControl>

			<div className={styles.buttons}>
				<Button type='submit' variant='contained'>
					Adicionar
				</Button>
				<Button>Cancelar</Button>
			</div>
		</div>
	);
}
