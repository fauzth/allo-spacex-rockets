const BASE = "https://lldev.thespacedevs.com/2.2.0/config/launcher";

export async function fetchAllRockets(r) {
  const res = await fetch(
    `${BASE}/?manufacturer__name=SpaceX&mode=detailed&limit=20`,
    { r },
  );

  if (!res.ok) {
    throw new Error(`Failed to fetch rockets: ${res.status}`);
  }

  const data = await res.json();
  return data.results;
}

export async function fetchRocketById(id, r) {
  const res = await fetch(`${BASE}/${id}`, { r });

  if (!res.ok) {
    throw new Error(`Failed to fetch rocket: ${res.status}`);
  }

  return res.json();
}
