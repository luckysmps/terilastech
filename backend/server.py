from flask import Flask, request, send_file, jsonify
import pandas as pd
from io import BytesIO
from datetime import datetime
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

@app.route('/export', methods=['POST'])
def export_json_to_excel():
    try:
        data = request.json
        if not data:
            raise ValueError("No data received in the request.")

        # Extract the project name
        project_name = data.get('projectName')
        print(f"Project Name: {project_name}")

        # Define the header columns for the Excel file
        all_headings = ['Project Name', 'User Email ID', 'Date of Completion']

        # Initialize a single list of values that will contain all the row data for the single row
        all_values = []

        # For each row in the data, we combine all the values in one row
        row_values = [project_name, 'test@test.com', datetime.now().strftime("%m/%d/%Y, %H:%M:%S")]

        # Iterate through the data and append each row's properties values to a single list of values
        for row in data.get('rows', []):
            for key in row.keys():
                # Check if the key is not already in the all_headings (we'll add it dynamically if it is a new field)
                if key not in all_headings:
                    all_headings.append(key)
                # Add the value for this key to the row
                row_values.append(row.get(key, ''))

        # Append the row_values to all_values, this ensures all data is in one row
        all_values.append(row_values)

        # Create the DataFrame with all values and headers
        df = pd.DataFrame(all_values, columns=all_headings)

        # Convert the DataFrame to an Excel file in memory
        output = BytesIO()
        df.to_excel(output, index=False, engine='openpyxl')

        output.seek(0)

        # Generate a filename for the exported Excel file
        filename = f"exported_data_{datetime.now().strftime('%Y%m%d_%H%M%S')}.xlsx"

        # Create the response and return the Excel file as an attachment
        response = send_file(
            output,
            as_attachment=True,
            download_name=filename,
            mimetype='application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
        )

        response.headers['Content-Disposition'] = f'attachment; filename={filename}'

        return response

    except Exception as e:
        print("Error occurred:", str(e)) 
        return jsonify({"error": str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True)
