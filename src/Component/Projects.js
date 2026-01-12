import projectAnimation from './Animation - 1737107473256.json'; 
import sample from './sample.jpg'// Replace with your project's Lottie animation file
import sk from './skl.png' 
import church from './1.png'// Replace with your project's Lottie animation file
import alampat from './alampat.png'
import { image } from 'framer-motion/client';
import hcdc from "./hcdc.jpg";


const projects = [
    {
      id: 1,
      title: 'Chic Station',
      description: 'This is a cool project.',
      image: sample, // Replace with your project image path
      link: 'https://stationchic-reservation.vercel.app/', // Replace with your project link
      animation: projectAnimation,
    },
    {
      id: 2,
      title: 'SKonnect',
      description: 'This is another amazing project.',
      image: sk, // Replace with your project image path
      link: 'https://drive.google.com/file/d/1n2NUQICAX0b7eG_kbCG-AMYWekw8uZW6/view?usp=sharing', // Replace with your project link
      animation: projectAnimation,
    },
  {
    id: 3,
      title: 'Our Lady Of Guadalupe Parish', 
      description: 'This is another amazing project.',
      image: church, // Replace with your project image path
      link: 'https://ourladyofguadalupe.vercel.app/', // Replace with your project link
      animation: projectAnimation,
      

    },
    {
      id: 4,
      title: 'Alampat',
      description: 'This is another amazing project.',
      image: alampat, // Replace with your project image path
      link: 'https://alampat.vercel.app/', // Replace with your project link
      animation: projectAnimation,
    },
    {
      id: 5,
      title: 'HCDC Website',
      description:'',
      image: hcdc,
      link:'https://www.hcdc.edu.ph/',
      animation:projectAnimation,
    }
  ];

  export default projects; 