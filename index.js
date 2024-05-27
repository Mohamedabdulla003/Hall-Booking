const express = require ('express');
const app = express();
const bodyParser=require('body-parser')
const { v4: uuidv4 } = require("uuid");

app.use(bodyParser.json());

const Bookingdetails =[];
const roomdetails =[];

app.post('/creatroom',(req,res) => {
 roomdetails.push({
   roomname:req.body.roomname,
    beds: req.body.beds,
    sqft: req.body.sqft,
    amenities: req.body.amenities,
    roomId: uuidv4(),
  });
  res.send(roomdetails);
});

app.post('/createBooking',(req,res) =>{
  const bookingId= uuidv4();
  Bookingdetails.push({
    userId: req.body.userId,
    customername: req.body.customername,
    roomId: req.body.roomId,
    date: req.body.date,
    starttime: req.body.starttime,
    endtime:req.body.endtime,
    bookingId,
  });
  res.send(bookingId);
});

app.get("/mybooking/:userId",(req,res) => {
  // console.log(Bookingdetails,"Bookingdetails");
  const userId=req.params.userId;
  const userbooking =Bookingdetails.filter((ele) =>ele.userId == userId);
  res.send(userbooking);
 });

 app.get("/roombooking/:roomId",(req,res) =>{
  const roomId = req.params.roomId;
  const  roombooking = Bookingdetails.filter((ele) =>ele.roomId == roomId)
  res.send(roombooking);
 })

 app.get('/customer/:name',(req, res) => {
  const { name } = req.params.name;
  const  customer = Bookingdetails.filter(cust => cust.name == name);
  if (!customer) {
    res.status(404).send({ error: 'Customer not found' });
    return;
  }
  const customerBookings = Bookingdetails.map(booking => {
    const { customername, roomId, date, starttime, endtime  } = booking;
    return { customername, roomId,  date, starttime, endtime };
  });
  res.send({
      count:customerBookings.length,
      customerBookings});
});

 

   

app.get('/',(req,res)=>{
  res.send("Server looking good");
});

app.listen(4000, () =>[
  console.log("Server Started  at 4000")
]);