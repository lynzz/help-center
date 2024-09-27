import { ofetch } from 'ofetch';

const strapiUrl = process.env.STRAPI_API_URL;
const strapiToken = process.env.STRAPI_API_TOKEN;

if (!strapiUrl || !strapiToken) {
  throw new Error('Strapi configuration is missing');
}

export const strapiApi = ofetch.create({
  baseURL: strapiUrl,
  headers: {
    Authorization: `Bearer ${strapiToken}`,
    'Content-Type': 'application/json'
  }
});

export async function fetchFromStrapi(endpoint: string, options = {}) {
  try {
    const response = await strapiApi(endpoint, options);
    return response.data;
  } catch (error) {
    console.error('Error fetching from Strapi:', error);
    throw error;
  }
}

export async function postToStrapi(endpoint: string, data: any) {
  try {
    const response = await strapiApi(endpoint, {
      method: 'POST',
      body: { data }
    });
    return response.data;
  } catch (error) {
    console.error('Error posting to Strapi:', error);
    throw error;
  }
}

export async function putToStrapi(endpoint: string, data: any) {
  try {
    const response = await strapiApi(endpoint, {
      method: 'PUT',
      body: { data }
    });
    return response.data;
  } catch (error) {
    console.error('Error updating in Strapi:', error);
    throw error;
  }
}

export async function deleteFromStrapi(endpoint: string) {
  try {
    const response = await strapiApi(endpoint, {
      method: 'DELETE'
    });
    return response.data;
  } catch (error) {
    console.error('Error deleting from Strapi:', error);
    throw error;
  }
}
