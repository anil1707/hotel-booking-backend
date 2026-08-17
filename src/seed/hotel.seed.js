import mongoose from "mongoose";

import Hotel from "../modules/hotels/hotel.model.js";
import Room from "../modules/rooms/room.model.js";
import "dotenv/config";

import { connectDatabase } from "../config/database.js";

const seedHotels = async () => {
  try {
    await connectDatabase();

    // Use the ID of your existing hotel owner.
    const ownerId = process.env.SEED_OWNER_ID;

    if (!ownerId) {
      throw new Error(
        "SEED_OWNER_ID is required"
      );
    }

    // Optional: remove existing seed data
    await Hotel.deleteMany({
      ownerId,
    });

    const hotels = [
      {
        ownerId,

        name: "Ocean Breeze Resort",

        description:
          "A relaxing beachside resort in North Goa with comfortable rooms, a swimming pool and modern amenities.",

        location: {
          address:
            "Near Anjuna Beach",
          city: "Goa",
          state: "Goa",
          country: "India",
          latitude: 15.5736,
          longitude: 73.7419,
        },

        images: [
          "https://images.unsplash.com/photo-1566073771259-6a8506099945",
          "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b",
        ],

        amenities: [
          "WiFi",
          "Pool",
          "Parking",
          "Restaurant",
          "Gym",
          "Air Conditioning",
        ],

        rating: 4.5,
        totalReviews: 128,
        status: "approved",
      },

      {
        ownerId,

        name: "Palm Grove Retreat",

        description:
          "A peaceful resort surrounded by palm trees, perfect for families and couples looking for a comfortable Goa stay.",

        location: {
          address:
            "Calangute Beach Road",
          city: "Goa",
          state: "Goa",
          country: "India",
          latitude: 15.5449,
          longitude: 73.7553,
        },

        images: [
          "https://images.unsplash.com/photo-1564501049412-61c2a3083791",
          "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb",
        ],

        amenities: [
          "WiFi",
          "Pool",
          "Parking",
          "Restaurant",
          "Breakfast",
        ],

        rating: 4.2,
        totalReviews: 94,
        status: "approved",
      },

      {
        ownerId,

        name: "Sunset Bay Hotel",

        description:
          "Modern hotel close to the beach featuring spacious rooms, great food and a beautiful sunset view.",

        location: {
          address:
            "Candolim Beach Road",
          city: "Goa",
          state: "Goa",
          country: "India",
          latitude: 15.518,
          longitude: 73.762,
        },

        images: [
          "https://images.unsplash.com/photo-1566665797739-1674de7a421a",
          "https://images.unsplash.com/photo-1551882547-ff40c63fe5fa",
        ],

        amenities: [
          "WiFi",
          "Pool",
          "Parking",
          "Restaurant",
          "Room Service",
        ],

        rating: 4.7,
        totalReviews: 215,
        status: "approved",
      },

      {
        ownerId,

        name: "Royal Palm Suites",

        description:
          "Premium hotel offering spacious suites, excellent service and modern facilities in the heart of Goa.",

        location: {
          address:
            "Baga Road",
          city: "Goa",
          state: "Goa",
          country: "India",
          latitude: 15.5557,
          longitude: 73.7517,
        },

        images: [
          "https://images.unsplash.com/photo-1601918774946-25832a4be0d6",
          "https://images.unsplash.com/photo-1590490360182-c33d57733427",
        ],

        amenities: [
          "WiFi",
          "Pool",
          "Parking",
          "Restaurant",
          "Gym",
          "Spa",
        ],

        rating: 4.8,
        totalReviews: 342,
        status: "approved",
      },

      {
        ownerId,

        name: "Green Valley Stay",

        description:
          "Affordable and comfortable accommodation surrounded by greenery, ideal for budget-conscious travelers.",

        location: {
          address:
            "Vagator Road",
          city: "Goa",
          state: "Goa",
          country: "India",
          latitude: 15.5977,
          longitude: 73.7448,
        },

        images: [
          "https://images.unsplash.com/photo-1568084687-f19971a1a7a1",
          "https://images.unsplash.com/photo-1584132967334-10e028bd69f7",
        ],

        amenities: [
          "WiFi",
          "Parking",
          "Restaurant",
          "Air Conditioning",
        ],

        rating: 3.9,
        totalReviews: 67,
        status: "approved",
      },
    ];

    const createdHotels =
      await Hotel.insertMany(
        hotels
      );

    console.log(
      `Created ${createdHotels.length} hotels`
    );

    const rooms = [];

    for (const hotel of createdHotels) {
      rooms.push(
        {
          hotelId: hotel._id,
          name: "Standard Room",
          type: "standard",
          description:
            "Comfortable standard room suitable for couples.",
          pricePerNight: 2500,
          capacity: 2,
          beds: 1,
          amenities: [
            "WiFi",
            "Air Conditioning",
            "TV",
          ],
          images: [
            "https://images.unsplash.com/photo-1611892440504-42a792e24d32",
          ],
          totalRooms: 10,
          status: "active",
        },

        {
          hotelId: hotel._id,
          name: "Deluxe Room",
          type: "deluxe",
          description:
            "Spacious deluxe room with additional comfort and amenities.",
          pricePerNight: 4000,
          capacity: 3,
          beds: 2,
          amenities: [
            "WiFi",
            "Air Conditioning",
            "TV",
            "Mini Bar",
          ],
          images: [
            "https://images.unsplash.com/photo-1590490359683-658d3d23f972",
          ],
          totalRooms: 6,
          status: "active",
        },

        {
          hotelId: hotel._id,
          name: "Premium Suite",
          type: "premium",
          description:
            "Premium suite with a large living area and upgraded facilities.",
          pricePerNight: 6500,
          capacity: 4,
          beds: 2,
          amenities: [
            "WiFi",
            "Air Conditioning",
            "TV",
            "Mini Bar",
            "Room Service",
          ],
          images: [
            "https://images.unsplash.com/photo-1584132967334-10e028bd69f7",
          ],
          totalRooms: 3,
          status: "active",
        }
      );
    }

    const createdRooms =
      await Room.insertMany(rooms);

    console.log(
      `Created ${createdRooms.length} rooms`
    );

    console.log(
      "Hotel seed completed successfully"
    );

    process.exit(0);
  } catch (error) {
    console.error(
      "Hotel seed failed:",
      error
    );

    process.exit(1);
  }
};

seedHotels();