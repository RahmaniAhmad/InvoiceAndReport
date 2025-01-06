# Invoice Service & Email Service

This repository contains two services built with NestJS:

1. **Invoice Service**: Handles creating, retrieving, and managing invoices.
2. **Email Service**: Sends email using Mailgun API.

## Table of Contents

- [Setup Instructions](#setup-instructions)
- [How to Run the Services](#how-to-run-the-services)
- [Running Tests](#running-tests)
- [Environment Variables](#environment-variables)

## Setup Instructions

1. **Clone the Repository**

   ```bash
   git clone https://github.com/RahmaniAhmad/InvoiceAndReport.git

   ```

2. **Install Dependencies**

   cd InvoiceAndReport/email-service

   npm install

   cd InvoiceAndReport/invoice-service

   npm install

3. **Run the Services**

   InvoiceAndReport/email-service

   npm run start

   cd InvoiceAndReport/invoice-service

   npm run start

4. **Run the tests**

   InvoiceAndReport/email-service

   npm test

   npm run test:e2e

   cd InvoiceAndReport/invoice-service

   npm test

   npm run test:e2e

5. **Environment Variables**

   For Email Service (Mailgun):

   MAILGUN_API_KEY: Your Mailgun API key.

   MAILGUN_DOMAIN: Your Mailgun domain (e.g., yourdomain.com).
