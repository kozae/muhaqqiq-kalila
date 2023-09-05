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
import useImageAsDataUrl from "@lib/use-image-as-data-url";
import { API } from "aws-amplify";
import {
  GetMediumQuery,
  GetPageQuery,
  Line,
  Page,
  TextElement,
} from "kalila-graphql";
import { FacsimileSpace } from "pages-tool-facsimile";
import { FacsimileWorkerEvent } from "pages-tool-facsimile-worker";
import { ImageZoomModel } from "pages-tool-facsimile-zoom";
import {
  PagesToolDataProvider,
  FacsimileSpaceEventProvider,
  InterfaceControlsProvider,
  StateControls,
} from "pages-tool-store";
import { useEffect, useRef } from "react";
import { Link, Outlet, useLocation, useParams } from "react-router-dom";
import useSWR from "swr";
import { getMedium, getPage } from "./ToolLayout.queries";
import { PagesDexie, StordElement } from "pages-tool-store-worker";

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

  const dexeiDB = useRef(new PagesDexie());

  const { data: siglum } = useSWR(`getSiglum_${mediumId}`, async () => {
    const response = await API.graphql<GraphQLQuery<GetMediumQuery>>({
      query: getMedium,
      variables: { id: mediumId },
      authMode: GRAPHQL_AUTH_MODE.AMAZON_COGNITO_USER_POOLS,
    });
    return response.data?.getMedium?.siglum;
  });

  let location = useLocation();
  const tool = getTool(location.pathname) ?? "";

  const { data } = useSWR(pageId && `getPageData_${pageId}`, async () => {
    const response = await API.graphql<GraphQLQuery<GetPageQuery>>({
      query: getPage,
      variables: { id: pageId },
      authMode: GRAPHQL_AUTH_MODE.AMAZON_COGNITO_USER_POOLS,
    });

    return response.data?.getPage;
  });

  const { data: stored } = useSWR(data && `stored_${data.id}`, async () => {
    const info = await dexeiDB.current.info.get({ id: pageId }),
      text = await dexeiDB.current.text.get({ id: pageId }),
      images = await dexeiDB.current.images.get({ id: pageId }),
      lines = await dexeiDB.current.lines.get({ id: pageId }),
      segments = await dexeiDB.current.sgements.get({ id: pageId });

    const keepIfNew = (el: StordElement | undefined) => {
      if (el) {
        if (el.version > data!.version!) {
          return el.data;
        }
      }

      return undefined;
    };

    return {
      text: keepIfNew(text),
      images: keepIfNew(images),
      lines: keepIfNew(lines),
      segments: keepIfNew(segments),
      ...(keepIfNew(info) ?? {}),
    };
  });

  const imageDataUrl = useImageAsDataUrl(
    data?.image ? "pages/" + data?.image : undefined
  );

  const facsimileWorker = useRef(
    new Worker(
      new URL("pages-tool-facsimile-worker/worker.ts", import.meta.url)
    )
  );

  const transcriptionWorker = useRef(
    new Worker(
      new URL(
        "pages-tool-transcription-panel-worker/worker.ts",
        import.meta.url
      )
    )
  );

  const storeWorker = useRef(
    new Worker(new URL("pages-tool-store-worker/worker.ts", import.meta.url), {
      type: "module",
    })
  );

  useEffect(() => {
    if (window.Worker) {
      facsimileWorker.current.postMessage({
        type: FacsimileWorkerEvent.LOAD,
        payload: imageDataUrl,
      });
    }
  }, [facsimileWorker, imageDataUrl]);

  if (!data || !imageDataUrl) {
    return <Loading />;
  }

  const merge = (data: Page, stored: any) => {
    const firstMerge = {
      ...data,
      ...Object.fromEntries(
        Object.entries(stored ?? {}).filter(([_, value]) => value !== undefined)
      ),
    } as Page;

    if (stored.text) {
      const text: TextElement[] = [];
      if (stored.lines) {
        for (const el of stored.text) {
          const lines = stored.lines.filter((l: Line) => l.elementId === el.id);
          text.push({ ...el, lines });
        }
      } else {
        for (const el of data!.text!) {
          const storedEl = stored.text.find(
            (item: TextElement) => item.id === el!.id
          );
          text.push({ ...storedEl, lines: el?.lines });
        }
      }

      return { ...firstMerge, text } as Page;
    }

    return firstMerge;
  };

  return (
    <PagesToolDataProvider
      page={data as Page}
      storedPage={merge(data as Page, stored)}
      worker={storeWorker.current}
      imageDataUrl={imageDataUrl!}
      withStoredChanges={Object.values(stored ?? {}).some(
        (v) => v !== undefined
      )}
    >
      <InterfaceControlsProvider
        facsimileWorker={facsimileWorker.current}
        transcriptionWorker={transcriptionWorker.current}
      >
        <FacsimileSpaceEventProvider>
          <div className="flex flex-row">
            <div className="flex h-fit w-1/2 flex-col items-center">
              <div className="ml-[80px] mr-[80px] h-20 w-[calc(100%-160px)]">
                <StateControls siglum={siglum!} page={data.number} />
              </div>
              <div className="h-fit w-fit max-w-[calc(100%-80px)]">
                <FacsimileSpace
                  navBarHeight={80}
                  widthPercentage={40}
                  margin={2}
                  tool={tool}
                />
              </div>
            </div>
            <div className="ml-0 w-1/2">
              <div className="relative flex h-20 max-w-full items-center justify-center overflow-x-scroll rounded">
                <div className="absolute h-fit w-fit">
                  <div className="h-fit border-b border-gray-200">
                    <nav
                      className="-mb-px flex h-fit justify-center space-x-8"
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
                            "group inline-flex h-fit items-center border-b-2 px-1 py-4 text-sm font-medium"
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
              <div className="animate-fade-in w-full grow scale-90 rounded bg-white  opacity-0">
                <Outlet key={data.id} />
              </div>
            </div>
          </div>
          <ImageZoomModel />
        </FacsimileSpaceEventProvider>
      </InterfaceControlsProvider>
    </PagesToolDataProvider>
  );
}
