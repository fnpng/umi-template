import dataCloud from '@/assets/data-cloud.jpg';
import dataCube from '@/assets/data-cube.jpg';
import dataCylinder from '@/assets/data-cylinder.jpg';
import { Carousel } from 'antd';

export default function Banner() {
  const imgs = [
    { label: 'data-cloud', value: dataCloud },
    { label: 'data-cube', value: dataCube },
    { label: 'data-cylinder', value: dataCylinder },
  ];
  return (
    <Carousel dotPosition="right" autoplay effect="fade" infinite>
      {imgs.map((item) => (
        <img
          key={item.label}
          src={item.value}
          className="object-cover h-screen w-screen"
        />
      ))}
    </Carousel>
  );
}
