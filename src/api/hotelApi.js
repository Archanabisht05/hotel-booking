export async function fetchHotels(payload, destinationId) {
  const sanitizeSearchParams = (params) => {
    const sanitized = { ...params };
    if (sanitized.occupancies && sanitized.occupancies.length > 0) {
      sanitized.occupancies = sanitized.occupancies.map((occ) => ({
        ...occ,
        rooms: 1, // ensure only 1 room is sent
      }));
    }
    return sanitized;
  };

  const res = await fetch(
    `https://staging.travelyatra.com/api/unsecure/dummy/hotels?destinationId=${destinationId}`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-tenant-id": "pml",
      },
      body: JSON.stringify(sanitizeSearchParams(payload)),
    }
  );
  if (!res.ok) throw new Error("Failed to fetch hotels");
  return res.json();
}
