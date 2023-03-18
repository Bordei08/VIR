const CLIENT_ID = "09cd3689e8271df1e6fb49865431b0eb439acafe"
const CLIENT_SECRET = "/kebe/rbIr77u/v1ExH5FCRfOslvD/zNdjVe8m5YoTGqZ64nmX62clEZWX/QGoGnoT6HdrgA75BwjRpgHuSx4cyYNGj3xyk/RTxnVLmAt4MjS9f8axhZ2/oDcblZbUGN"
const ACCESS_TOKEN = "5be2d01f5910432bf96c594e8f7f2057"
let ACCES_VIDEO = "https://api.vimeo.com";

const oracledb = require('oracledb');
const fs = require('fs')
/*
var Vimeo = require('vimeo').Vimeo;
var client = new Vimeo(CLIENT_ID, CLIENT_SECRET, ACCESS_TOKEN);
let data;
let categoryList = [], category_id = 0, id = 0;
function requestVideo() {
  client.request({
      path: '/channels/staffpicks/videos',
      query: {
          page: 1,
          per_page: 50,
          fields: 'uri,name,description,duration,created_time,player_embed_url,pictures,categories,user,stats,embed, is_playable'
      }
  }, function (error, body, status_code, headers) {
      if (error) {

      } else {
          data = body.data;
          fs.writeFile('./video.json', data, (err) => {
              if (err) throw err;
          })
      }

  });
}
requestVideo();*/

let categoryList = [];
const jsonVideo = require("./video.json")
async function populateDB() {
    let connection;

    try {
        var i = 2;
        connection = await oracledb.getConnection({ user: "STUDENT", password: "STUDENT", connectionString: "//localhost:1521/xe" });
        jsonVideo.data.forEach(element => {
            const { uri, name, description, created_time, embed: { html }, stats, categories, is_playable, user, duration, pictures} = element;
            const categoryName = categories[0]?.name ?? "Narative"
            const userName = user.name;
            const picture = pictures.base_link;
            //console.log(picture)
            var newHtml = 'hgvty'
            const des = typeof description === "string" ? description.split(/\r?\n/)[0] : "nice video"
            var statsVideo = Math.floor(Math.random() * 10000) + 1000;
            var countRating = Math.floor(Math.random() * 10);
            var rating = Math.floor(Math.random() * 5) + 1;
            i++;
            
            
            ///INSERT CATEGORY
            /*
            if(!categoryList.includes(categoryName)){
              categoryList.push(categoryName)
              var sql = "INSERT INTO category (id, category) VALUES ('" + i + "', '" + categoryName + "')";
                      connection.execute(sql);
                      connection.commit();
            }*/

            //Insert videos
            
            var insertVideo1 = `INSERT INTO video VALUES(${i}, '${uri}', :1, :2, :3,:4 , :5, :6, :7, :8, :9 , :10, :11, :12)`;
            connection.execute(insertVideo1, [name, des, categoryName, duration, created_time, userName, statsVideo, html, 1, countRating, rating, picture]);
            
            connection.commit();
        })

    }
    catch (err) {
        console.error(err);
    } finally {
        if (connection) {
            try {
                await connection.close();
            } catch (err) {
                console.error(err);
            }
        }
    }
}

populateDB();