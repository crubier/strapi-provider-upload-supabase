# Strapi Upload Provider for Supabase storage

- This provider is a fork of [shorwood's](https://github.com/shorwood) [strapi upload provider digitalocean](https://github.com/shorwood/strapi-provider-upload-do) for Digital Ocean spaces, but applied to [Supabase storage](https://supabase.io/)

## Parameters

- **apiUrl** : [Supabase API Url](https://supabase.io/docs/reference/javascript/initializing)
- **apiKey** : [Supabase API Key](https://supabase.io/docs/reference/javascript/initializing)
- **bucket** : [Supabase storage bucket](https://supabase.io/docs/guides/storage)
- **directory** : [Directory inside Supabase storage bucket](https://supabase.io/docs/guides/storage)
- **options** : [Supabase client additional options](https://supabase.io/docs/reference/javascript/initializing#with-additional-parameters)

## How to use

### 1. Install this package

```bash
npm i strapi-provider-upload-supabase
```

or using yarn

```bash
yarn add strapi-provider-upload-supabase
```

### 2. Create config in `./extensions/upload/config/plugins.js` with the following content

```js
module.exports = ({ env }) => ({
  upload: {
    config: {
      provider: "supabase",
      providerOptions: {
        apiUrl: env("SUPABASE_API_URL"),
        apiKey: env("SUPABASE_API_KEY"),
        bucket: env("SUPABASE_BUCKET"),
        directory: env("SUPABASE_DIRECTORY"),
        options: {},
      },
    },
  },
});
```

### 3. Add the following to environment variables (`.env`)

```bash
SUPABASE_API_URL=<Your Supabase url>
SUPABASE_API_KEY=<Your Supabase api key>
SUPABASE_BUCKET=strapi-uploads
SUPABASE_DIRECTORY=my-directory
```

Find my [Supabase API URL and Key](https://supabase.com/docs/guides/api#api-url-and-keys)

Parameters `options`, `bucket` and `directory` are optional and you can omit them.

## Resources

- [MIT License](LICENSE.md)

## Links

- [Strapi website](http://strapi.io/)
- [Strapi community on Slack](http://slack.strapi.io)
- [Strapi news on Twitter](https://twitter.com/strapijs)
- [Strapi docs about upload](https://strapi.io/documentation/3.0.0-beta.x/plugins/upload.html#configuration)
- [Strapi Provider DO which inspired this plugin](https://github.com/shorwood/strapi-provider-upload-do)
