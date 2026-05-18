# Sentinel Gateway

> A production style distributed API Gateway and observability platform built with Node.js, Redis, Docker, OpenTelemetry, Jaeger, Prometheus, and Grafana.

Sentinel Gateway demonstrates modern backend engineering concepts including distributed tracing, metrics pipelines, resilience patterns, Redis based caching, rate limiting, telemetry collection, and observability driven infrastructure.

---

## Overview

Traditional backend projects usually stop at CRUD APIs.

Sentinel Gateway focuses on what happens around production APIs:

* request orchestration
* distributed observability
* telemetry pipelines
* resilience engineering
* service abstraction
* infrastructure monitoring
* middleware architecture

The project simulates how modern backend systems are designed and monitored in production environments.

---

## Features

### API Gateway Architecture

* Centralized request routing
* Middleware driven request lifecycle
* Structured logging pipeline
* Health monitoring endpoints
* Service abstraction layer

### Observability Stack

* OpenTelemetry instrumentation
* Jaeger distributed tracing
* Prometheus metrics aggregation
* Grafana dashboards
* Real time request telemetry

### Resilience Engineering

* Redis based distributed rate limiting
* Redis response caching
* Axios retry logic with exponential backoff
* Circuit breaker pattern using Opossum
* Timeout handling for downstream services

### Infrastructure

* Dockerized multi service architecture
* OpenTelemetry Collector integration
* Prometheus scraping pipeline
* Containerized observability stack

---

## Architecture

```txt
                ┌─────────────────────┐
                │       Client        │
                └──────────┬──────────┘
                           │
                           ▼
                ┌─────────────────────┐
                │  Sentinel Gateway   │
                │  Node.js + Express  │
                └──────────┬──────────┘
                           │
        ┌──────────────────┼──────────────────┐
        │                  │                  │
        ▼                  ▼                  ▼
 ┌────────────┐    ┌───────────────┐   ┌─────────────┐
 │   Redis    │    │ OTEL Collector│   │ Downstream  │
 │ Cache/Rate │    │ Telemetry Hub │   │  Services   │
 │   Limiter  │    └──────┬────────┘   └─────────────┘
 └────────────┘           │
                           ▼
        ┌──────────────────┼──────────────────┐
        ▼                  ▼                  ▼
 ┌────────────┐    ┌────────────┐    ┌────────────┐
 │   Jaeger   │    │ Prometheus │    │  Grafana   │
 │  Tracing   │    │  Metrics   │    │ Dashboards │
 └────────────┘    └────────────┘    └────────────┘
```

---

## Tech Stack

| Category       | Technologies                               |
| -------------- | ------------------------------------------ |
| Backend        | Node.js, Express                           |
| Observability  | OpenTelemetry, Jaeger, Prometheus, Grafana |
| Infrastructure | Docker, Docker Compose                     |
| Caching        | Redis                                      |
| Resilience     | Axios Retry, Opossum Circuit Breaker       |
| Monitoring     | Prometheus Metrics                         |

---

## Project Structure

```txt
Sentinel Gateway/
│
├── gateway/
│   ├── src/
│   │   ├── config/
│   │   ├── middleware/
│   │   ├── routes/
│   │   ├── services/
│   │   ├── utils/
│   │   └── tracing.js
│   │
│   ├── Dockerfile
│   ├── package.json
│   └── .env
│
├── observability/
│   ├── otel/
│   └── prometheus/
│
├── docker-compose.yml
└── README.md
```

---

## Core Engineering Concepts

### Distributed Tracing

Every request is instrumented using OpenTelemetry and exported to Jaeger for end to end trace visualization.

### Metrics Pipeline

Prometheus continuously scrapes metrics from the gateway while Grafana visualizes:

* API traffic
* request counts
* latency metrics
* route level telemetry
* status code distributions

### Redis Rate Limiting

The gateway applies distributed IP based rate limiting using Redis.

### Response Caching

Frequently requested responses are cached in Redis to reduce downstream traffic.

### Circuit Breakers

Opossum circuit breakers prevent cascading failures when downstream services become unstable.

### Retry Logic

Axios retry middleware automatically retries transient failures using exponential backoff.

---

## Running The Project

### Clone Repository

```bash
git clone https://github.com/your-username/sentinel-gateway.git
cd sentinel-gateway
```

### Start Infrastructure

```bash
docker compose up --build
```

---

## Service Endpoints

| Service    | URL                                                            |
| ---------- | -------------------------------------------------------------- |
| Gateway    | [http://localhost:8000](http://localhost:8000)                 |
| Health     | [http://localhost:8000/health](http://localhost:8000/health)   |
| Metrics    | [http://localhost:8000/metrics](http://localhost:8000/metrics) |
| Jaeger UI  | [http://localhost:16686](http://localhost:16686)               |
| Prometheus | [http://localhost:9090](http://localhost:9090)                 |
| Grafana    | [http://localhost:3000](http://localhost:3000)                 |

---

## Example Capabilities

### Distributed Request Tracing

Visualize complete request lifecycles and spans in Jaeger.

### Real Time Metrics

Track live API traffic and telemetry in Prometheus and Grafana.

### Middleware Pipeline

The gateway demonstrates layered middleware orchestration for:

* security
* logging
* telemetry
* resilience
* metrics collection
* request monitoring

---

## Future Improvements

* JWT authentication
* API key validation
* Threat detection middleware
* Dynamic rate limiting
* Real downstream microservices
* Kubernetes deployment
* Service discovery
* Distributed configuration

---

## Why This Project Matters

Sentinel Gateway was built to demonstrate backend engineering beyond traditional CRUD applications.

The project focuses on:

* observability engineering
* distributed systems concepts
* production style infrastructure
* telemetry pipelines
* resilience patterns
* scalable backend architecture

This project reflects concepts commonly used in modern backend platforms and infrastructure systems.

---

## License

MIT
