import { useState } from 'react';
import { capitalize } from '../../utils';
import styles from './styles.module.css';
import { WordMenuList } from '../WordMenuList';
import Swal from 'sweetalert2';
import { Word } from '../../interfaces';

interface WordProps {
	word: Word;
	deleteWord: (id: string) => void;
}

export function WordCard({ word, deleteWord }: WordProps) {
	const [isMenuListOpen, setIsMenuListOpen] = useState<boolean>(false);
	const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);

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
				deleteWord(word.id);
				Swal.fire(
					'Excluído!',
					'A palavra foi excluída com sucesso.',
					'success'
				);
			}
		});
	}

	function handleClick(event: React.MouseEvent<HTMLDivElement>) {
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
					onDeleteWord={handleDeleteWord}
					anchorEl={anchorEl}
				/>
			)}
		</>
	);
}
