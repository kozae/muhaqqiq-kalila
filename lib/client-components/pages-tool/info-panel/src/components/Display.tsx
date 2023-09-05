import { PanelContainer } from "pages-tool-shared-ui";
import { usePageDataStore } from "pages-tool-store";
import { PaperClipIcon, PencilSquareIcon } from "@heroicons/react/20/solid";
import { SmallButton } from "common-components";
import { flatten } from "lodash";

export default function Display({ onEdit }: { onEdit: () => void }) {
  const store = usePageDataStore();
  const [info, imageDataUrl, summary] = store((state) => {
    const textElements = state.text.length;
    const images = state.images.length;
    const lines = state.lines.filter((l) => l?.region !== undefined).length;
    const transcripedLines = state.lines.filter((l) => l?.tokens !== undefined);
    const transcripedLinesCount = transcripedLines.length;
    const transcripedTokensCount = flatten(
      transcripedLines.map((l) => l!.tokens)
    ).length;

    const segments = state.segments.map(
      (s) => `(${s?.unit?.frame}.${s?.unit?.order}) ${s?.unit?.title}`
    ) as string[];
    return [
      state.page,
      state.imageDataUrl,
      {
        textElements,
        images,
        lines,
        transcripedLinesCount,
        transcripedTokensCount,
        segments,
      },
    ];
  });

  return (
    <PanelContainer panelHasCommandBar={false} classes="mt-2">
      <div className="flex justify-between">
        <Header
          title="Page Information"
          description="Manually entered information"
        />
        <SmallButton className="text-primary-900" onClick={onEdit}>
          <PencilSquareIcon className="-ml-0.5 h-5 w-5 " aria-hidden="true" />
          Edit
        </SmallButton>
      </div>

      <div className="mt-6 border-t border-gray-100">
        <dl className="divide-y divide-gray-100">
          <DetailListItem
            bgClass="bg-gray-50"
            title="Digital Number"
            value={`${info.number}`}
          />
          <DetailListItem
            title="Foliation"
            value={info.foliation ?? "[no data]"}
          />
          <DetailListItem
            bgClass="bg-gray-50"
            title="Pagination"
            value={info.pagination ? `${info.pagination}` : "[no data]"}
          />
          <DetailListItem
            title="Tags"
            value={info.tags ? info.tags.join(", ") : "[no data]"}
          />
          <DetailListItem
            bgClass="bg-gray-50"
            title="Commentary"
            value={info.commentary ? info.commentary.join(", ") : "[no data]"}
          />
          <ImageAttachment
            title="Image file"
            file={{ name: info.image!, dataUrl: imageDataUrl }}
          />
        </dl>
      </div>
      <Header
        title="Editorial Summary"
        description="Automatically aggregated information"
      />
      <div className="mt-6 border-t border-gray-100">
        <dl className="divide-y divide-gray-100">
          <DetailListItem
            bgClass="bg-gray-50"
            title="Layout"
            value={`${summary.textElements} text element(s), ${summary.images} image(s)`}
          />
          <DetailListItem
            title="Lines"
            value={`${summary.lines} lines defined`}
          />
          <DetailListItem
            bgClass="bg-gray-50"
            title="Transcription"
            value={`${summary.transcripedLinesCount} lines transcribed, total ${summary.transcripedTokensCount} words`}
          />
          <DetailListItem
            title="Segmentation"
            value={
              summary.segments.length === 0
                ? "[no segments assigned]"
                : `${
                    summary.segments.length
                  } segment(s): ${summary.segments.join(", ")}`
            }
          />
          {/* <AttachmentList
            bgClass="bg-gray-50"
            title="Exports"
            files={[
              { name: "Transcription as TXT" },
              { name: "Transcription as DOCX" },
              { name: "All Data as PDF" },
              { name: "Raw Data as JSON" },
            ]}
          /> */}
        </dl>
      </div>
    </PanelContainer>
  );
}

interface HeaderProps {
  title: string;
  description: string;
}

const Header: React.FC<HeaderProps> = ({ title, description }) => (
  <div className="px-4 sm:px-0">
    <h3 className="text-base font-semibold leading-7 text-gray-900">{title}</h3>
    <p className="mt-1 max-w-2xl text-sm leading-6 text-gray-500">
      {description}
    </p>
  </div>
);

interface DetailListItemProps {
  bgClass?: string;
  title: string;
  value: string;
}

const DetailListItem: React.FC<DetailListItemProps> = ({
  bgClass = "bg-white",
  title,
  value,
}) => (
  <div
    className={`${bgClass} px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-3`}
  >
    <dt className="text-sm font-medium leading-6 text-gray-900">{title}</dt>
    <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
      {value}
    </dd>
  </div>
);

interface AttachmentProps {
  name: string;
}

interface AttachmentListProps {
  title: string;
  files: AttachmentProps[];
  bgClass?: string;
}

const AttachmentList: React.FC<AttachmentListProps> = ({
  bgClass = "bg-white",
  title,
  files,
}) => (
  <div
    className={`${bgClass} px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-3`}
  >
    <dt className="text-sm font-medium leading-6 text-gray-900">{title}</dt>
    <dd className="mt-2 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
      <ul
        role="list"
        className="divide-y divide-gray-100 rounded-md border border-gray-200"
      >
        {files.map((file) => (
          <AttachmentItem key={file.name} name={file.name} />
        ))}
      </ul>
    </dd>
  </div>
);

const AttachmentItem: React.FC<AttachmentProps> = ({ name }) => (
  <li className="flex items-center justify-between py-4 pl-4 pr-5 text-sm leading-6">
    <div className="flex w-0 flex-1 items-center">
      <PaperClipIcon
        className="h-5 w-5 flex-shrink-0 text-gray-400"
        aria-hidden="true"
      />
      <div className="ml-4 flex min-w-0 flex-1 gap-2">
        <span className="truncate font-medium">{name}</span>
      </div>
    </div>
    <div className="ml-4 flex-shrink-0">
      <a
        href="#"
        className="text-primary-600 hover:primary-indigo-500 font-medium"
      >
        Download
      </a>
    </div>
  </li>
);

interface ImageAttachmentProps {
  title: string;
  file: {
    name: string;
    dataUrl: string;
  };
}

const ImageAttachment: React.FC<ImageAttachmentProps> = ({ title, file }) => {
  // Calculate file size from data URL
  const fileSizeInMB = calculateSizeFromDataURL(file.dataUrl);

  return (
    <div className="bg-white px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-3">
      <dt className="text-sm font-medium leading-6 text-gray-900">{title}</dt>
      <dd className="mt-2 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
        <div className="flex items-center justify-between py-4 pl-4 pr-5 text-sm leading-6">
          <div className="flex w-0 flex-1 items-center">
            <PaperClipIcon
              className="h-5 w-5 flex-shrink-0 text-gray-400"
              aria-hidden="true"
            />
            <div className="ml-4 flex min-w-0 flex-1 gap-2">
              <span className="truncate font-medium">{file.name}</span>
              <span className="flex-shrink-0 text-gray-400">
                {fileSizeInMB}mb
              </span>
            </div>
          </div>
          <div className="ml-4 flex-shrink-0">
            <a
              href={file.dataUrl}
              download={file.name}
              className="text-primary-900 hover:text-primary-500 font-medium"
            >
              Download
            </a>
          </div>
        </div>
      </dd>
    </div>
  );
};

function calculateSizeFromDataURL(dataUrl: string): string {
  const sizeInBytes = dataUrl.length * (3 / 4) - 2; // Base64 size calculation
  const sizeInMB = (sizeInBytes / 1024 ** 2).toFixed(2); // Convert bytes to MB and limit decimal places
  return sizeInMB;
}
