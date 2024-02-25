import type { PageNavigatorCardProps } from "./page-navigator-card";
import { PageNavigatorCard } from "./page-navigator-card";
import styles from "./cards.module.css";
import { StarMeCard } from "./star-me-card";
import { LinkCard } from "./link-card";

export function Cards({ LinkElement }: PageNavigatorCardProps) {
  return (
    <div className={styles.cards}>
      <PageNavigatorCard LinkElement={LinkElement} />
      <LinkCard href="https://react18-tools.github.io/react18-themes/" text="Explore the official docs." title="Docs" />
      <LinkCard
        href="https://github.com/react18-tools/react18-themes"
        text="Explore more examples on official GitHub Repo."
        title="More Examples"
      />
      <StarMeCard />
    </div>
  );
}
