import Nav from './nav';
import { seoDefaultContent } from '@/utils/seo';

const Header = () => {
  return (
    <header className="text-white body-font">
      <div className="container mx-auto flex flex-wrap p-5 md:flex-row">
        <a className="flex title-font font-medium text-white mb-4 md:mb-0 pr-4" href="/">
          <span className="ml-3 text-3xl">{seoDefaultContent.title}</span>
        </a>
        <Nav />
      </div>
    </header>
  );
}

export default Header;