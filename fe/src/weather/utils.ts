import { HTTPError } from '@/utils';

/**********************************************************************************/

type WeatherAPIError = {
  error: {
    code: number;
    message: string;
  };
};

/**********************************************************************************/

// Promise wrapper for the geoLocation callback style function
export async function geoLocationWrapper() {
  // On purpose, this checks if geolocation is supported on the device
  // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
  if (navigator.geolocation) {
    const position = await new Promise<GeolocationPosition>(
      (resolve, reject) => {
        navigator.geolocation.getCurrentPosition(resolve, reject, {
          enableHighAccuracy: true,
          timeout: 2_000
        });
      }
    );

    return {
      lat: position.coords.latitude,
      long: position.coords.longitude
    };
  }

  return await Promise.reject(new Error('Geolocation is not supported'));
}

/**********************************************************************************/

export async function weatherAPIErrorHandler(err: unknown): Promise<never> {
  if (!(err instanceof HTTPError)) {
    throw err;
  }

  let errMsg = '';
  const weatherApiError = ((await err.response.json()) as WeatherAPIError)
    .error;
  switch (weatherApiError.code) {
    case 1006:
      errMsg = 'No location with the given parameter exists';
      break;
    case 2007:
      errMsg = 'Too many API key requests this month';
      break;
    case 2008:
      errMsg = 'API has been disabled';
      break;
    case 2009:
      errMsg = 'API key does not have access to the requested resource';
      break;
    case 9999:
      errMsg = 'Internal API error';
      break;
    default:
      errMsg = 'Unexpected error';
      break;
  }

  throw new Error(errMsg);
}

export function geoLocationErrorHandler(err: unknown): never {
  if (!(err instanceof GeolocationPositionError)) {
    throw err;
  }

  let errMsg = '';
  switch (err.code) {
    case GeolocationPositionError.PERMISSION_DENIED:
      errMsg = 'User denied the request for Geolocation';
      break;
    case GeolocationPositionError.POSITION_UNAVAILABLE:
      errMsg = 'Location information is unavailable';
      break;
    case GeolocationPositionError.TIMEOUT:
      errMsg = 'The request timed out';
      break;
    default:
      errMsg = 'Unexpected error';
      break;
  }

  throw new Error(errMsg);
}
