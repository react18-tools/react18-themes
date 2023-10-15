import { ThemeSwitcher } from "react18-themes";
import { ForkMe } from "@mayank1513/fork-me/server";
import "./App.css";
import { StarMe } from "@mayank1513/fork-me";
import { ThemeController, Logo } from "shared-ui";

function App() {
	return (
		<>
			<ThemeSwitcher />
			<h1>
				<Logo />
			</h1>
			<div className="card">
				<StarMe gitHubUrl="https://github.com/mayank1513/react18-themes" />
				<p>
					Edit <code>src/App.tsx</code> and save to test HMR
				</p>
			</div>
			<ThemeController />
			<ForkMe gitHubUrl="https://github.com/mayank1513/react18-themes" bgColor=" " />
		</>
	);
}

export default App;
