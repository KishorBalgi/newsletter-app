import { Request, Response, NextFunction } from "express";
import PrometheusServices from "../services/prometheus";
import { memoryUsage } from "process";
import { cpus } from "os";

const calculate_cpu_usage = () => {
  const previousTotalTime = process.hrtime()[0];

  // Get current CPU usage data
  const cpusData = cpus();

  // Calculate cumulative CPU times
  const currentTotalTime = cpusData.reduce(
    (acc, cpu) => acc + Object.values(cpu.times).reduce((a, b) => a + b, 0),
    0
  );

  // Calculate CPU usage based on time elapsed and total CPU time
  const idleTime = currentTotalTime - previousTotalTime;
  const cpuUsage = 100 - (idleTime / currentTotalTime) * 100;

  // Store current total CPU time for the next calculation
  process.hrtime()[0] = currentTotalTime;

  return cpuUsage;
};

export const httpReqInterceptor = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  // Get's the Req URL object
  const req_url = new URL(req.url, `http://${req.headers.host}`);

  const endTimer = PrometheusServices.http_response_rate_histogram.startTimer();

  const used_memory_before = memoryUsage().rss;

  const cpu_usage_before = calculate_cpu_usage();

  const original_res_send_function = res.send;

  res.send = function (this: any, body: any): Response {
    // Labels for the http_request_total metric and http_response_rate_histogram metric
    const labels = {
      method: req.method,
      path: req_url.pathname,
      statusCode: res.statusCode,
    };
    // Increment the http_request_total metric
    PrometheusServices.http_request_total.inc(labels);

    // Calculate the duration of the HTTP request
    endTimer(labels);

    // Calculate memory usage
    const used_memory_after = memoryUsage().rss;

    PrometheusServices.nodejs_memory_usage.set(
      used_memory_after - used_memory_before
    );

    // Calculate CPU usage
    const cpu_usage_after = calculate_cpu_usage();

    PrometheusServices.nodejs_cpu_usage.set(
      Math.abs(cpu_usage_after - cpu_usage_before)
    );

    return original_res_send_function.call(this, body);
  };

  next();
};
