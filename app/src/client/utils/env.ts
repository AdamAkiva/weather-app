type EnvironmentVariables = 'API_KEY' | 'API_URL';

/**********************************************************************************/

export function getEnvValue(name: EnvironmentVariables) {
  const envKey = `WEATHER_APP_${name}`;

  const envValue = (import.meta.env[envKey] as string | undefined) ?? '';
  if (!envValue) {
    console.error(`Environment value: ${envKey} does not exist`);
  }

  return envValue;
}

export function getRuntimeMode() {
  return import.meta.env.MODE;
}
