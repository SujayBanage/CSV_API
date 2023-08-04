# Transactions CSV API

A REST API used for uploading csv file of transactions to store and query the data . We can perform CRUD operations on transactions data and query data according valid filters

## Tech Stack

**Server:** Node,Express,MongoDB

## Important Libraries and API's Used

- Mongoose ( MongoDB schema )
- Multer ( CSV file upload )
- csvtojson (Parsing CSV file)
- valibot (validation)
- [Exchange Rates API](https://app.exchangerate-api.com/)

## Features

- CSV file upload , parse and store
- CRUD operations on transactions data
- sort , limit and filter the data according to valid query params

## Environment Variables

To run this project, you will need to add the following environment variables to your config.env file

- `PORT`
- `MONGODB_URI_DEV`
- `MONGODB_URI_PROD`
- `EXCHANGE_API_KEY`
- `EXCHANGE_API_URL`

## Run Locally

Clone the project

```bash
  git clone https://github.com/SujayBanage/CSV_API.git
```

Go to the project directory

```bash
  cd server
```

Install dependencies

```bash
  npm install
```

Start the development server

```bash
  npm run dev
```

Start the production server

```bash
    npm run start
```

## Deployed API

[CSV_API](https://csv-api.onrender.com)

## Documentation

[Postman Documentation](https://documenter.getpostman.com/view/11942656/2s9XxyQYbo)
