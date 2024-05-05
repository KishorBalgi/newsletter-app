export const metric_label_enum = {
  METHOD: "method",
  PATH: "path",
  STATUS_CODE: "statusCode",
};

export class MetricLabelClass {
  method: string;
  path: string;
  status_code: number;

  constructor(method: string, pathname: string, statusCode: number) {
    this.method = method;
    this.path = pathname;
    this.status_code = statusCode;
  }
}
