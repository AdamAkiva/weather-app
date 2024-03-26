import rainyImage from '@/assets/images/rainy.jpg';
import sunnyImage from '@/assets/images/sunny.jpg';
import windyImage from '@/assets/images/windy.jpg';

/**********************************************************************************/

export async function fetchWeather() {
  const { temperature } = await Promise.resolve({ temperature: '17.3' });

  const image = determineImageByTemperature(Number(temperature));

  return {
    temperature: 'Placeholder',
    image: image
  };
}

function determineImageByTemperature(temperature: number) {
  if (temperature <= 10.0) {
    return rainyImage;
  }
  if (temperature > 10 && temperature <= 20.0) {
    return windyImage;
  }

  return sunnyImage;
}
