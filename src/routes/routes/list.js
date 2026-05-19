import { getAllRoutes, getListOfRegions, getListOfSeasons } from '../../models/model.js';

export default async (req, res) => {
    const selectedRegion = (req.query.region || '').toString().trim().toLowerCase();
    const selectedSeason = (req.query.season || '').toString().trim().toLowerCase();

    const regions = await getListOfRegions();
    const seasons = await getListOfSeasons();

    let routes = await getAllRoutes();

    if (selectedRegion) {
        routes = routes.filter((route) => route.region.toLowerCase() === selectedRegion);
    }

    if (selectedSeason) {
        routes = routes.filter((route) => route.bestSeason.toLowerCase() === selectedSeason);
    }

    res.render('routes/list', {
        title: 'Scenic Train Routes',
        regions,
        routes,
        seasons,
        query: {
            region: selectedRegion,
            season: selectedSeason
        }
    });
};