import { ReplicateError } from "./errors.js";
import ReplicateObject from "./ReplicateObject.js";

export const PredictionStatus = {
  STARTING: "starting",
  PROCESSING: "processing",
  CANCELED: "canceled",
  SUCCEEDED: "succeeded",
  FAILED: "failed",
};

export default class Prediction extends ReplicateObject {
  constructor({ id, ...rest }, client) {
    super(rest, client);

    if (id) {
      this.id = id;
    }

    if (!this.id) {
      throw new ReplicateError("id is required");
    }
  }

  actionForGet() {
    return `GET /v1/predictions/${this.id}`;
  }

  hasTerminalStatus() {
    return [
      PredictionStatus.CANCELED,
      PredictionStatus.SUCCEEDED,
      PredictionStatus.FAILED,
    ].includes(this.status);
  }
}