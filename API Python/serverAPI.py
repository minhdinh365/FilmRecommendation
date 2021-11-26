from flask import Flask, make_response
import numpy as np
from Movie_Recommendation import recommand,allTitle
from flask import jsonify

app = Flask(__name__)
@app.route('/recommand/', methods=['GET', 'POST'])
def recommandation():
    all_title2 = allTitle()
    json_data = []
    for title in all_title2['original_title']:
        arr = recommand(title)
        print(title)
        index = np.where(all_title2['original_title'] == title)
        id = all_title2['id'][index[0]]
        list_id = []
        for element in arr:
            if type(element) == int:
                index2 = np.where(all_title2['id'] == int(element))
                list_id.append({
                    "id": int(element),
                    "poster_path": all_title2['poster_path'][index2[0]],
                    "title": all_title2['title'][index2[0]]
                })
        recommendation = {'id_film': int(id[0]), "recommendation": list_id}
        json_data.append(recommendation)
    return make_response(jsonify(json_data), 201)

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=4000)
