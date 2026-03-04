import type { Metadata } from 'next';
import { Noto_Sans_KR, Bebas_Neue } from 'next/font/google';
import './globals.css';

const noto = Noto_Sans_KR({ weight: ['400', '700'], subsets: ['latin'] });
const bebas = Bebas_Neue({ weight: '400', subsets: ['latin'], variable: '--font-bebas' });

export const metadata: Metadata = {
  title: '사천성 - 그림 맞추기',
  description: '클래식 사천성 타일 매칭 게임',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ko" className={bebas.variable}>
      <body className={noto.className}>{children}</body>
    </html>
  );
}
