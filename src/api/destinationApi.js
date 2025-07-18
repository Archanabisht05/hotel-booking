export async function fetchDestinations(query) {
  const payload = query
    ? {
        paginationFilterRequest: {
          paginationAction: "INITIAL_PAGE",
          maxLimit: 10,
          sortingOrder: "ASC",
        },
        search: query,
        fetchStaticDestination: false,
      }
    : {
        paginationFilterRequest: {
          paginationAction: "INITIAL_PAGE",
          maxLimit: 10,
          sortingOrder: "ASC",
        },
        search: null,
        fetchStaticDestination: true,
      };

  const res = await fetch(
    "https://staging.travelyatra.com/api/unsecure/dummy/hotels/places",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-tenant-id": "pml",
      },
      body: JSON.stringify(payload),
    }
  );

  if (!res.ok) throw new Error("Failed to fetch destinations");
  return res.json();
}
