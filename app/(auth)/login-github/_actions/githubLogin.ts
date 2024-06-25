'use server'

import { signIn } from "@/auth"

export default async function githubLogin(formData: FormData) {
  await signIn('github')
}