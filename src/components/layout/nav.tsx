import { IWeb3Context, useWeb3Context } from "@/contexts/web-3-context";

const Nav = () => {
  const {
    state: { isAuthenticated },
  } = useWeb3Context() as IWeb3Context;

  return (
    <>
      <div className="md:flex flex-grow items-center flex">
        <nav className="md:ml-auto flex flex-wrap items-center text-base justify-center font-semibold pl-7">
          <a className="mr-6 hover:text-white" href="/">Home</a>
          <a className="mr-6 hover:text-white" href="/mint">Mint</a>
          { isAuthenticated && (
            <a className="mr-6 hover:text-white" href="/my-nfts">My NFTs</a>
          )}
        </nav>
      </div>
    </>
  );
}

export default Nav;