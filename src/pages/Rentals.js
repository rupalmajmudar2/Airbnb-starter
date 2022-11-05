import React from "react";
import "./Rentals.css";
import { Link } from "react-router-dom";
import { useLocation } from "react-router";
import logo from "../images/airbnbRed.png";
import { ConnectButton, Icon, Button, useNotification } from "web3uikit";
import RentalsMap from "../components/RentalsMap";
import { useState, useEffect } from "react";
import { useMoralis, useWeb3ExecuteFunction } from "react-moralis";
import User from "../components/User";

const Rentals = () => {
  const { state: searchFilters } = useLocation();
  const [highLight, setHighLight] = useState();
  const {Moralis, account} = useMoralis();
  const [rentalsList, setRentalsList] = useState();
  const [co0rdinates, setCo0rdinates] = useState([]);
  const contractProcessor = useWeb3ExecuteFunction();
  const dispatch = useNotification();

  const handleSuccess= () => {
    dispatch({
      type: "success",
      message: `Enjoy at ${searchFilters.destination}!`,
      title: "Booking successful",
      position: "topL"
    })
  };

  const handleError= (msg) => {
    dispatch({
      type: "error",
      message: `${msg}`,
      title: "Booking failed",
      position: "topL"
    })
  };

  const handleNoAccount= () => {
    dispatch({
      type: "error",
      message: `You need to connect your wallet to book a rental`,
      title: "Not Connected",
      position: "topL"
    })
  };

  /*const rentalsList = [
    {
      attributes: {
        city: "Bangalore",
        unoDescription: "6 Guests • 6 Beds • 4 Rooms",
        dosDescription: "Wifi • Kitchen • Living Area • 3 Bedrooms",
        imgUrl:
          "https://ipfs.moralis.io:2053/ipfs/QmS3gdXVcjM72JSGH82ZEvu4D7nS6sYhbi5YyCw8u8z4pE/media/3",
        lat: "12.918579101082631",
        long: "77.6648929870944",
        name: "Apartment in Mantri Flora, Bengaluru",
        pricePerDay: "3",
      },
    },
  ];*/

  useEffect(() => {
    async function fetchRentalsList() {
      const Rentals = Moralis.Object.extend("RM_Rentals");
      const query = new Moralis.Query(Rentals);
      query.equalTo("city", searchFilters.destination);
      query.greaterThanOrEqualTo("maxGuests_decimal", searchFilters.guests);

      const result = await query.find();

      let coords = [];
      result.forEach((e) => {
          //coords.push({lat: e.attributes.lat, lng: e.attributes.lng})
          coords.push({lat: "12.918579101082631", lng: "77.6648929870944"})
      });
      setCo0rdinates(coords);

      setRentalsList(result);
    }
    fetchRentalsList();
  }, [searchFilters])

  const bookRental = async function (start, end, id, dayPrice) {
      for (
        var arr = [], dt = new Date(start); 
        dt <= end;
        dt.setDate(dt.getDate() + 1)
      ) {
        arr.push(new Date(dt).toISOString().slice(0,10)); //yyyy-mm-dd
      }

      let options = {
        contractAddress: "0xF5983EFF722084dB7C00cA07EA7Dc66F49e44a87",
        functionName: "addDatesBooked",
        abi: [
          {
            "inputs": [
              {
                "internalType": "uint256",
                "name": "id",
                "type": "uint256"
              },
              {
                "internalType": "string[]",
                "name": "newBookings",
                "type": "string[]"
              }
            ],
            "name": "addDatesBooked",
            "outputs": [],
            "stateMutability": "payable",
            "type": "function"
          }
        ],
        params: {
          id: id,
          newBookings: arr
        },
        msgValue: Moralis.Units.ETH(dayPrice * arr.length)
      }

      await contractProcessor.fetch({
        params: options,
        onSuccess: () => {
          handleSuccess();
        },
        onError: (error) => {
          handleError(error.data.message)
        }
      }
      );
    }
  
    const addProperty = async function(propName, city, lat, lon, desc1, desc2, imgUrl, maxGuests, price) {
      let options = {
        contractAddress: "0xF5983EFF722084dB7C00cA07EA7Dc66F49e44a87",
        functionName: "addRentals",
        abi: [
              {
                "inputs": [
                  {
                    "internalType": "string",
                    "name": "name",
                    "type": "string"
                  },
                  {
                    "internalType": "string",
                    "name": "city",
                    "type": "string"
                  },
                  {
                    "internalType": "string",
                    "name": "lat",
                    "type": "string"
                  },
                  {
                    "internalType": "string",
                    "name": "long",
                    "type": "string"
                  },
                  {
                    "internalType": "string",
                    "name": "unoDescription",
                    "type": "string"
                  },
                  {
                    "internalType": "string",
                    "name": "dosDescription",
                    "type": "string"
                  },
                  {
                    "internalType": "string",
                    "name": "imgUrl",
                    "type": "string"
                  },
                  {
                    "internalType": "uint256",
                    "name": "maxGuests",
                    "type": "uint256"
                  },
                  {
                    "internalType": "uint256",
                    "name": "pricePerDay",
                    "type": "uint256"
                  },
                  {
                    "internalType": "string[]",
                    "name": "datesBooked",
                    "type": "string[]"
                  }
                ],
                "name": "addRentals",
                "outputs": [],
                "stateMutability": "nonpayable",
                "type": "function"
              }
            ],
            params: {
              name: propName,
              city: city,
              lat: lat,
              long: lon,
              unoDescription: desc1,
              dosDescription: desc2,
              imgUrl: imgUrl,
              maxGuests: maxGuests,
              pricePerDay: price,
              datesBooked: []
            },
          }
    
          console.log("Params are: " + JSON.stringify(options));
          await contractProcessor.fetch({
            params: options,
            onSuccess: () => {
              handleSuccess();
            },
            onError: (error) => {
              handleError(error)
            }
          }
          );
    }

  return (
    <>
        <div className="topBanner">
        <div>
          <Link to="/">
            <img className="logo" src={logo} alt="logo"></img>
          </Link>
        </div>
        <div className="searchReminder">
          <div className="filter">{searchFilters.destination}</div>
          <div className="vl" />
          <div className="filter">
            {`
              ${searchFilters.checkIn.toLocaleString("default", {
                month: "short",
              })} 
              ${searchFilters.checkIn.toLocaleString("default", {
                day: "2-digit",
              })} 
              - 
              ${searchFilters.checkOut.toLocaleString("default", {
                month: "short",
              })} 
              ${searchFilters.checkOut.toLocaleString("default", {
                day: "2-digit",
              })}
          `}
          </div>
          <div className="vl" />
          <div className="filter">{searchFilters.guests} Guest(s)</div>
          <div className="searchFiltersIcon">
            <Icon fill="#ffffff" size={20} svg="search" />
          </div>
        </div>
        <div className="lrContainers">
          {account &&
            <User account={account}></User>      
          }
          <ConnectButton />
        </div>
      </div>
      <hr className="line" />
      <div className="rentalsContent">
        <div className="rentalsContentL">
          Stays Available For Your Destination
          {rentalsList &&
            rentalsList.map((e, i) => {
              return (
                <>
                  <hr className="line2" />
                  <div className={highLight === i ? "rentalDivH " : "rentalDiv"}>
                    <img className="rentalImg" src={e.attributes.imgUrl}></img>
                    <div className="rentalInfo">
                      <div className="rentalTitle">{e.attributes.name}</div>
                      <div className="rentalDesc">
                        {e.attributes.unoDescription}
                      </div>
                      <div className="rentalDesc">
                        {e.attributes.dosDescription}
                      </div>
                      <div className="bookRentalButton">
                        <Button 
                        onClick={() => {
                          if (account) {
                            bookRental(
                              searchFilters.checkIn,
                              searchFilters.checkOut,
                              e.attributes.uid_decimal.value.$numberDecimal, //moralis db
                              Number(e.attributes.pricePerDay_decimal.value.$numberDecimal)
                            )
                          } 
                          else {
                            handleNoAccount();
                          } 
                          }
                        }
                        
                        text="Stay Here" />
                        <div className="price">
                          <Icon fill="#808080" size={10} svg="matic" />{" "}
                          {e.attributes.pricePerDay} / Day
                        </div>
                      </div>

                      <div className="addPropertyButton">
                        <Button 
                        onClick={() => {
                            if (account) {
                              addProperty(
                                "Adarsh Retreat", 
                                "Bangalore", 
                                "12.918579101082631", 
                                "77.6648929870944", 
                                "Spacious, Clean Apartment", 
                                "Close to IT Corridor", 
                                "https://ipfs.moralis.io:2053/ipfs/QmS3gdXVcjM72JSGH82ZEvu4D7nS6sYhbi5YyCw8u8z4pE/media/0", 
                                4, 
                                2
                              )
                            } 
                            else {
                              handleNoAccount();
                            } 
                          }
                        }
                        
                        text="Add Property" />
                        <div className="text">
                          [Owners Only]
                        </div>
                      </div>
                    </div>
                  </div>
                </>
              );
            })}
        </div>
        <div className="rentalsContentR">
          <RentalsMap locations={co0rdinates} setHighLight={setHighLight} />
        </div>
      </div>
    </>
  );
};

export default Rentals;
