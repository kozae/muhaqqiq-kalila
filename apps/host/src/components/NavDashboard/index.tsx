import { NavPanelContainer } from "nav-panel";
import PagesNav from "./PagesNav";

export default function NavDashboard() {
  return (
    <NavPanelContainer
      color="secondary"
      title="Navigation Shortcuts"
      def="Collations"
      tabs={{
        Collations: <h1>Collations </h1>,
        Pages: <PagesNav />,
        Media: <h1>Media </h1>,
        Books: <h1>Books </h1>,
      }}
    />
  );
}
