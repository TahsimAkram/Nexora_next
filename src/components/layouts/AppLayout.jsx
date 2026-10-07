import Navbar from "../navigation/Navbar";
import "./AppLayout.css";

export default function AppLayout({ children, onOpenContact }) {
  return (
    <div className="app-shell">
      <Navbar onOpenContact={onOpenContact} />

      <main className="app-main">{children}</main>
    </div>
  );
}
