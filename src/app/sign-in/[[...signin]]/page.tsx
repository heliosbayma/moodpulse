import { SignIn } from '@clerk/nextjs'

const SignInPage = () => {
  return (
    <article className="flex h-screen flex-col items-center justify-center">
      <SignIn
        appearance={{
          elements: {
            formButtonPrimary:
              'bg-accent hover:bg-secondary text-sm text-text-primary normal-case',
          },
        }}
      />
    </article>
  )
}

export default SignInPage
