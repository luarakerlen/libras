import { useState } from 'react';
import { capitalize } from '../../utils';
import styles from './styles.module.css';
import { WordMenuList } from '../WordMenuList';
import Swal from 'sweetalert2';
import { Word } from '../../interfaces';
import { EditWordModal } from '../EditWordModal';

interface WordProps {
	word: Word;
	canBeDeleted?: boolean;
	deleteWord?: (id: string) => void;
	categories: string[];
	editWordCategories: (word: Word, categories: string[]) => void;
}

export function WordCard({
	word,
	deleteWord,
	canBeDeleted = true,
	categories,
	editWordCategories,
}: WordProps) {
	const [isMenuListOpen, setIsMenuListOpen] = useState<boolean>(false);
	const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
	const [isEditModalOpen, setIsEditModalOpen] = useState<boolean>(false);

	function handleDeleteWord() {
		setIsMenuListOpen(false);
		Swal.fire({
			title: 'Tem certeza?',
			text: `Você deseja excluir a palavra "${capitalize(word.term)}"?`,
			icon: 'warning',
			showCancelButton: true,
			confirmButtonText: 'Sim',
			cancelButtonText: 'Não',
		}).then((result) => {
			if (result.isConfirmed) {
				deleteWord!(word.id);
				Swal.fire(
					'Excluído!',
					'A palavra foi excluída com sucesso.',
					'success'
				);
			}
		});
	}

	function handleEditWord() {
		setIsMenuListOpen(false);
		setIsEditModalOpen(true);
	}

	function handleClick(event: React.MouseEvent<HTMLDivElement>) {
		if (!canBeDeleted) return;
		setAnchorEl(event.currentTarget);
		setIsMenuListOpen(true);
	}

	function handleClose() {
		setAnchorEl(null);
		setIsMenuListOpen(false);
	}

	return (
		<>
			<div className={styles.container} onClick={handleClick}>
				<p className={styles.word}>{capitalize(word.term)}</p>
			</div>
			{isMenuListOpen && (
				<WordMenuList
					isOpen={isMenuListOpen}
					onClose={handleClose}
					handleDelete={handleDeleteWord}
					anchorEl={anchorEl}
					handleEdit={handleEditWord}
				/>
			)}
			<EditWordModal
				word={word}
				categories={categories}
				editWordCategories={editWordCategories}
				isOpen={isEditModalOpen}
				onClose={() => setIsEditModalOpen(false)}
			/>
		</>
	);
}
