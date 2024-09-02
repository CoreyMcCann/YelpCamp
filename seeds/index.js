
const mongoose = require("mongoose");
const cities = require("./cities");
const {places, descriptors } = require("./seedHelpers");
const Campground = require("../models/campground");


mongoose.connect('mongodb://127.0.0.1:27017/yelp-camp');

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
    console.log("Database connected");
});

const sample = (array) => array[Math.floor(Math.random() * array.length)];

const seedDB = async () => {
    await Campground.deleteMany({});
    for (let i = 0; i < 300; i++) {
        const random1000 = Math.floor(Math.random() * 1000);
        const price = Math.floor(Math.random() * 20) + 10;
        const camp = new Campground({
            // YOUR USER ID
            author: "66cfef8f03ea6b1cd54caa28",
            location: `${cities[random1000].city}, ${cities[random1000].state}`,
            title: `${sample(descriptors)} ${sample(places)}`,
            description: "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Blanditiis maxime ex quo, error natus eaque labore beatae nesciunt asperiores adipisci necessitatibus amet vitae quis fugiat distinctio, magnam assumenda. Asperiores, odio.",
            price,
            geometry: { 
                type: 'Point',
                coordinates: [
                    cities[random1000].longitude,
                    cities[random1000].latitude
                ] 
            },
            images: [
                {
                    url: 'https://res.cloudinary.com/dc4wmoeia/image/upload/v1725204566/YelpCamp/cideuo6fn3syhbka4g1b.jpg',
                    filename: 'YelpCamp/cideuo6fn3syhbka4g1b'
                },
                {
                    url: 'https://res.cloudinary.com/dc4wmoeia/image/upload/v1725204566/YelpCamp/suolzwxlnpt6mpyhepww.jpg',
                    filename: 'YelpCamp/suolzwxlnpt6mpyhepww'
                }
            ]
        })
        await camp.save();
    }
}

seedDB().then(() => {
    mongoose.connection.close();
});