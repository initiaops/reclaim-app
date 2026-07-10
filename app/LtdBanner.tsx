import Link from 'next/link'

export default function LtdBanner() {
  return (
    <div className="w-full text-center py-2.5 px-4 text-sm font-semibold text-white" style={{ backgroundColor: '#D97706' }}>
      Early Access — $19 lifetime access · Limited spots ·{' '}
      <Link href="/pricing" className="underline underline-offset-2 font-black hover:opacity-80 transition-opacity">
        Claim yours →
      </Link>
    </div>
  )
}
