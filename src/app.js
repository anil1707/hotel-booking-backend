import express from "express";
import cors from 'cors'
import { connectDatabase } from "./config/database.js";

import hotelRoutes from "./modules/hotels/hotel.routes.js";
import authRoutes from "./modules/auth/auth.routes.js";
import roomRoutes from "./modules/rooms/room.routes.js";
import bookingRoutes from "./modules/bookings/booking.routes.js";
import reviewRoutes from "./modules/reviews/review.routes.js";
import favoriteRoutes from "./modules/favorites/favorites.routes.js";

import errorMiddleware from "./middleware/error.middleware.js";

const app = express();

app.use(express.json());
app.use(cors({
  origin: "http://localhost:5173"
}))

connectDatabase();

app.get("/api/v1/health", (req, res) => {
  res.status(200).json({
    success: true,
    message: "Hotel Booking API is running"
  });
});

app.use(
  "/api/v1/auth",
  authRoutes
);

app.use(
  "/api/v1/hotels",
  hotelRoutes
);

app.use(
  "/api/v1",
  roomRoutes
);

app.use(
  "/api/v1/bookings",
  bookingRoutes
);

app.use(
  "/api/v1",
  reviewRoutes
);

app.use(
  "/api/v1",
  favoriteRoutes
);

app.use(errorMiddleware);

export default app;