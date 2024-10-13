import {
	ListItemIcon,
	ListItemText,
	MenuItem,
	Menu,
	Paper,
} from '@mui/material';
import { Delete } from '@mui/icons-material';
import styles from './styles.module.css';

interface WordMenuListProps {
	isOpen: boolean;
	onClose: () => void;
	onDeleteWord: () => void;
	anchorEl: HTMLElement | null;
}

export function WordMenuList({
	isOpen,
	onClose,
	onDeleteWord,
	anchorEl,
}: WordMenuListProps) {
	return (
		<Menu open={isOpen} onClose={onClose} anchorEl={anchorEl}>
			<MenuItem onClick={onDeleteWord}>
				<ListItemIcon>
					<Delete fontSize='small' />
				</ListItemIcon>
				<ListItemText>Excluir</ListItemText>
			</MenuItem>
		</Menu>
	);
}
