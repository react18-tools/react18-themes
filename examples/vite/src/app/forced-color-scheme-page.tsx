import React from "react";
import { ColorSchemeType } from "react18-themes";
import { Link, useParams } from "react-router-dom";
import { Header } from "@repo/shared";
import { ForceColorScheme } from "react18-themes/client/force-color-scheme";

export default function ForcedColorSchemePage() {
  const { colorScheme } = useParams();
  return (
    <>
      <Header linkComponent={Link} />
      <ForceColorScheme colorScheme={colorScheme as ColorSchemeType} />
      <p className="center">
        Color scheme is forced to {colorScheme} color scheme. Thus, default-{colorScheme}-theme is
        applied
      </p>
    </>
  );
}
