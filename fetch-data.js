import fs from "fs";
import path from "node:path";

const url = "https://data.cityofnewyork.us/resource/2fir-qns4.json?$query=SELECT%0A%20%20%60as_of_date%60%2C%0A%20%20%60tax_id%60%2C%0A%20%20%60active_per_last_reported_status%60%2C%0A%20%20%60last_reported_active_date%60%2C%0A%20%20%60officer_first_name%60%2C%0A%20%20%60officer_last_name%60%2C%0A%20%20%60officer_race%60%2C%0A%20%20%60officer_gender%60%2C%0A%20%20%60current_rank_abbreviation%60%2C%0A%20%20%60current_rank%60%2C%0A%20%20%60current_command%60%2C%0A%20%20%60shield_no%60%2C%0A%20%20%60total_complaints%60%2C%0A%20%20%60total_substantiated_complaints%60%0AWHERE%0A%20%20caseless_eq(%60active_per_last_reported_status%60%2C%20%22Yes%22)%0A%20%20AND%20(%60total_substantiated_complaints%60%20%3E%3D%202)%0A%20%20AND%20caseless_one_of(%60current_rank%60%2C%20%22Detective%22)";
const response = await fetch(url);
const officers = await response.json();

console.log(`Fetched ${officers.length} officers.`);

const dataDir = path.join("src", "lib", "data");
fs.mkdirSync(dataDir, { recursive: true });

const outputPath = path.join(dataDir, "officers.json");
fs.writeFileSync(outputPath, JSON.stringify(officers, null, 2));
console.log(`Saved to ${outputPath}`);