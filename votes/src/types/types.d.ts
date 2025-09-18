export type Submission = {
  id: number
  title: string
  description: string
  url: string
  votes: number
  avatar: string
  submissionImage: string
}

declare global {
  interface Window {
    Seed: {
      submissions: Submission[]
    }
  }
}

return {}
