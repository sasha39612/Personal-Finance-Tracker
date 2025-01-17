import Link from "next/link";

const Header = () => {
  return <header className="flex justify-between p-4 w-full text-white  bg-indigo-700">
    <div>
      <Link
        className="flex items-center hover:underline hover:underline-offset-4"
        href="/"
        rel="noopener noreferrer"
      >
        Chats
      </Link>
    </div>
    <div className="flex gap-4">
      <Link
        className="flex items-center hover:underline hover:underline-offset-4"
        href="/incomes"
        rel="noopener noreferrer"
      >
        Incomes
      </Link>
      <Link
        className="flex items-center hover:underline hover:underline-offset-4"
        href="/outcomes"
        rel="noopener noreferrer"
      >
        Outcomes
      </Link>
    </div>
  </header>
}

export default Header;