import Head from 'next/head';
import { seoDefaultContent } from '@/utils/seo';

interface MetaProps {
  title?: string;
}

const Meta: React.FC<MetaProps> = ({ title }) => {
  const defaultTitle = seoDefaultContent.title;
  const fullTitle = title ? `${title} - ${defaultTitle}` : defaultTitle;

  return (
    <Head>
      <title>{fullTitle}</title>
      <meta name="description" content={seoDefaultContent.description} />
    </Head>
  );
};

export default Meta;