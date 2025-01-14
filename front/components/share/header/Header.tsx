const Header = () => {
  return <header className="flex justify-between p-4 w-full">
    <div>
      <a
        className="flex items-center hover:underline hover:underline-offset-4"
        href="/"
        rel="noopener noreferrer"
      >
        Chats
      </a>
    </div>
    <div className="flex gap-4">
      <a
        className="flex items-center hover:underline hover:underline-offset-4"
        href="/incomes"
        rel="noopener noreferrer"
      >
        Incomes
      </a>
      <a
        className="flex items-center hover:underline hover:underline-offset-4"
        href="/outcomes"
        rel="noopener noreferrer"
      >
        Outcomes
      </a>
    </div>
  </header>
}

export default Header;