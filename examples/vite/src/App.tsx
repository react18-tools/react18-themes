import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import { ThemeSwitcher } from "react18-themes";
import { ForkMe } from "@mayank1513/fork-me/server";
import "./App.css";
import { StarMe } from "@mayank1513/fork-me";
import { ThemeController } from "shared-ui";

function App() {
	return (
		<>
			<ThemeSwitcher />
			<div>
				<a href="https://vitejs.dev" target="_blank">
					<img src={viteLogo} className="logo" alt="Vite logo" />
				</a>
				<a href="https://react.dev" target="_blank">
					<img src={reactLogo} className="logo react" alt="React logo" />
				</a>
			</div>
			<h1>React18 Themes</h1>
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
