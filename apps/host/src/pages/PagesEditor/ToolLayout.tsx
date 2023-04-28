import { GRAPHQL_AUTH_MODE, GraphQLQuery } from "@aws-amplify/api";
import Loading from "@components/Loading";
import {
  InformationCircleIcon,
  RectangleGroupIcon,
  ListBulletIcon,
  DocumentTextIcon,
  SquaresPlusIcon,
  PhotoIcon,
} from "@heroicons/react/20/solid";
import { API } from "aws-amplify";
import { GetPageQuery, Page } from "aws-backend";
import { FacsimileSpace } from "pages-tool-facsimile";
import { PagesToolDataProvider } from "pages-tool-store";
import { useEffect } from "react";
import { Link, Outlet, useLocation, useParams } from "react-router-dom";
import useSWR from "swr";

export const getPage = /* GraphQL */ `
  query GetPage($id: ID!) {
    getPage(id: $id) {
      id
      number
      pagination
      foliation
      tags
      image
      commentary
      text {
        items {
          id
          order
          position
          region
          lines {
            items {
              id
              order
              region
              states
              tokens
            }
          }
        }
      }
      images {
        items {
          id
          unitID
          unit {
            id
            parentID
            title
            order
            frame
            variant
          }
          order
          position
          region
          location
          motifs
          style
          legend {
            id
            pageID
          }
        }
      }
    }
  }
`;

const tabs = [
  { name: "Info", href: "", icon: InformationCircleIcon },
  { name: "Layout", href: "layout", icon: RectangleGroupIcon },
  { name: "Lines", href: "lines", icon: ListBulletIcon },
  {
    name: "Transcription",
    href: "transcription",
    icon: DocumentTextIcon,
    current: false,
  },
  { name: "Segments", href: "segmentation", icon: SquaresPlusIcon },
  { name: "Images", href: "images", icon: PhotoIcon },
];

function classNames(...classes: any[]) {
  return classes.filter(Boolean).join(" ");
}

export function getTool(url: string): string | null {
  const regex = /([^/?]+)(?:\?.*)?$/;
  const match = url.match(regex);

  return match ? match[1] : null;
}

export default function PageToolLayout() {
  const { pageId, mediumId } = useParams() as {
    mediumId: string;
    pageId?: string;
  };
  let location = useLocation();
  const tool = getTool(location.pathname) ?? "";

  const { data, isLoading } = useSWR(
    pageId && `getPageData_${pageId}`,
    async () => {
      const response = await API.graphql<GraphQLQuery<GetPageQuery>>({
        query: getPage,
        variables: { id: pageId },
        authMode: GRAPHQL_AUTH_MODE.AMAZON_COGNITO_USER_POOLS,
      });
      return response.data?.getPage;
    }
  );

  if (!data) {
    return <Loading />;
  }

  return (
    <PagesToolDataProvider page={data as Page}>
      <div className="flex flex-col lg:flex-row">
        <div className="flex w-full justify-center lg:w-1/2">
          <FacsimileSpace
            navBarHeight={0}
            widthPercentage={40}
            margin={2}
            tool={tool}
            mode="view"
          />
        </div>
        <div className="ml-[80px] max-w-full lg:ml-0 lg:w-1/2">
          <div className="relative flex h-16 max-w-full items-center justify-center overflow-x-scroll rounded">
            <div className="w-content absolute">
              <div className="border-b border-gray-200">
                <nav
                  className="-mb-px flex justify-center space-x-8"
                  aria-label="Tabs"
                >
                  {tabs.map((tab) => (
                    <Link
                      key={tab.name}
                      to={`/pages/${mediumId}/${pageId}/${tab.href}`}
                      className={classNames(
                        tab.href === tool
                          ? "border-primary-500 text-primary-600"
                          : "border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700",
                        "group inline-flex items-center border-b-2 px-1 py-4 text-sm font-medium"
                      )}
                      aria-current={tab.current ? "page" : undefined}
                    >
                      <tab.icon
                        className={classNames(
                          tab.href === tool
                            ? "text-primary-500"
                            : "text-gray-400 group-hover:text-gray-500",
                          "-ml-0.5 mr-2 h-5 w-5"
                        )}
                        aria-hidden="true"
                      />
                      <span>{tab.name}</span>
                    </Link>
                  ))}
                </nav>
              </div>
            </div>
          </div>
          <div className="animate-fade-in w-full grow scale-90 rounded bg-white  opacity-0 ">
            <h1>Page Editing facsimile for tool {tool}</h1>
            <Outlet />
          </div>
        </div>
      </div>
    </PagesToolDataProvider>
  );
}
