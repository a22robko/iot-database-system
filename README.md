🖼️ Image 1

➡️ This shows the main web interface of the IoT Project running on Google App Engine.
You can see a form where users can enter information (Name, Surname, Age, Height) and buttons like Add, Export CSV, Save (server), and Clean.
Below, there’s a table showing all the registered tickets from the BigQuery database.
👉 It proves that the web app works, connects to the database, and displays the data.
<img width="2646" height="1444" alt="image" src="https://github.com/user-attachments/assets/5d44ac5b-6c51-4536-99d0-cedf029a9c0a" />

🖼️ Image 2

➡️ This is the Google Cloud BigQuery interface.
It shows the dataset csv_example_1 and table biljetter.
Columns like FirstName, LastName, Age, and Height are visible with real data.
👉 This confirms that the app stores and retrieves ticket data from BigQuery.
<img width="751" height="1218" alt="image" src="https://github.com/user-attachments/assets/6c4889b9-3bb4-47b7-aa7f-532e9bc1210d" />

🖼️ Image 3

➡️ This is the Google Cloud Console project selector.
It shows the active project prj-iot-123, along with other older test projects.
👉 It proves that the app and database belong to this specific Google Cloud project.
<img width="762" height="990" alt="image" src="https://github.com/user-attachments/assets/e3ef0fe9-9d8e-4765-8695-8e22ba009e08" />

🖼️ Image 4

➡️ This shows the JSON output from the BigQuery API when visiting /bigquery.
It lists all ticket records in JSON format, the same data as stored in BigQuery.
👉 It confirms that the Node.js Express server communicates correctly with BigQuery and returns data as an API response.
<img width="749" height="366" alt="image" src="https://github.com/user-attachments/assets/4a8f4040-d508-4cc2-acd7-b48ddbfd3424" />

🖼️ Image 5

➡️ This shows the Visual Studio Code (VS Code) project structure.
Files like server.js, Biljett.js, index.html, app.yaml, and the public folder are visible.
👉 It demonstrates that the project includes both frontend (HTML, CSS, JS) and backend (Express + BigQuery connection) parts.
<img width="765" height="646" alt="image" src="https://github.com/user-attachments/assets/c2e31141-d40a-4e0d-a973-34f0022bdad9" />

🖼️ Image 6

➡️ This shows the Google Cloud authentication details in the terminal after running gcloud auth list.
It lists two accounts — the service account (prj-iot-123@appspot.gserviceaccount.com, used by App Engine to access BigQuery) and the personal login (robinkorkmaz1@hotmail.com).
👉 It confirms that the Google Cloud project is active and that the service account is correctly linked to App Engine for secure access.
<img width="704" height="335" alt="image" src="https://github.com/user-attachments/assets/00c54c09-6421-4d9a-bed8-20f8727966b8" />
