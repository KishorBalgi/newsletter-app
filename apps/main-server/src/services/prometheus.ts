import promClient from "prom-client";
import { metric_label_enum } from "../utils/prometheus.util";

class PrometheusServices {
  // Counter metric for counting the total number of HTTP requests
  static http_request_total = new promClient.Counter({
    name: "main_node_http_request_total",
    help: "The total number of HTTP requests received",
    labelNames: [
      metric_label_enum.METHOD,
      metric_label_enum.PATH,
      metric_label_enum.STATUS_CODE,
    ],
  });

  // Histogram metric for measuring the duration of HTTP requests
  static http_response_rate_histogram = new promClient.Histogram({
    name: "main_node_http_duration",
    labelNames: [
      metric_label_enum.METHOD,
      metric_label_enum.PATH,
      metric_label_enum.STATUS_CODE,
    ],
    help: "The duration of HTTP requests in seconds",
    buckets: [
      0.0, 0.05, 0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1.0, 1.1, 1.2,
      1.3, 1.4, 1.5, 1.6, 1.7, 1.8, 1.9, 2.0, 2.5, 3.0, 3.5, 4.0, 4.5, 5.0, 10,
    ],
  });

  // Gauge metric for measuring the memory usage of the Node.js process
  static nodejs_memory_usage = new promClient.Gauge({
    name: "nodejs_memory_usage_bytes",
    help: "The memory usage of the Node.js process",
  });

  // Gauge metric for measuring the CPU utilization of the Node.js process
  static nodejs_cpu_usage = new promClient.Gauge({
    name: "node_cpu_usage_percent",
    help: "CPU utilization of the Node.js process in percentage",
  });
}

export default PrometheusServices;
