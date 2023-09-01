import { ForkMe } from "@mayank1513/fork-me/server";
import "./globals.css";
import { ThemeSwitcher } from "react18-themes";
import { ServerSideWrapper } from "react18-themes/server";

export default function RootLayout({ children }: { children: React.ReactNode }) {
	return (
		<ServerSideWrapper tag="html" lang="en">
			<body>
				<ThemeSwitcher />
				<div className="container">{children}</div>
				<footer>
					with 💖 by{" "}
					<a href="https://mayank-chaudhari.vercel.app" target="_blank" rel="noopener noreferrer">
						Mayank Chaudhari
					</a>
				</footer>
				<ForkMe
					gitHubUrl="https://github.com/mayank1513/react18-themes"
					bgColor="var(--text-color)"
					textColor="var(--bg-color)"
					noAutoFork
					text="Use this Template"
				/>
			</body>
		</ServerSideWrapper>
	);
}
