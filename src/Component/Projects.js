import projectAnimation from './Animation - 1737107473256.json'; 
import sample from './sample.jpg'// Replace with your project's Lottie animation file
import sk from './skl.png' 
import church from './1.png'// Replace with your project's Lottie animation file


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
      link: sk, // Replace with your project link
      animation: projectAnimation,
    },
  {
    id: 3,
      title: 'Our Lady Of Guadalupe Parish', 
      description: 'This is another amazing project.',
      image: church, // Replace with your project image path
      link: 'https://ourladyofguadalupe.vercel.app/', // Replace with your project link
      animation: projectAnimation,
      

    }
  ];

  export default projects;