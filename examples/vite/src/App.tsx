import { SharedRootLayout } from "shared-ui";
import { Link, Outlet } from "react-router-dom";

function App() {
	return (
		<SharedRootLayout LinkElement={Link}>
			<Outlet />
		</SharedRootLayout>
	);
}

export default App;
