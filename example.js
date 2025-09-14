import sportsService from './services/sportsService.js';

const runExample = async () => {
  console.log('--- Running Sports Service Example ---');

  // 1. Search for a team
  console.log('\n1. Searching for team "Arsenal"...');
  const teams = await sportsService.searchTeamByName('Arsenal');
  if (teams && teams.length > 0) {
    const team = teams[0];
    console.log(`Found team: ${team.strTeam} (ID: ${team.idTeam})`);

    // 2. Get next matches for the team
    console.log(`\n2. Getting next 5 matches for ${team.strTeam}...`);
    const nextMatches = await sportsService.getNextMatchesByTeamId(team.idTeam);
    if (nextMatches && nextMatches.length > 0) {
      console.log('Next 5 matches:');
      nextMatches.forEach(match => {
        console.log(`- ${match.strEvent} on ${match.dateEvent}`);
      });
    } else {
      console.log('No upcoming matches found for this team.');
    }
  } else {
    console.log('Team not found.');
  }

  // 3. Get matches for a specific day
  console.log('\n3. Getting matches for today (Soccer)...');
  const today = new Date();
  const matchesToday = await sportsService.getMatchesByDate(today, 'Soccer');
  if (matchesToday && matchesToday.length > 0) {
    console.log('Matches today:');
    matchesToday.slice(0, 5).forEach(match => { // show first 5
      console.log(`- ${match.strEvent}`);
      // 4. Get status of a match
      const status = sportsService.getMatchStatus(match);
      console.log(`  Status: ${status}`);
    });
  } else {
    console.log('No matches found for today.');
  }

  console.log('\n--- Example Finished ---');
};

runExample();
