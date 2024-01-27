import { Providers } from '@/providers/providers';

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="w-full flex flex-col sm:flex-row flex-grow overflow-hidden">
      <Providers>{children}</Providers>
    </div>
  );
}
