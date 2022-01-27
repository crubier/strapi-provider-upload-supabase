# Strapi Upload Provider for Supabase storage

- This provider is a fork of [shorwood's](https://github.com/shorwood) [strapi upload provider digitalocean](https://github.com/shorwood/strapi-provider-upload-do) for Digital Ocean spaces, but applied to [Supabase storage](https://supabase.io/)

## Parameters
- **apiUrl** : [Supabase API Url](https://supabase.io/docs/reference/javascript/initializing)
- **apiKey** : [Supabase API Key](https://supabase.io/docs/reference/javascript/initializing)
- **bucket** : [Supabase storage bucket](https://supabase.io/docs/guides/storage)
- **directory** : [Directory inside Supabase storage bucket](https://supabase.io/docs/guides/storage)
- **options** : [Supabase client additional options](https://supabase.io/docs/reference/javascript/initializing#with-additional-parameters)

## How to use

1. Install this package

```
npm i strapi-provider-upload-supabase
```

2. Depending on your Strapi version, create the following:
 - **Strapi v3**

    Create config in `./extensions/upload/config/settings.js` with content
    ```
    module.exports = {
      provider: "supabase",
      providerOptions: {
        apiUrl: process.env.SUPABASE_API_URL,
        apiKey: process.env.SUPABASE_API_KEY,
        bucket: process.env.SUPABASE_BUCKET,
        directory: process.env.SUPABASE_DIRECTORY,
        options: {}
      }
    }
    ```

- **Strapi v4**

    Create config in `../config/plugins.js` with content
    ```
    module.exports = ({ env }) => ({
        // ...
        upload: {
          config: {
            provider: "strapi-provider-upload-supabase",
            providerOptions: {
              apiUrl: process.env.SUPABASE_API_URL,
              apiKey: process.env.SUPABASE_API_KEY,
              bucket: process.env.SUPABASE_BUCKET,
              directory: process.env.SUPABASE_DIRECTORY,
              options: {}
            }
          },
        },
        // ...
      });
    ```

3. Create `.env` and add to them 

```
SUPABASE_API_URL="<Your Supabase url>"
SUPABASE_API_KEY="<Your Supabase api key>"
SUPABASE_BUCKET="strapi-uploads"
SUPABASE_DIRECTORY=""
```

with values obtained from this page:

> https://app.supabase.io/project/<your-project>/settings/api

Parameters `options`, `bucket` and `directory` are optional and you can omit it, they will take the values shown in the example above.

## Resources

- [MIT License](LICENSE.md)

## Links

- [Strapi website](http://strapi.io/)
- [Strapi community on Slack](http://slack.strapi.io)
- [Strapi news on Twitter](https://twitter.com/strapijs)
- [Strapi docs about upload](https://strapi.io/documentation/3.0.0-beta.x/plugins/upload.html#configuration)
- [Strapi Provider DO which inspired this plugin](https://github.com/shorwood/strapi-provider-upload-do)
