import MyButton from "./button";
import { LandingPage } from "@repo/shared/dist/server";
import { Demo } from "@repo/shared";

export const metadata = {
  title: "React18 Themes",
};

/** next.js landing page */
export default function Page(): JSX.Element {
  return (
    <LandingPage title="Next.js Example">
      <Demo />
      <MyButton />
    </LandingPage>
  );
}
