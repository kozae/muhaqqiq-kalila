import { util } from "@aws-appsync/utils";

export function getTime() {
  return util.time.nowEpochSeconds();
}
