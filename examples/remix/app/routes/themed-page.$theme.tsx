import type { LoaderFunctionArgs } from "@remix-run/node";
import { Link, useLoaderData } from "@remix-run/react";
import { ForceTheme } from "react18-themes";
import { ForcedPageLayout } from "shared-ui";

export async function loader({ params }: LoaderFunctionArgs) {
  return params.theme;
}

export default function PageWithForcedTheme(): JSX.Element {
  const theme = useLoaderData();
  return (
    <ForcedPageLayout LinkElement={Link} scope="forcedTheme">
      <ForceTheme theme={theme} />
      <p>Theme is forced to {theme}. Try changing theme or colorScheme and verify!</p>
    </ForcedPageLayout>
  );
}
