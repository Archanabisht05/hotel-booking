import React, { useEffect } from "react";
import axios from "axios";
import { useSearch } from "../context/SearchContext";
import HotelCard from "./HotelCard";

export default function HotelList() {
  const { searchParams, hotels, setHotels, loading, setLoading, error, setError } = useSearch();

  useEffect(() => {
    if (!searchParams.checkIn || !searchParams.checkOut) return;

    const fetchHotels = async () => {
      setLoading(true);
      setError(null);
      try {
        const payload = {
          stay: {
            checkIn: searchParams.checkIn,
            checkOut: searchParams.checkOut,
          },
          occupancies: searchParams.occupancies,
        //   destinationId: String(searchParams.destination.code), 
          ...(searchParams.extrafilter && { extrafilter: searchParams.extrafilter }),
          ...(searchParams.reviews && { reviews: searchParams.reviews }),
          ...(searchParams.boards && { boards: searchParams.boards }),
        };

        console.log({searchParams})

        const res = await axios.post(
          `https://staging.travelyatra.com/api/unsecure/dummy/hotels?destinationId=${searchParams.destination.code}`,
          payload,
          { headers: { "x-tenant-id": "pml" } }
        );
        setHotels(res.data.data || []);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchHotels();
  }, [searchParams]);

  if (loading) return <p className="p-4">Loading…</p>;
  if (error) return <p className="p-4 text-red-600">{error}</p>;
  if (!hotels.length) return <p className="p-4">No hotels found.</p>;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {hotels.map((h) => (
        <HotelCard key={h.code} hotel={h} />
      ))}
    </div>
  );
}