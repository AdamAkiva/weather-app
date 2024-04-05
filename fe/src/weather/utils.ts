import { HTTPError, WeatherAppError } from '@/utils';

/**********************************************************************************/

// Promise wrapper for the geoLocation callback style function
export async function getGeoLocation() {
  // On purpose, this checks if geolocation is supported on the device
  // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
  if (navigator.geolocation) {
    const position = await new Promise<GeolocationPosition>(
      (resolve, reject) => {
        navigator.geolocation.getCurrentPosition(resolve, reject, {
          enableHighAccuracy: true,
          timeout: 32_000
        });
      }
    );

    return {
      lat: position.coords.latitude,
      long: position.coords.longitude
    };
  }

  return await Promise.reject(
    new WeatherAppError('Geolocation is not supported on your device')
  );
}

/**********************************************************************************/

export async function weatherAPIErrorHandler(err: unknown): Promise<never> {
  if (!(err instanceof HTTPError)) {
    throw err;
  }

  const weatherApiError = (
    (await err.response.json()) as {
      error: {
        code: number;
        message: string;
      };
    }
  ).error;
  switch (weatherApiError.code) {
    case 1006:
      console.error('No location with the given parameter exists');
      break;
    case 2007:
      console.error('Too many API key requests this month');
      break;
    case 2008:
      console.error('API has been disabled');
      break;
    case 2009:
      console.error('API key does not have access to the requested resource');
      break;
    case 9999:
      console.error('Internal API error');
      break;
    default:
      console.error('Unexpected error');
      break;
  }

  throw new WeatherAppError('Unexpected error, please try again later');
}

export function geoLocationErrorHandler(err: unknown): never {
  if (!(err instanceof GeolocationPositionError)) {
    throw err;
  }

  let errMsg = '';
  switch (err.code) {
    case GeolocationPositionError.PERMISSION_DENIED:
      errMsg = 'You must enable geolocation for the application to work';
      console.error(errMsg);
      break;
    case GeolocationPositionError.POSITION_UNAVAILABLE:
      errMsg = 'Location information is unavailable, please try again later';
      console.error(errMsg);
      break;
    case GeolocationPositionError.TIMEOUT:
      errMsg = 'The request timed out, please try again later';
      console.error(errMsg);
      break;
    default:
      errMsg = 'Unexpected error, please try again later';
      console.error(errMsg);
      break;
  }

  throw new WeatherAppError(errMsg);
}
