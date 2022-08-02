import express from "express";
import { countByCity, countByType, createHotel, deleteHotel, getHotel, getHotelRooms, getHotels, updateHotel } from "../controller/hotel.js";
import Room from "../models/Room.js";
import { verifyAdmin } from "../utils/verifyToken.js";


const router = express.Router();

//create
router.post('/', verifyAdmin, createHotel);

//update

router.put('/:id', verifyAdmin, updateHotel);

//delete

router.delete('/:id', verifyAdmin, deleteHotel);


//get

router.get('/find/:id', getHotel);


//get all

router.get('/', getHotels);

//count By city
router.get('/countByCity', countByCity);

//count By Type
router.get('/countByType', countByType);

//

router.get('/room/:id', getHotelRooms);

export default router;