const apiLink = "https://crystalsolutions.com.pk/api/";

export const fetchDataMenu = async (userId, code) => {
  const response = await fetch(`${apiLink}GetUserMenu.php`, {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({ FUsrId: userId, code: code }).toString(),
  });

  const data = await response.json();

  const filteredData = data.filter((item) => item.Permission !== "S");
  if (!response.ok) throw new Error(data.message);

  return filteredData;
};
export const fetchDataGetUser = async (code) => {
  const response = await fetch(`${apiLink}GetUser.php`, {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({ code: code }).toString(),
  });

  const data = await response.json();
  // console.log("The data i received is api data:", data);

  if (!response.ok) throw new Error(data.message);

  return data;
};

export const fetchDataGetCrystalCustomer = async () => {
  const response = await fetch(`${apiLink}GetCrystalCustomer.php`);

  const data = await response.json();
  // console.log(data, "api.js");
  if (!response.ok) throw new Error(data.message);

  return data;
};

export const fetchDataGetCrystalMenu = async () => {
  const response = await fetch(`${apiLink}GetCrystalMenu.php`);

  const data = await response.json();
  // console.log(data, "fetchDataGetCrystalMenu api.js");
  if (!response.ok) throw new Error(data.message);

  return data;
};
