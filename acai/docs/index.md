# 🫐 Acai

**Auto-loading, self-validating, minimalist JavaScript library for Amazon Web Service Lambdas.**

## 🚀 Features
- Highly configurable API Gateway router powered by a unified glob resolver
- OpenAPI validation for events and responses across API Gateway, S3, SQS, and DynamoDB
- Extensible middleware hooks (`beforeAll`, `afterAll`, `withAuth`, endpoint `before`/`after`)
- DRY, declarative handler patterns that minimise boilerplate
- Seamless local development and testing experience
- Embraces the Happy Path Programming philosophy—validate first, then focus on business logic

## 💡 Happy Path Programming

Acai encourages **Happy Path Programming (HPP)**: design your flows so inputs are validated up front, letting business logic remain clean and optimistic while error handling is centralised. No more nested conditionals or repeated try/catch blocks—just the straight path to the outcome you expect.

> Need a fully typed experience? Explore the companion TypeScript package [**acai-ts**](https://www.npmjs.com/package/acai-ts).
