import { ListItemIcon, ListItemText, MenuItem, Menu } from '@mui/material';
import { Delete, Edit } from '@mui/icons-material';

interface WordMenuListProps {
	isOpen: boolean;
	onClose: () => void;
	handleDelete: () => void;
	anchorEl: HTMLElement | null;
	handleEdit: () => void;
}

export function WordMenuList({
	isOpen,
	onClose,
	handleDelete,
	anchorEl,
	handleEdit,
}: WordMenuListProps) {
	return (
		<Menu open={isOpen} onClose={onClose} anchorEl={anchorEl}>
			<MenuItem onClick={handleDelete}>
				<ListItemIcon>
					<Delete fontSize='small' />
				</ListItemIcon>
				<ListItemText>Excluir palavra</ListItemText>
			</MenuItem>
			<MenuItem onClick={handleEdit}>
				<ListItemIcon>
					<Edit fontSize='small' />
				</ListItemIcon>
				<ListItemText>Editar categorias</ListItemText>
			</MenuItem>
		</Menu>
	);
}
