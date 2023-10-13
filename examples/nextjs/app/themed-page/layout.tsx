import SubLayoutHeader from "../_components/sub-layout-header";

export default function ForcedThemeLayout({ children }): JSX.Element {
	return (
		<div>
			<SubLayoutHeader scope="forcedTheme" />
			{children}
		</div>
	);
}
