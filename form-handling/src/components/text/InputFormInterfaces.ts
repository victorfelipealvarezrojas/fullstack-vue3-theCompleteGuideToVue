export interface inputField {
  newItem: string
  email: string
  urgency: string
  termsAndConditions: boolean
}

export interface inputFieldErrors {
  newItem: string | undefined
  email: string | undefined
  urgency: string | undefined
  termsAndConditions: string | undefined
}
