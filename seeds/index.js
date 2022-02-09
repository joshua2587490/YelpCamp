const mongoose = require('mongoose');
const Campground = require('../models/campground');
const cities = require('./cities')
const {places, descriptors} = require('./seedHelper');

mongoose.connect('mongodb://localhost:27017/yelp-camp', {
    useNewUrlParser: true, 
    useUnifiedTopology: true
});

const db = mongoose.connection;
db.on('error', console.log.bind(console,'connection error'))
db.once('open', () =>{
    console.log('Database connected')
});

const sample = (array) => array[Math.floor(Math.random() * array.length)];

const seedDB = async() =>{
    await Campground.deleteMany({});
    for(let i = 0; i < 300; i++){
        const random1000 = Math.floor(Math.random() * 100);
        const price = Math.floor(Math.random() * 1000);
        const camp = new Campground({
            //YOUR USER ID
            author:'61f89833aec719f216ae8359',
            location: `${cities[random1000].city}, ${cities[random1000].state}`,
            title:` ${sample(descriptors)} ${sample(places)}`,
            description:'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Delectus, inventore adipisci modi nostrum impedit, doloribus odit error suscipit molestiae accusantium corporis. Doloremque, odio! Enim, vero veniam odit repellat odio ab.',
            price,
            geometry:{
                type:"Point",
                coordinates: [
                    cities[random1000].longitude,
                    cities[random1000].latitude,
                    
                ]
            },
            images:[
                {
                  url: 'https://res.cloudinary.com/dqqhxjay0/image/upload/v1643773653/Yelpcamp/chq10hal9ipp050rscfp.avif',
                  filename: 'Yelpcamp/chq10hal9ipp050rscfp',
                },
                {
                  url: 'https://res.cloudinary.com/dqqhxjay0/image/upload/v1643773654/Yelpcamp/rotxenpjlzj3iiovfuwv.avif',
                  filename: 'Yelpcamp/rotxenpjlzj3iiovfuwv',
                }
              ]
              
        });
        await camp.save();
    }
}

seedDB().then(() =>{
    mongoose.connection.close();
})
