import express, { json } from "express";
import axios from "axios";

const app = express();
const PORT = 5000;

app.use(json());
const { get, post } = axios;
function processQueries(data, queries) {
  const results = [];

  for (const query of queries) {
    const [queryType, l, r] = query;
    const range = data.slice(l - 1, r);

    if (queryType === 1) {
      const sum = range.reduce((acc, num) => acc + num, 0);
      results.push(sum);
    } else if (queryType === 2) {
      let alternatingSum = 0;
      for (let i = 0; i < range.length; i++) {
        alternatingSum += i % 2 === 0 ? range[i] : -range[i];
      }
      results.push(alternatingSum);
    }
  }

  return results;
}

app.get("/process-queries", async (req, res) => {
  try {
    const inputResponse = await get("https://share.shub.edu.vn/api/intern-test/input");
    const { data, queries, token } = inputResponse.data;
    // console.log("data", data);

    const results = processQueries(data, queries);

    await post(
      "https://share.shub.edu.vn/api/intern-test/output",
      { results },
      { headers: { Authorization: `Bearer ${token}` } }
    );

    res.json({ success: true, results });
  } catch (error) {
    console.error("Error processing queries:", error);
    res.status(500).json({ success: false, error: error.message });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
