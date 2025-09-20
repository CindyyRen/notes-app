// hooks/useFlashcards.ts
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import type { Flashcard, FlashcardInput } from '../src/types';
import {
  fetchCards,
  createFlashcard,
  editFlashcard,
  deleteFlashcard,
} from '../api/flashcards';

// ---- Hooks ----

// 获取 flashcards
export function useFlashcards() {
  return useQuery<Flashcard[], Error>({
    queryKey: ['cards'], // key 建议和 invalidateQueries 一致
    queryFn: fetchCards,
  });
}

// 创建 flashcard

export function useCreateFlashcard() {
  const queryClient = useQueryClient();

  return useMutation<Flashcard, Error, FlashcardInput>({
    mutationFn: createFlashcard,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['cards'] }),
  });
}

// 编辑
export function useEditFlashcard() {
  const queryClient = useQueryClient();
  return useMutation<Flashcard, Error, { id: number; data: FlashcardInput }>({
    mutationFn: ({ id, data }) => editFlashcard(id, data),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['cards'] }), // ✅ v5
  });
}

// 删除
export function useDeleteFlashcard() {
  const queryClient = useQueryClient();
  return useMutation<void, Error, number>({
    mutationFn: deleteFlashcard,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['cards'] }), // ✅ v5
  });
}
