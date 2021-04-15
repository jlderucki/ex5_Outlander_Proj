const fs = require("fs");
const util = require("util");

/**
 * We want to use async/await with fs.readFile - util.promisfy gives us that
 */
const readFile = util.promisify(fs.readFile);

/**
 * Logic for fetching items information
 */
class ItemService {
  /**
   * Constructor
   * @param {*} datafile Path to a JSOn file that contains the tems data
   */
  constructor(datafile) {
    this.datafile = datafile;
  }

  /**
   * Returns a list of tems name and short name
   */
  async getItems() {
    const data = await this.getData();
    const sortdata = data.sort((a, b) => (a.site > b.site) ? 1 : -1);
    return sortdata.map(item => {
      return { name: item.site, id: item.id, category: item.category };
    // We are using map() to transform the array we get into another one
    });
  }

  async getCategories() {
    const data = await this.getData();
    const uniqueCat = [...new Set(data.map(x => x.category))].sort((a, b) => (a > b) ? 1 : -1);
    return(uniqueCat);
  }

  /**
   * Get item information provided a shortname
   * @param {*} id
   */
  async getItem(id) {
    const data = await this.getData();
    const item = data.find(elm => {
      return elm.id === id;
    });
    if (!item) return null;
    return {
      title: item.site,
      name: item.site,
      id: item.id,
      description: item.info,
      category: item.category,
      lat: item.lat,
      long: item.long,
      video: item.videoEmbed,
      image: item.image,
      photographer: item.credit,
      credit: item.creditURL,
      location: item.location,
      zoom: item.zoom
    };
  }

  /**
   * Get a list of items
   * @param {*} category
   */
   async getItemsByCategory(category) {
    const data = await this.getData();
    function categoryMatch(data) {
      return data.category === category;
    }
    const catlist = data.filter(categoryMatch).sort((a, b) => (a.site > b.site) ? 1 : -1);
    return catlist.map(item => {
      return {
        title: item.site,
        name: item.site,
        id: item.id,
        description: item.info,
        category: item.category,
        lat: item.lat,
        long: item.long,
        video: item.videoEmbed,
        image: item.image,
        photographer: item.credit,
        credit: item.creditURL,
        location: item.location,
        zoom: item.zoom
      };
    });
  }

  async getList() {
    const data = await this.getData();
    const sortdata = data.sort((a, b) => (a.site > b.site) ? 1 : -1);
    return sortdata.map(item => {
      return {
        title: item.site,
        name: item.site,
        id: item.id,
        description: item.info,
        category: item.category,
        image: item.image,
        photographer: item.credit,
        credit: item.creditURL,
        video: item.videoEmbed,
        location: item.location,
        zoom: item.zoom
      };
    });
  }

  async getCategoriesList() {
    const data = await this.getData();
    const categories = [];
   for (var i=0; i < data.length; i++) {
     const foundCategory = categories.find(categoryObj => {
       return categoryObj.category === data[i].category;
     });
     if (!foundCategory) {
       categories.push (
         {
           category: data[i].category,
           categoryItems: [{
             name: data[i].site,
             id: data[i].id,
             title: data[i].site,
             description: data[i].info,
             lat: data[i].lat,
             long: data[i].long,
             video: data[i].videoEmbed,
             image: data[i].image,
             photographer: data[i].credit,
             credit: data[i].creditURL,
             location: data[i].location,
             zoom: data[i].zoom
           }
         ]
         }
       )
     } else {
       foundCategory.categoryItems.push (
         {
           name: data[i].site,
           id: data[i].id,
           title: data[i].site,
           description: data[i].info,
           lat: data[i].lat,
           long: data[i].long,
           video: data[i].videoEmbed,
           image: data[i].image,
           photographer: data[i].credit,
           credit: data[i].creditURL,
           location: data[i].location,
           zoom: data[i].zoom
         }
       )
     }
   }
   for (var i=0; i < categories.length; i++) {
     categories[i].categoryItems.sort((a,b) => (a.name > b.name) ? 1 : -1);
   }
     categories.sort((a,b) => (a.category > b.category) ? 1 : -1);
     return(categories);
   }

  /**
   * Fetches items data from the JSON file provided to the constructor
   */
  async getData() {
    const data = await readFile(this.datafile, "utf8");
    return JSON.parse(data).data.items;
  }
}

module.exports = ItemService;
