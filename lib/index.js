"use strict";

const { createClient } = require("@supabase/supabase-js");
const crypto = require("crypto");

const getKey = ({ directory, file }) => {
  return `${directory}/${file.name}-${file.hash}.${file.ext}`.replace(/^\//g, "")
}

module.exports = {
  provider: "supabase",
  name: "Supabase Storage",
  auth: {
    apiUrl: {
      label: "Supabase API Url (e.g. 'https://zokyprbhquvvrleedkkk.supabase.co')",
      type: "text"
    },
    apiKey: {
      label: "Supabase API Key (e.g. 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpBNWJ9.eyJyb2xlIjoiYW5vbiIsImlhdCI6NOYyNjk1NzgzOCwiZXhwIjoxOTQUNTMzODM4fQ.tfr1M8tg6-ynD-qXkODRXX-do1qWNwQQUt1zQp8sFIc')",
      type: "text"
    },
    bucket: {
      label: "Supabase storage bucket (e.g. 'my-bucket')",
      type: "text"
    },
    directory: {
      label: "Directory inside Supabase storage bucket (e.g. '')",
      type: "text"
    },
    options: {
      label: "Supabase client additional options",
      type: "object",
    }
  },
  init: config => {

    const apiUrl = config.apiUrl;
    const apiKey = config.apiKey;

    const bucket = config.bucket || "strapi-uploads";
    const directory = (config.directory || "").replace(/(^\/)|(\/$)/g, "");
    const options = config.options || undefined;

    const supabase = createClient(apiUrl, apiKey, options)

    return {
      upload: (file, customParams = {}) => new Promise((resolve, reject) => {
        //--- Compute the file key.
        file.hash = crypto.createHash('md5').update(file.hash).digest("hex");
        //--- Upload the file into storage
        supabase.storage
          .from(bucket)
          .upload(
            getKey({ directory, file }),
            file, // or Buffer.from(file.buffer, "binary"),
            { cacheControl: 'public, max-age=31536000, immutable', upsert: true, contentType: file.mime }
          )
          .then(({ data, error: error1 }) => {
            if (error1) return reject(error1);
            const { publicURL, error: error2 } = supabase.storage
              .from(bucket)
              .getPublicUrl('folder/avatar1.png')
            if (error2) return reject(error2);
            file.url = publicURL;
            resolve();
          })
      }),

      delete: (file, customParams = {}) => new Promise((resolve, reject) => {
        //--- Delete the file fromstorage the space
        supabase.storage
          .from(bucket)
          .remove([getKey({ directory, file })])
          .then(({ data, error }) => {
            if (error) return reject(error);
            resolve();
          });
      }
      )
    }
  }
}
