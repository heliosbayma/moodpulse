import Link from 'next/link'

const Home = () => {
  return (
    <main className="bg-background-primary flex h-screen w-screen items-center justify-center text-white">
      <section>
        <h1 className="mb-4 text-6xl">MoodPulse</h1>
        <p className="mb-4 text-2xl text-white/60">Your daily mood partner</p>
        <Link href="/journal">
          <button className="bg-accent rounded-lg px-4 py-3 text-xl">
            Get started
          </button>
        </Link>
      </section>
    </main>
  )
}

export default Home
