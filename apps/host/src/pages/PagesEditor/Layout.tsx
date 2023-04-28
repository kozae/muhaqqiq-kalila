import GuestNav from "@layout/GuestNav";
import { Link, Outlet, useLocation, useParams } from "react-router-dom";
import UserControls from "@components/UserControls";
import useSession from "@lib/use-session";
import PageWrapper from "@layout/PageWrapper";
import BaseNav from "@layout/BaseNav";
import { GraphQLQuery, GRAPHQL_AUTH_MODE } from "@aws-amplify/api";
import { API } from "aws-amplify";
import { GetMediumQuery } from "aws-backend";
import useSWR from "swr";
import Loading from "@components/Loading";
import { ArrowLeftCircleIcon } from "@heroicons/react/20/solid";
import { LinkIcon } from "@heroicons/react/20/solid";
import { LinkPaginator } from "@components/LinkPaginator";
import { orderBy } from "lodash";
import { useMemo, useState } from "react";
import GoToModal from "./GoToModal";
import { getTool } from "./ToolLayout";

const getMedium = /* GraphQL */ `
  query GetMedium($id: ID!) {
    getMedium(id: $id) {
      editor
      siglum
      pages(limit: 500) {
        items {
          id
          number
        }
      }
    }
  }
`;

export default function Layout() {
  const { mediumId, pageId } = useParams() as {
    mediumId: string;
    pageId?: string;
  };
  let location = useLocation();
  const tool = getTool(location.pathname) ?? "";
  const [goToOpen, setGoToOpen] = useState(false);

  const session = useSession();

  const { data, isLoading } = useSWR(`getMediumPages_${mediumId}`, async () => {
    const response = await API.graphql<GraphQLQuery<GetMediumQuery>>({
      query: getMedium,
      variables: { id: mediumId },
      authMode: GRAPHQL_AUTH_MODE.AMAZON_COGNITO_USER_POOLS,
    });
    return {
      pages: orderBy(response.data?.getMedium?.pages?.items ?? [], "number"),
      medium: response.data?.getMedium?.siglum,
      editor: response.data?.getMedium?.editor,
    };
  });

  const { currentPage, currentPageIndex, ids } = useMemo(() => {
    const currentPageIndex = data?.pages?.findIndex((p) => p?.id === pageId);
    const currentPage =
      currentPageIndex !== undefined &&
      currentPageIndex !== -1 &&
      data?.pages &&
      data.pages[currentPageIndex];

    const ids = data?.pages?.map((p) => p!.id) ?? [];

    return { currentPageIndex, currentPage, ids };
  }, [data, pageId]);

  if (!data) {
    return <Loading />;
  }

  return (
    <>
      {/* <nav className="h-[65px] w-full">
        {session ? (
          <BaseNav>
            <div className="ml-5 flex flex-grow items-center justify-between">
              <h2 className="text-primary-900 text-md font-bold leading-7 sm:text-2xl">
                Editing {data.medium}
                {currentPage && ` (p.${currentPage.number})`}
              </h2>
              <Link
                to={`/pages/${mediumId}`}
                className="hover:bg-secondary-200 text-primary-500 focus-visible:outline-primary-600 ml-1 hidden items-center  gap-x-1.5 rounded-md px-2.5 py-1.5 text-sm font-semibold shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 sm:inline-flex"
              >
                <ArrowLeftCircleIcon
                  className="-ml-0.5 h-5 w-5"
                  aria-hidden="true"
                />
                Summary
              </Link>
              <button
                type="button"
                onClick={() => setGoToOpen(true)}
                className="hover:bg-secondary-200 text-primary-500 focus-visible:outline-primary-600 ml-1 hidden items-center  gap-x-1.5 rounded-md px-2.5 py-1.5 text-sm font-semibold shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 sm:inline-flex"
              >
                <LinkIcon className="-ml-0.5 h-5 w-5" aria-hidden="true" />
                Go to ...
              </button>
              {data.pages && (
                <LinkPaginator
                  pages={data.pages.length}
                  current={currentPageIndex}
                  baseHref={`/pages/${mediumId}/`}
                  hrefSuffix={tool}
                  ids={ids}
                />
              )}
            </div>

            <UserControls session={session} />
          </BaseNav>
        ) : (
          <GuestNav />
        )}
      </nav> */}
      <nav className="bg-secondary-50 fixed left-0 top-0 z-10 flex h-full w-[80px] flex-col items-center">
        <Link to="/">
          <img className="h-auto w-[70px] p-1" src="/logo_512.png" alt="" />
        </Link>
        <h2 className="text-primary-900 text-md p-1 text-center font-bold leading-7 sm:text-xl">
          {data.medium}
          {currentPage && ` (p.${currentPage.number})`}
        </h2>
        <Link
          to={`/pages/${mediumId}/`}
          className="hover:bg-secondary-200 text-primary-500 focus-visible:outline-primary-600 mt-1 hidden items-center  gap-x-1.5 rounded-md px-2.5 py-1.5 text-sm font-semibold shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 sm:inline-flex sm:flex-col"
        >
          <ArrowLeftCircleIcon className="-ml-0.5 h-5 w-5" aria-hidden="true" />
          Summary
        </Link>
        <button
          type="button"
          onClick={() => setGoToOpen(true)}
          className="hover:bg-secondary-200 text-primary-500 focus-visible:outline-primary-600 mt-1 hidden items-center  gap-x-1.5 rounded-md px-2.5 py-1.5 text-sm font-semibold shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 sm:inline-flex sm:flex-col"
        >
          <LinkIcon className="-ml-0.5 h-5 w-5" aria-hidden="true" />
          Go to ...
        </button>

        {data.pages && (
          <LinkPaginator
            pages={data.pages.length}
            current={currentPageIndex}
            baseHref={`/pages/${mediumId}/`}
            hrefSuffix={tool}
            ids={ids}
          />
        )}
      </nav>
      {data.pages && (
        <GoToModal
          open={goToOpen}
          setOpen={setGoToOpen}
          lastPage={data.pages.length}
          baseHref={`/pages/${mediumId}/`}
          ids={ids}
        />
      )}
      <main className="animate-fade-in w-full grow scale-90 rounded bg-white  opacity-0 ">
        <Outlet />
      </main>
    </>
  );
}
