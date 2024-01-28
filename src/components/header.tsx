import Nav from './nav';

export default function Header() {
  return (
    <header className="text-white body-font">
      <div className="container mx-auto flex flex-wrap p-5 md:flex-row">
        <a className="flex title-font font-medium text-white mb-4 md:mb-0 pr-4" href="/">
          <span className="ml-3 text-3xl">MINT NFTs</span>
        </a>
        <Nav />
      </div>
    </header>
  );
}