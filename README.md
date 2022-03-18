package for handling api requests

## Install

```
$ npm install @enter000/api
```

## Usage

provides get, post, put

```js
import API from '@enter000/api';

async function fetchData() {
  const response = await API.get(url, params, options);
  // do smth with response
}

fetchData();

//

function postData() {
  const response = await API.post(url, body, options, method = 'post[delete|put]');
  /// do smth with response
}

postData();
```

## API

### .get(url, params?, options?)

runs fetch request to specified url

#### params

Type: `object`\
Default: `{}`

```js
Api.get('http://example.com');
//=>fetch('http://example.com')

Api.get('http://example.com', { count: 1, multiple: [1, 2] })
//=>fetch('http://example.com?count=1&multiple[]=1&multiple[]=2')
```

nullable values are omitted



