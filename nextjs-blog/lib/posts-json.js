
import got from 'got';


const dataURL = "https://dev-cs5513-database.pantheonsite.io/wp-json/twentytwentyone-child/v1/latest-posts/1";

export async function getAllPostIds() {
    // const filePath = path.join(dataDir, 'posts.json'); // Variable for the JSON file location
    // const jsonString = fs.readFileSync(filePath, 'utf8'); // Variable for reading the JSON file
    
    let jsonString;
    try {
        jsonString = await got(dataURL);
        console.log(jsonString.body)
    } catch(error) {
        jsonString.body = [];
        console.log(error);
    }
    
    const jsonObj = JSON.parse(jsonString.body);
    // Writes  out the objects in the JSON array to temrinal
    console.log(jsonObj);
    // Give us the output from the mapping of the array
    return jsonObj.map(item => {
        return {
            params: {
                id: item.ID.toString()
            }
        }
    });
}

export async function getSortedPostsData() {
    
    let jsonString;
    try {
        jsonString = await got(dataURL);
        console.log(jsonString.body)
    } catch(error) {
        jsonString.body = [];
        console.log(error);
    }

     const jsonObj = JSON.parse(jsonString.body);

    jsonObj.sort(function (a, b) {
        return a.post_title.localeCompare(b.post_title);
    });

    // Give us the output from the mapping of the array
    return jsonObj.map(item => {
        return {
            id: item.ID.toString(),
            title: item.post_title
            //date: item.date
        }
    });
}

export async function getPostData(id) {
    // const filePath = path.join(dataDir, 'posts.json'); // Variable for the JSON file location
    // const jsonString = fs.readFileSync(filePath, 'utf8'); // Variable for reading the JSON file
    
    let jsonString;
    try {
        jsonString = await got(dataURL);
        console.log(jsonString.body)
    } catch(error) {
        jsonString.body = [];
        console.log(error);
    }    
    
    const jsonObj = JSON.parse(jsonString.body); // Varaiable that parses our JSON array objects to strings
    
    // Give us the output from the mapping of the array
    const objReturned = jsonObj.filter(obj => {
    return obj.ID.toString() === id;
    
    });
    console.log(objReturned);

    // If statement gives a mesasge if the objects are not returned from JSON 
    if (objReturned.length === 0) {
        return {
            id: id,
            title: 'Not found',
            //date: '' || null,
            //contentHtml: 'Not found',
            //sourceURL: ''
        }
    } else {
        return objReturned[0];
    }
}