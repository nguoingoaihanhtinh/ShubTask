import axios from "axios";
import XLSX from "xlsx";
import fs from "fs";

const url = "https://go.microsoft.com/fwlink/?LinkID=521962";

async function processFile() {
  try {
    const response = await axios.get(url, { responseType: "arraybuffer" });

    const workbook = XLSX.read(response.data, { type: "buffer" });

    const sheetName = workbook.SheetNames[0];
    const sheet = workbook.Sheets[sheetName];

    const data = XLSX.utils.sheet_to_json(sheet);
    // console.log("data", data);
    const filteredData = data.filter((row) => {
      const salesKey = Object.keys(row).find((key) => key.trim() === "Sales");
      if (salesKey) {
        const sales = parseFloat(String(row[salesKey]).replace(/[^0-9.-]+/g, ""));
        // console.log("sale", sales);
        return !isNaN(sales) && sales > 50000;
      }
      return false;
    });

    if (filteredData.length > 0) {
      const newSheet = XLSX.utils.json_to_sheet(filteredData);

      const newWorkbook = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(newWorkbook, newSheet, "Filtered Sales");

      XLSX.writeFile(newWorkbook, "filtered_sales.xlsx");

      console.log("File đã được lưu với các hàng có giá trị sales > 50.000");
    } else {
      console.log("Không có dữ liệu nào thỏa mãn điều kiện sales > 50.000");
    }
  } catch (error) {
    console.error("Lỗi khi xử lý file:", error);
  }
}

processFile();
