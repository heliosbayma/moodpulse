import { SignUp } from '@clerk/nextjs'

const SignUpPage = () => {
  return (
    <article className="flex h-screen flex-col items-center justify-center">
      <SignUp
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

export default SignUpPage
