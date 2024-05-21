import type { Page } from "kalila-graphql";
import { AgGridReact } from "@ag-grid-community/react"; // React Data Grid Component
import "@ag-grid-community/styles/ag-grid.css";
import "@ag-grid-community/styles/ag-theme-quartz.css";
import { useCallback, useMemo, useRef } from "react";
import { type ColDef, ModuleRegistry } from "@ag-grid-community/core";
import { ClientSideRowModelModule } from "@ag-grid-community/client-side-row-model";

ModuleRegistry.registerModules([ClientSideRowModelModule]);

interface SummaryPanelProps {
  siglum: string;
  pages: Page[];
}

const SummaryPanel = ({ siglum, pages }: SummaryPanelProps) => {
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
                <span className="text-4xl font-bold">{params.value}</span>
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
  }, []);

  return (
    <div className="flex w-full grow flex-col">
      <div className="flex items-baseline justify-between">
        <h1 className="text-primary-500 p-4 text-2xl font-bold">
          Summary of {siglum} pages
        </h1>
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
              rowData={pages}
              columnDefs={columnDefs}
              defaultColDef={defaultColDef}
              rowSelection={"multiple"}
              rowHeight={rowHeight}
              autoSizeStrategy={{ type: "fitGridWidth" }}
              onSelectionChanged={onSelectionChanged}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default SummaryPanel;
