import PageWrapper from "@layout/PageWrapper";
import BookUpload from "./BookUpload";

import {
  WithAuthenticatorProps,
  withAuthenticator,
} from "@aws-amplify/ui-react";
import "@aws-amplify/ui-react/styles.css";
import MediaUpload from "./MediaUpload";
import BookUnitUpload from "./BookUnitUpload";
import PagesUpload from "./PagesUpload";
import SegmentUpload from "./SegmentUpload";

function DataUpload({ signOut, user }: WithAuthenticatorProps) {
  return (
    <PageWrapper>
      <BookUpload />
      <MediaUpload />
      <BookUnitUpload />
      <PagesUpload />
      <SegmentUpload />
    </PageWrapper>
  );
}

export default withAuthenticator(DataUpload, { hideSignUp: true });
