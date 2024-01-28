import { FaFacebookF } from "react-icons/fa6";
import { FaTwitter } from "react-icons/fa";
import { Icon } from '@chakra-ui/react';
import { seoDefaultContent } from '@/utils/seo';

export default function Footer() {
  return (
    <footer className="text-white body-font">
      <div className="container px-5 py-8 mx-auto flex items-center sm:flex-row flex-col">
        <a className="flex title-font font-medium items-center md:justify-start justify-center" href="/">
          <span className="ml-3 text-xl">{seoDefaultContent.title}</span>
        </a>
        <span className="inline-flex sm:ml-auto sm:mt-0 mt-4 justify-center sm:justify-start">
          <a href="https://facebook.com/">
            <Icon as={FaFacebookF} />
          </a>
          <a className="ml-3" href="https://twitter.com/">
            <Icon as={FaTwitter} />
          </a>
        </span>
      </div>
    </footer>
  );
}
