import React from 'react';
import { Modal } from './Modal';
import { TrashIcon } from '../icons';

interface ConfirmModalProps {
    isOpen: boolean;
    onClose: () => void;
    onConfirm: () => void;
    title: string;
    message: string;
    confirmText?: string;
    type?: 'danger' | 'warning';
}

export const ConfirmModal: React.FC<ConfirmModalProps> = ({
    isOpen,
    onClose,
    onConfirm,
    title,
    message,
    confirmText = 'Delete',
    type = 'danger'
}) => {
    const handleConfirm = () => {
        onConfirm();
        onClose();
    };

    return (
        <Modal isOpen={isOpen} onClose={onClose}>
            <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-6 max-w-md mx-auto">
                <div className="flex items-start gap-4 mb-4">
                    <div className={`p-3 rounded-lg ${type === 'danger' ? 'bg-red-500/10' : 'bg-yellow-500/10'}`}>
                        <TrashIcon />
                    </div>
                    <div className="flex-1">
                        <h3 className="text-lg font-semibold text-white mb-2">{title}</h3>
                        <p className="text-sm text-zinc-400">{message}</p>
                    </div>
                </div>
                <div className="flex justify-end gap-3 mt-6">
                    <button
                        onClick={onClose}
                        className="px-4 py-2 text-sm font-medium text-zinc-400 hover:text-white bg-zinc-800 hover:bg-zinc-700 rounded-lg transition-colors"
                    >
                        Cancel
                    </button>
                    <button
                        onClick={handleConfirm}
                        className={`px-4 py-2 text-sm font-medium text-white rounded-lg transition-colors ${
                            type === 'danger'
                                ? 'bg-red-600 hover:bg-red-500'
                                : 'bg-yellow-600 hover:bg-yellow-500'
                        }`}
                    >
                        {confirmText}
                    </button>
                </div>
            </div>
        </Modal>
    );
};
