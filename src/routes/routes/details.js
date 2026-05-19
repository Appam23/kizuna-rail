import { getRouteById, getSchedulesByRoute } from '../../models/model.js';

import {monthToAbbr} from '../../includes/helpers.js'

export default async (req, res) => {
    const { routeId } = req.params;
    const details = await getRouteById(routeId);
    details.schedules = await getSchedulesByRoute(routeId);

    // Convert numeric operating months to abbreviated names for the view
    if (details && Array.isArray(details.operatingMonths)) {
        details.operatingMonths = details.operatingMonths.map(m => monthToAbbr(m));
    }

    // TODO: getCompleteRouteDetails instead

    res.render('routes/details', { 
        title: 'Route Details',
        details
    });
};