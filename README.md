# R - CHNWT

R - CHNWT is a URL shortener to reduce a long link.

## API

### Create a shortened URL

##### API request

`POST /url/create`

<details>
<summary>JSON</summary>

```json
{
  "fullURL": "[:fullURL]"
}
```

</details>

##### API response

<details>
<summary>JSON</summary>

```json
{
  "status": "success",
  "response": {
    "id": "[:id]",
    "shortURL": "[:webURL][:id]",
    "fullURL": "[:fullURL]"
  }
}
```

</details>

### Create a shortened URL with custom alias

##### API request

`POST /url/create`

<details>
<summary>JSON</summary>

```json
{
  "fullURL": "[:fullURL]",
  "customAlias": "[:customAlias]"
}
```

</details>

###### \*\* customPath only accept Alphabets, Numbers, Underscore, and Hyphen

##### API response

<details>
<summary>JSON</summary>

```json
{
  "status": "success",
  "response": {
    "id": "[:id]",
    "shortURL": "[:webURL][:id]",
    "fullURL": "[:fullURL]"
  }
}
```

</details>

### Shortened URL redirect

##### API request

`GET /url/[:id]`

##### API response

<details>
<summary>JSON</summary>

```json
{
  "status": "success",
  "response": {
    "fullURL": "[:fullURL]"
  }
}
```

</details>

---

## Environment variables

create .env file

```
# API
IP='' (Default: '0.0.0.0')
PORT=5555 (Default: 3000)
REQUEST_LIMIT=100 (Default: 1000)
TIME_WINDOW_LIMIT=30000 (Default: 60000) # milliseconds

# Firebase Config
FIREBASE_API_KEY='' (Required)
FIREBASE_APP_ID='' (Required)
FIREBASE_PROJECT_ID='' (Required)
FIREBASE_DATABASE_URL='' (Required)
FIREBASE_COLLECTION_NAME='' (Default: 'storage')

# Website URL
WEB_URL='' (Default: 'r.chnwt.dev')
```
