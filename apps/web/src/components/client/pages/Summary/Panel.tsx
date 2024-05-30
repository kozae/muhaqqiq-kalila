import type { Page } from "kalila-graphql";
import { AgGridReact } from "@ag-grid-community/react"; // React Data Grid Component
import "@ag-grid-community/styles/ag-grid.css";
import "@ag-grid-community/styles/ag-theme-quartz.css";
import { useCallback, useMemo, useRef, useState } from "react";
import { type ColDef, ModuleRegistry } from "@ag-grid-community/core";
import { ClientSideRowModelModule } from "@ag-grid-community/client-side-row-model";
import EditTagsModal from "./EditTagsModal";
import { getMediumPages } from "./requests";

ModuleRegistry.registerModules([ClientSideRowModelModule]);

interface SummaryPanelProps {
  mediumId: string;
}

const SummaryPanel = ({ mediumId }: SummaryPanelProps) => {
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [range, setRange] = useState<{ startPage: number; endPage?: number }>({
    startPage: 0,
    endPage: 0,
  });
  const [gridData, setGridData] = useState<Page[]>([]);
  const [siglum, setSiglum] = useState<string>("");

  const [open, setOpen] = useState(false);

  const rowHeight = 300;

  const columnDefs = useMemo(
    () =>
      [
        {
          headerName: "Number",
          field: "number",
          cellRenderer: (params: any) => {
            return params.value ? (
              <div className="flex h-full w-full flex-col items-center justify-center">
                <a href={`/pages/${mediumId}/${params.data.id}`}>
                  <span className="text-4xl font-bold">{params.value}</span>
                </a>
              </div>
            ) : null;
          },
        },
        {
          headerName: "Image",
          field: "image",
          cellRenderer: (params: any) => {
            return params.value ? (
              <img
                src={`https://d5gomyglvpeib.cloudfront.net/srv/page/${params.value}`}
                style={{ height: rowHeight, width: "auto" }}
                alt="thumbnail"
              />
            ) : null;
          },
        },
        {
          headerName: "Foliation",
          field: "foliation",
          filter: "agTextColumnFilter",
        },
        {
          headerName: "Pagination",
          field: "pagination",
          filter: "agNumberColumnFilter",
        },
        {
          headerName: "Tags",
          field: "tags",
          filter: true,
          valueFormatter: (params: any) =>
            params.value ? params.value.join(", ") : "",
        },
      ] as ColDef[],
    [],
  );

  const defaultColDef = useMemo(
    () => ({
      flex: 1,
      minWidth: 100,
      sortable: false,
    }),
    [],
  );

  const gridRef = useRef<AgGridReact<Page>>(null);

  const getSelectedRange = (selectedNodes: any[]) => {
    if (selectedNodes.length === 0) return { minNumber: 0, maxNumber: 0 };

    const selectedNumbers = selectedNodes
      .map((node) => node.data.number)
      .sort((a, b) => a - b);
    const minNumber = selectedNumbers[0];
    const maxNumber = selectedNumbers[selectedNumbers.length - 1];

    return { minNumber, maxNumber };
  };

  const onSelectionChanged = useCallback(() => {
    const selectedNodes = gridRef.current!.api.getSelectedNodes();
    const { minNumber, maxNumber } = getSelectedRange(selectedNodes);
    setRange({ startPage: minNumber, endPage: maxNumber });

    gridRef.current!.api.forEachNode((node) => {
      if (
        node &&
        node.data &&
        node.data.number >= minNumber &&
        node.data.number <= maxNumber
      ) {
        node.setSelected(true);
      } else {
        node.setSelected(false);
      }
    });

    const updatedSelectedNodes = gridRef.current!.api.getSelectedNodes();
    const ids = updatedSelectedNodes.map((node) => node!.data!.id);
    setSelectedIds(ids);
  }, []);

  const onTagsUpdated = useCallback(
    (tags: string[]) => {
      setGridData((prev) =>
        prev.map((page) => {
          if (selectedIds.includes(page.id)) {
            return {
              ...page,
              tags,
            };
          }
          return page;
        }),
      );
    },
    [selectedIds],
  );

  const onGridReady = useCallback(async () => {
    const { pages, siglum } = await getMediumPages(mediumId);
    setGridData(pages);
    setSiglum(siglum ?? "");
  }, [mediumId]);

  return (
    <>
      <div className="flex w-full grow flex-col">
        <div className="flex items-baseline justify-between">
          <h1 className="text-primary-500 p-4 text-2xl font-bold">
            Summary of {siglum} pages
          </h1>
          <div className="p-4">
            <button
              type="button"
              disabled={selectedIds.length === 0}
              onClick={() => setOpen(true)}
              className={
                selectedIds.length === 0
                  ? "rounded-md bg-gray-300 px-4 py-2 text-gray-500"
                  : "inline-flex items-center gap-x-1.5 rounded-md bg-white px-2.5 py-1.5 text-lg font-semibold hover:bg-gray-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-200"
              }
            >
              Edit Tags
            </button>
          </div>
        </div>
        <div className="flex w-full grow flex-col">
          <div
            className="ag-theme-quartz"
            style={{ flex: "1 1 0px", width: "100%" }}
          >
            <div
              style={{
                width: "100%",
                height: "100%",
              }}
            >
              <AgGridReact
                ref={gridRef}
                rowData={gridData}
                columnDefs={columnDefs}
                defaultColDef={defaultColDef}
                rowSelection={"multiple"}
                rowHeight={rowHeight}
                autoSizeStrategy={{ type: "fitGridWidth" }}
                onSelectionChanged={onSelectionChanged}
                onGridReady={onGridReady}
              />
            </div>
          </div>
        </div>
      </div>

      <EditTagsModal
        key={selectedIds.join(",")}
        open={open}
        setOpen={setOpen}
        selectedIds={selectedIds}
        siglum={siglum}
        startPage={range.startPage}
        endPage={range.endPage}
        mediumId={mediumId}
        onTagsUpdated={onTagsUpdated}
      />
    </>
  );
};

export default SummaryPanel;
