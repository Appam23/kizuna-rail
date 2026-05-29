import { getAllRoutes, getListOfRegions, getListOfSeasons } from '../../models/model.js';

const myHelper = async (req, res) => {

    const selectRegion = (req.query.region || "").toString().trim().toLowerCase();
    const selectSeason = (req.query.season || "").toString().trim().toLowerCase();

    const regions = await getListOfRegions();
    const seasons = await getListOfSeasons();

    let routes = await getAllRoutes();

    // filtering and showing results

    if (selectRegion) {
        routes = routes.filter(route => (route.region || '').toLowerCase() === selectRegion);
    }
    if (selectSeason) {
        routes = routes.filter(route => (route.bestSeason || '').toLowerCase() === selectSeason);
    }

    // Show (“render”) the results on a web page!

    res.render('routes/list', {
        title: 'Scenic Train Routes',
        regions,
        seasons,
        routes,
        query: {
            region: selectRegion,
            season: selectSeason
        }
    });
};

export default myHelper;