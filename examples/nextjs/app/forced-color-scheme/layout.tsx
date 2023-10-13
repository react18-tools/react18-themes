import SubLayoutHeader from "../_components/sub-layout-header";

export default function ForcedColorSchemeLayout({ children }): JSX.Element {
	return (
		<div>
			<SubLayoutHeader scope="forcedColorScheme" />
			{children}
		</div>
	);
}
