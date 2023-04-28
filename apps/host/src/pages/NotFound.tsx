import PageWrapper from "@layout/PageWrapper";
import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <PageWrapper>
      <h2>Nothing to see here!</h2>
      <p>
        <Link to="/">Go to the home page</Link>
      </p>
    </PageWrapper>
  );
}
