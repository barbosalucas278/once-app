// Sports Service to interact with TheSportsDB API
const API_KEY = '123';
const BASE_URL = `https://www.thesportsdb.com/api/v1/json/${API_KEY}`;

const sportsService = {
  searchTeamByName: async (teamName) => {
    try {
      const response = await fetch(`${BASE_URL}/searchteams.php?t=${teamName}`);
      const data = await response.json();
      return data.teams;
    } catch (error) {
      console.error('Error searching for team:', error);
      return null;
    }
  },

  getNextMatchesByTeamId: async (teamId) => {
    try {
      const response = await fetch(`${BASE_URL}/eventsnext.php?id=${teamId}`);
      const data = await response.json();
      return data.events;
    } catch (error) {
      console.error('Error getting next matches:', error);
      return null;
    }
  },

  getMatchesByDate: async (date, sport) => {
    try {
      const formattedDate = date.toISOString().slice(0, 10); // Format to YYYY-MM-DD
      const response = await fetch(`${BASE_URL}/eventsday.php?d=${formattedDate}&s=${sport}`);
      const data = await response.json();
      return data.events;
    } catch (error) {
      console.error('Error getting matches by date:', error);
      return null;
    }
  },

  getMatchStatus: (event) => {
    if (event.intHomeScore !== null && event.intAwayScore !== null) {
      return 'Finished';
    }

    const now = new Date();
    const eventTime = new Date(`${event.dateEvent}T${event.strTime}`);

    if (now > eventTime) {
      return 'In Progress';
    }

    return 'Not Started';
  },
};

export default sportsService;
