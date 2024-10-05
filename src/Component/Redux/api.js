const apiLink = "https://crystalsolutions.com.pk/umair_electronic/web/";

export const fetchDataMenu = async (userId) => {
  try {
    const requestBody = new URLSearchParams({ userid: userId }).toString();

    // Send POST request using fetch
    const response = await fetch(
      `https://crystalsolutions.com.pk/csorder3/UserMenu.php`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: requestBody,
      }
    );

    if (!response.ok) {
      console.error(
        `API response failed: ${response.status} ${response.statusText}`
      );
      throw new Error(
        `Failed to fetch data: ${response.status} ${response.statusText}`
      );
    }

    // Parse the response as JSON
    const data = await response.json();

    console.log("Parsed data:", data);

    // Return the parsed data
    return data;
  } catch (error) {
    // Log and handle any errors
    console.error("Error fetching data:", error);
    throw error;
  }
};

export const fetchDataItem = async () => {
  try {
    const response = await fetch(
      `https://crystalsolutions.com.pk/umair_electronic/web/GetItem.php`
    );
    if (!response.ok) {
      throw new Error("Failed to fetch data");
    }
    const data = await response.json();
    console.log("Fetched item data:", data);
    return data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const fetchDataAccountCode = async () => {
  try {
    const response = await fetch(`${apiLink}ChartOfAccount.php`);
    if (!response.ok) {
      throw new Error("Failed to fetch data");
    }
    const data = await response.json();
    console.log("Fetched item data:", data);
    return data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const fetchDataChartofAccount = async () => {
  try {
    const response = await fetch(
      `https://crystalsolutions.com.pk/umair_electronic/web/GetAccounts.php`
    );
    if (!response.ok) {
      throw new Error("Failed to fetch data");
    }
    const data = await response.json();
    console.log("Fetched item data:", data);
    return data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
