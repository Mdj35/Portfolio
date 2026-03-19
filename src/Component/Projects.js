import projectAnimation from './Animation - 1737107473256.json';
import sample from './sample.jpg'// Replace with your project's Lottie animation file
import church from './1.png'// Replace with your project's Lottie animation file
import alampat from './alampat.png'
import hcdc from "./hcdc.jpg";
import skonnect from "./skonnect.png";
import compass from "./compass.jpeg";
import accessionx from "./accessionx.jpg"


const projects = [
  {
    id: 1,
    title: 'Chic Station',
    category: 'IM',
    description: 'This is a cool project.',
    image: sample, // Replace with your project image path
    link: 'https://stationchic-reservation.vercel.app/', // Replace with your project link
    animation: projectAnimation,
  },
  {
    id: 2,
    title: 'SKonnect',
    category: 'Capstone',
    description: 'SKonnect bridges the gap between Sangguniang Kabataan leaders and the youth using advanced machine learning, real-time analytics, and interactive engagement tools.',
    image: skonnect,
    link: 'https://skonnect-project.vercel.app/', // Replace with your project link
    animation: projectAnimation,
  },
  {
    id: 3,
    title: 'Our Lady Of Guadalupe Parish',
    category: 'Freelance',
    description: 'This is another amazing project.',
    image: church, // Replace with your project image path
    link: 'https://ourladyofguadalupe.vercel.app/', // Replace with your project link
    animation: projectAnimation,
  },
  {
    id: 4,
    title: 'Alampat',
    category: 'Freelance',
    description: 'ALAMPAT is created to promote all kinds of arts created by our indigenous people and protect their rights as the owner of their creation.',
    image: alampat, // Replace with your project image path
    link: 'https://alampat.vercel.app/', // Replace with your project link
    animation: projectAnimation,
  },
  {
    id: 5,
    title: 'HCDC Website',
    category: 'Freelance',
    description: 'The Official Website of The HCDC',
    image: hcdc,
    link: 'https://www.hcdc.edu.ph/',
    animation: projectAnimation,
  },
  {
    id: 6,
    title: 'ComPASS',
    category: 'Other Projects',
    description: '',
    image: compass,
    link: 'https://blis-compass.vercel.app/',
    animation: projectAnimation,
  },
  {
    id: 7,
    title: 'AccessionX',
    category: 'Other Projects',
    description: '',
    image: accessionx,
    link: 'https://accession-x.vercel.app',
    animation: projectAnimation,
  }
];

export default projects; 