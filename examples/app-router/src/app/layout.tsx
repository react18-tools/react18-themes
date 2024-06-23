import "./styles.css";
import "react18-loaders/dist/index.css";
import { ThemeSwitcher } from "nextjs-themes";
import { Layout } from "@repo/shared/dist/server";
import { GlobalLoader, Header } from "@repo/shared";
import { Inter } from "next/font/google";
import Link from "next/link";
import { Cards, LandingPage } from "@repo/shared/dist/server";
import { PageNavigatorCard, ThemeController } from "@repo/shared";
import { ColorSwitch } from "nextjs-themes";

const inter = Inter({ subsets: ["latin"] });

/** Root layout. */
export default function RootLayout({ children }: { children: React.ReactNode }): JSX.Element {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeSwitcher />
        <Layout>
          <Header linkComponent={Link} />
          {children}
          <LandingPage title="Next.js Example">
            <ColorSwitch className="center" />
            <ThemeController />
            <Cards>
              <PageNavigatorCard LinkElement={Link} />{" "}
            </Cards>
          </LandingPage>
        </Layout>
        <GlobalLoader />
      </body>
    </html>
  );
}
