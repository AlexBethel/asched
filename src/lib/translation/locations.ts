// Locations of classes.

import { Translator } from './translation';

export const locations = new Translator([
    // Unusual room names.
    [/FITCH TC LAB/, 'Fitch TC Lab'],
    [/GYM EAST GYM/, 'East Gym'],
    [/RH 232/, 'Macey Annex'],

    // Duplicate locations.
    [/TBA TBA/, 'TBA'],
    [/WEB-V WEB-V/, 'WEB-V'],

    // Building names.
    [/BUREAU/, 'Bureau of Geology'],
    [/CRAMER/, 'Cramer'],
    [/ETSCOR/, 'Etscorn Observatory'],
    [/FIELD/, 'Field'],
    [/FITCH/, 'Fitch'],
    [/GOLF/, 'Golf Course'],
    [/GYM/, 'Gym'],
    [/JONESA/, 'Jones Annex'],
    [/JONES/, 'Jones'],
    [/LIBR/, 'Skeen Library'],
    [/LOPEZ/, 'Lopez'],
    [/MSEC/, 'MSEC'],
    // TODO: does RH ever refer to anywhere in Macey other than the Annex?
    [/RH/, 'Macey Annex'],
    [/SAC/, 'Student Activity Center'],
    [/SPEARE/, 'Speare'],
    [/TBA/, 'TBA'],
    [/WEB(-V)?/, 'Online'],
    [/WEIR/, 'Weir'],
    [/WORKC/, 'Workman'],

    // I (Alex) have no clue what these are; help is welcome lol.
    [/FACE/, 'FACE'],
    [/FACW/, 'FACW'],
    [/SOC HS SHOP/, 'SOC HS SHOP']
]);

export default locations;
