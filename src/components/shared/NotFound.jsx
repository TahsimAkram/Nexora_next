import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <section style={{ padding: "8rem var(--page-gutter)" }}>
      <h1>Page not found</h1>
      <Link to="/">Return home</Link>
    </section>
  );
}
