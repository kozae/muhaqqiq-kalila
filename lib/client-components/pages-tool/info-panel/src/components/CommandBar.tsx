import { CommandBarContainer } from "pages-tool-shared-ui";
import { SmallButton } from "common-components";
import { PencilSquareIcon } from "@heroicons/react/24/solid";
export default function CommandBar() {
  return (
    <CommandBarContainer>
      <SmallButton className="text-primary-900 ">
        <PencilSquareIcon className="-ml-0.5 h-5 w-5 " aria-hidden="true" />
        Edit
      </SmallButton>
    </CommandBarContainer>
  );
}
