import type { Submission } from '@/types/types'
import { computed, readonly, ref, type ComputedRef, type DeepReadonly, type Ref } from 'vue'

interface UseSubmissionsReturn {
  submissions: DeepReadonly<Ref<Submission[]>>
  submissionsSorted: ComputedRef<Submission[]>
  upvote: (id: number) => void
}

export function useSubmissions(): UseSubmissionsReturn {
  const submissions = ref<Submission[]>(structuredClone(window.Seed.submissions))

  const submissionsSorted = computed(() => [...submissions.value].sort((a, b) => b.votes - a.votes))

  const upvote = (id: number): void => {
    const submission = submissions.value.find((s) => s.id === id)
    if (submission) {
      submission.votes++
    }
  }

  return {
    submissions: readonly(submissions),
    submissionsSorted,
    upvote,
  }
}
