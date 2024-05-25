
<div align="center">

![thingyan](https://imagedelivery.net/6bSk6wUa9UOwEesJAZQuoA/3428f0b9-c300-4d1b-de79-f0903221c000/public)


[![codecov](https://codecov.io/gh/phothinmg/thingyan/graph/badge.svg?token=hnukvMUKVl)](https://codecov.io/gh/phothinmg/thingyan) [![JSR Score](https://jsr.io/badges/@ptm/thingyan/score)](https://jsr.io/@ptm/thingyan)

</div>

---

## About

**_The Myanmar new year festival (the water festival) is called the Thingyan._**

This package focus on calculate information of thingyan festival days and times , that can be use in morden javascript runtimes.The function named `thingyan` , that generate the following from a Myanmar(Burmese) year.

1. AkyaDayTime: string;
2. AkyatDay: string;
3. AkyatDay2: string;
4. AkyoDay: string;
5. AtatDayTime: string;
6. NewYearDay: string;
7. YearFrom: number;
8. YearTo: number;

Live Thingyan Calculator : https://phothinmg.github.io/thingyan/

API Docs : https://phothinmg.github.io/thingyan/api/

---


## Install and Usage

### Browser

Import function `thingyan ` from:

`esm.run` 

```html
<script type="module">
  import { thingyan } from "https://esm.run/thingyan";
  const my = 1386; // Myanmar Year
  console.log(thingyan(my));
</script>
```

`esm.sh` 

```html
<script type="module">
  import { thingyan } from "https://esm.sh/thingyan@0.1.0";
  const my = 1386; // Myanmar Year
  console.log(thingyan(my));
</script>
```




### Node ( npm registry )

```bash
npm i thingyan
```

```bash
yarn  add thingyan
```

```bash
pnpm i thingyan
```

```ts
import { type ThinGyan,  thingyan } from "thingyan";
const my: number = 1386; // Myanmar Year
const tg: ThinGyan = thingyan(my);

// Rest of code

```

### Node ( jsr registry )

_Before that read first [Using JSR with Node.js](https://jsr.io/docs/with/node)._

```bash
npx jsr add @ptm/thingyan
```

```bash
yarn dlx jsr add @ptm/thingyan
```

```bash
pnpm dlx jsr add @ptm/thingyan
```

```ts
import * as mod from "@ptm/thingyan";
//OR
import { thingyan } from "@ptm/thingyan";
import { type ThinGyan } from "@ptm/thingyan";

const my: number = 1386; // Myanmar Year
const tg: ThinGyan = thingyan(my);

// Rest of code
```

[API docs](https://jsr.io/@ptm/thingyan/doc) on jsr registry.

### Deno ( jsr registry)



_update deno to latest version to active `add`_

```bash
deno add @ptm/thingyan
```

That will automatically be add ` @ptm/thingyan` to `deno.json`.

```json
{
  "imports": {
    "@ptm/thingyan": "jsr:@ptm/thingyan@^0.1.0",
    "std/": "https://deno.land/std@0.224.0/"
  }
}
```

`index.ts`

```ts
import { type ThinGyan, thingyan } from "@ptm/thingyan";
const my = 1386; // Myanmar Year
const tg: ThinGyan = thingyan(my);
Deno.serve((_req: Request) => {
  const response = JSON.stringify(tg);

  return new Response(response, {
    status: 200,
    headers: new Headers({ "Content-Type": "application/json" }),
  });
});
```

```bash
deno run --allow-read --allow-net index.ts
```

- http://localhost:8000/

### Bun ( jsr registry)



```bash
bunx jsr add @ptm/thingyan
```

That will be add install scopes for JSR to `bunfig.toml`.



```toml
[install.scopes]
"@jsr" = "https://npm.jsr.io"

```
That will automatically be create `package.json` and add ` @ptm/thingyan`.



```json
{ "dependencies": { "@ptm/thingyan": "npm:@jsr/ptm__thingyan" } }
```

`http.ts`

```ts
import { type ThinGyan, thingyan } from "@ptm/thingyan";
const my = 1386; // Myanmar Year
const tg: ThinGyan = thingyan(my);

Bun.serve({
  port: 3000,
  fetch() {
    return new Response(JSON.stringify(tg, null, 2), {
      headers: {
        "Content-Type": "application/json",
      },
    });
  },
});
```

```bash
 bun --hot run http.ts
```

- http://localhost:3000/



### Cloudflare Workers ( npm registry )

```bash
yarn add thingyan
```

`worker.ts`

```ts
import { type ThinGyan, thingyan } from 'thingyan';
const my: number = 1386; // Myanmar Year
const tg: ThinGyan = thingyan(my);

export interface Env{

}

export default {
	async fetch(request: Request, env: Env, ctx: ExecutionContext): Promise<Response> {
		return new Response(JSON.stringify(tg, null, 2), {
			headers: {
				'Content-Type': 'application/json',
			},
		});
	},
};

```

---

## Acknowledgement

The algorithm and calculations of this package are base on [Modern Myanmar Calendrical Calculations](https://github.com/yan9a/mmcal/blob/master/javascript/ceMmDateTime.js) by [Yan Naing Aye](https://scholar.google.com/citations?hl=en&user=MOmTzIwAAAAJ).

---








