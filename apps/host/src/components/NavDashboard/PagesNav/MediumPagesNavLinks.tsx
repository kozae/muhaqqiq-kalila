import {
  TableCellsIcon,
  RectangleGroupIcon,
  DocumentTextIcon,
  SquaresPlusIcon,
} from "@heroicons/react/20/solid";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { BehaviorSubject } from "rxjs";
import { useDebouncedValue } from "frontend-util";
import InfoAlert from "../../InfoAlert";
import Loading from "../../Loading";
import { ReactivePaginator } from "paginator";
import useSWR from "swr";
import { API, GRAPHQL_AUTH_MODE, GraphQLQuery } from "@aws-amplify/api";
import { GetMediumQuery } from "kalila-graphql";
import { chain } from "lodash";
import { NavPanelLink } from "nav-panel";

const getMedium = /* GraphQL */ `
  query GetMedium($id: ID!) {
    getMedium(id: $id) {
      pages(limit: 500) {
        items {
          id
          number
        }
      }
    }
  }
`;

export default function MediumPagesNavLinks({
  mediumId,
  filter$,
}: {
  mediumId: string;
  filter$: BehaviorSubject<string>;
}) {
  const filter = parseInt(useDebouncedValue(filter$, 200));
  const [page, setPage] = useState(0);
  const { data: pages, isLoading } = useSWR(
    `getMediumPages_${mediumId}`,
    async () => {
      const response = await API.graphql<GraphQLQuery<GetMediumQuery>>({
        query: getMedium,
        variables: { id: mediumId },
        authMode: GRAPHQL_AUTH_MODE.AMAZON_COGNITO_USER_POOLS,
      });
      return response.data?.getMedium?.pages?.items;
    }
  );

  useEffect(() => {
    setPage(0);
  }, [filter]);

  const filteredPages = pages
    ? chain(pages)
        .filter((p) => {
          if (isNaN(filter)) {
            return true;
          }
          if (!p) {
            return false;
          }
          return p.number >= filter;
        })
        .orderBy("number")

        .value()
    : [];

  const visiblePages = filteredPages
    ? filteredPages.slice(page * 5, page * 5 + 5)
    : [];

  if (isLoading) {
    return <Loading />;
  }

  if (filteredPages && filteredPages.length === 0) {
    return <InfoAlert message="no items available" />;
  }

  return (
    <>
      <ReactivePaginator
        pages={filteredPages ? Math.ceil(filteredPages.length / 5) : 1}
        current={page}
        onChange={setPage}
      />
      <ul
        role="list"
        className="animate__animated animate__fadeIn sm:grid-cols-auto mt-3 grid grid-cols-1 gap-5 sm:gap-6"
      >
        <NavPanelLink
          initials={<TableCellsIcon className="h-5 w-5" aria-hidden="true" />}
          bgColor="bg-secondary-900"
          key="summary-apge-link"
        >
          <Link to={`/pages/${mediumId}`}>Medium Page Summary</Link>
        </NavPanelLink>

        {visiblePages &&
          visiblePages.map((item: any) => (
            <PageLink
              baseHref={`/pages/${mediumId}/${item.id}/`}
              key={item.id}
              pageNumber={item.number}
              bgColor="bg-secondary-900"
            />
          ))}
      </ul>
    </>
  );
}

export function PageLink({
  bgColor,
  pageNumber,
  baseHref,
}: {
  bgColor: string;
  pageNumber: number;
  baseHref: string;
}) {
  return (
    <li className="col-span-1 flex rounded-md shadow-sm">
      <Link
        key={`pageHome${pageNumber}`}
        to={baseHref}
        className={`${bgColor} flex w-16 flex-shrink-0 items-center justify-center rounded-l-md text-lg font-medium text-white`}
      >
        {pageNumber}
      </Link>
      <span
        key={`tools${pageNumber}`}
        className="inline-flex rounded-md shadow-sm"
      >
        <Link
          key="layout"
          to={`${baseHref}layout`}
          className="relative inline-flex items-center gap-x-1.5 bg-white px-3 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-10"
        >
          <RectangleGroupIcon
            className="-ml-0.5 h-5 w-5 text-gray-400"
            aria-hidden="true"
          />
          layout
        </Link>
        <Link
          key="transcription"
          to={`${baseHref}transcription`}
          className="relative inline-flex items-center gap-x-1.5 bg-white px-3 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-10"
        >
          <DocumentTextIcon
            className="-ml-0.5 h-5 w-5 text-gray-400"
            aria-hidden="true"
          />
          transcription
        </Link>
        <Link
          key="segmentation"
          to={`${baseHref}segmentation`}
          className="relative inline-flex items-center gap-x-1.5 rounded-r-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-10"
        >
          <SquaresPlusIcon
            className="-ml-0.5 h-5 w-5 text-gray-400"
            aria-hidden="true"
          />
          segmentation
        </Link>
      </span>
    </li>
  );
}
