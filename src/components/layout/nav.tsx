const Nav = () => {
  return (
    <>
      <div className="md:flex flex-grow items-center flex">
        <nav className="md:ml-auto flex flex-wrap items-center text-base justify-center font-semibold pl-7">
          <a className="mr-6 hover:text-white" href="/">Home</a>
        </nav>
      </div>
    </>
  );
}

export default Nav;