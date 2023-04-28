import { useState, useEffect, ReactNode } from "react";
import { BehaviorSubject } from "rxjs";
import { useDebouncedValue } from "../../../lib/use-debounced-value";
import InfoAlert from "../../InfoAlert";
import Loading from "../../Loading";
import { ReactivePaginator } from "paginator";
import useSWR from "swr";
import { API, GRAPHQL_AUTH_MODE, GraphQLQuery } from "@aws-amplify/api";
import { GetBookQuery } from "aws-backend";
import { chain } from "lodash";
import MediumPagesFilter from "./MediumPagesFilter";
import { NavPanelContainer } from "nav-panel";

export const getBook = /* GraphQL */ `
  query GetBook($id: ID!) {
    getBook(id: $id) {
      media {
        items {
          id
          editor
          siglum
          format
          createdAt
          updatedAt
          bookMediaId
          chapterCollationMediaId
        }
      }
    }
  }
`;

export default function MediumPagesNavContainer({
  bookId,
  filter$,
}: {
  bookId: string;
  filter$: BehaviorSubject<string>;
}) {
  const filter = useDebouncedValue(filter$, 200);
  const [page, setPage] = useState(0);
  const { data: media, isLoading } = useSWR(
    `getBookMedia_${bookId}`,
    async () => {
      const response = await API.graphql<GraphQLQuery<GetBookQuery>>({
        query: getBook,
        variables: { id: bookId },
        authMode: GRAPHQL_AUTH_MODE.AMAZON_COGNITO_USER_POOLS,
      });
      return response.data?.getBook?.media?.items;
    }
  );

  useEffect(() => {
    setPage(0);
  }, [filter]);

  if (isLoading) {
    return <Loading />;
  }

  if (media && media.length === 0) {
    return (
      <>
        <InfoAlert message="no items available" />
      </>
    );
  }

  const filteredMedia = media?.filter((medium) => {
    if (!medium || !medium.siglum) {
      return false;
    }
    return medium.siglum.includes(filter);
  });

  const tabs = filteredMedia
    ? chain(filteredMedia)
        .orderBy("siglum")
        .slice(page * 5, page * 5 + 5)
        .reduce((acc, medium) => {
          if (medium) {
            acc[medium!.siglum] = (
              <MediumPagesFilter mediumId={medium.id} siglum={medium.siglum} />
            );
          }
          return acc;
        }, {} as Record<string, any>)
        .value()
    : {};

  return (
    <>
      <ReactivePaginator
        pages={filteredMedia ? Math.ceil(filteredMedia.length / 5) : 1}
        current={page}
        onChange={setPage}
      />
      <NavPanelContainer color="secondary" tabs={tabs} />
    </>
  );
}
