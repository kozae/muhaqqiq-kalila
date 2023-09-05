import { BehaviorSubject } from "rxjs";
import Loading from "../../Loading";
import { ReactNode, useState } from "react";
import { API } from "aws-amplify";
import { GraphQLQuery, GRAPHQL_AUTH_MODE } from "@aws-amplify/api";
import { listBooks, ListBooksQuery } from "kalila-graphql";
import useSWR from "swr";
import BookMediaFilter from "./BookMediaFilter";
import InfoAlert from "@components/InfoAlert";
import { NavPanelContainer } from "nav-panel";
import { ReactivePaginator } from "paginator";
import { useDebouncedValue } from "frontend-util";

export default function BookPagesNavContainer({
  filter$,
}: {
  filter$: BehaviorSubject<string>;
}) {
  const [page, setPage] = useState(0);
  const filter = useDebouncedValue(filter$, 300);
  const { data: books, isLoading } = useSWR("listBooks", async () => {
    const response = await API.graphql<GraphQLQuery<ListBooksQuery>>({
      query: listBooks,
      authMode: GRAPHQL_AUTH_MODE.AMAZON_COGNITO_USER_POOLS,
    });
    return response.data?.listBooks;
  });

  if (isLoading) {
    return <Loading />;
  }

  if (books && books.length === 0) {
    return <InfoAlert message="no items available" />;
  }

  const tabs = books
    ? books
        .filter((b) => b && b.title && b.title?.includes(filter))
        .slice(page * 5, page * 5 + 5)
        .reduce((acc: Record<string, ReactNode>, book: any) => {
          acc[book.title] = (
            <BookMediaFilter bookId={book.id} title={book.title} />
          );
          return acc;
        }, {})
    : {};

  return (
    <>
      <ReactivePaginator
        pages={books ? Math.ceil(books.length / 5) : 1}
        current={page}
        onChange={setPage}
      />
      <NavPanelContainer color="secondary" tabs={tabs} />
    </>
  );
}
