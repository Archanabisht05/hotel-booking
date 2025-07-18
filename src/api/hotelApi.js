export async function fetchHotels(payload, destinationId) {
  const res = await fetch(
    `https://staging.travelyatra.com/api/unsecure/dummy/hotels?destinationId=${destinationId}`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-tenant-id": "pml",
      },
      body: JSON.stringify(payload),
    }
  );
  if (!res.ok) throw new Error("Failed to fetch hotels");
  return res.json();
}
