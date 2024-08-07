import Navbar from './NavBar';

export default function Header() {
  return (
    <header>
      <div className="container  m-auto bg-white flex flex-col justify-evenly">
        <h1 className="text-5xl text-center m-20">Header logo piceee</h1>
        <Navbar />
      </div>
    </header>
  );
}
