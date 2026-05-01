export interface TimelineStep {
  id: string;
  title: string;
  date: string;
  description: string;
  category: 'Preparation' | 'Selection' | 'General' | 'Post-Election';
  icon: string;
}

export const timelineData: Record<string, TimelineStep[]> = {
  US: [
    {
      id: 'candidate-filing-us',
      title: 'Candidate Filing',
      date: 'Jan - Mar',
      description: 'Individuals officially declare their intention to run for office and file necessary paperwork.',
      category: 'Preparation',
      icon: 'FileText',
    },
    {
      id: 'primaries-us',
      title: 'Primaries & Caucuses',
      date: 'Feb - June',
      description: 'Political parties choose their nominees for the general election through state-level voting.',
      category: 'Selection',
      icon: 'Users',
    },
    {
      id: 'conventions-us',
      title: 'National Conventions',
      date: 'July - Aug',
      description: 'Parties officially nominate their candidates and unify behind a platform.',
      category: 'Selection',
      icon: 'Flag',
    },
    {
      id: 'general-campaign-us',
      title: 'General Campaign',
      date: 'Sept - Oct',
      description: 'Nominees travel the country, debate, and present their vision to the entire electorate.',
      category: 'General',
      icon: 'Mic2',
    },
    {
      id: 'election-day-us',
      title: 'Election Day',
      date: 'Nov (First Tues)',
      description: 'Millions of citizens cast their ballots at polling stations or via mail.',
      category: 'General',
      icon: 'Vote',
    },
    {
      id: 'electoral-college-us',
      title: 'Electoral College',
      date: 'December',
      description: 'Electors meet in their respective states to cast their votes for President and VP.',
      category: 'Post-Election',
      icon: 'Landmark',
    },
    {
      id: 'inauguration-us',
      title: 'Inauguration',
      date: 'January 20',
      description: 'The newly elected President and Vice President are sworn into office.',
      category: 'Post-Election',
      icon: 'ShieldCheck',
    },
  ],
  IN: [
    {
      id: 'delimitation-in',
      title: 'Delimitation & Voter Lists',
      date: 'Ongoing',
      description: 'Revision of electoral rolls and fixing the boundaries of territorial constituencies.',
      category: 'Preparation',
      icon: 'Map',
    },
    {
      id: 'poll-notification-in',
      title: 'Poll Notification',
      date: 'Phase Start',
      description: 'The Election Commission of India (ECI) issues the official gazette notification.',
      category: 'Preparation',
      icon: 'ClipboardList',
    },
    {
      id: 'nominations-in',
      title: 'Nominations & Scrutiny',
      date: '7-10 Days',
      description: 'Candidates file nominations; papers are scrutinized and candidates can withdraw.',
      category: 'Selection',
      icon: 'Settings',
    },
    {
      id: 'campaign-in',
      title: 'The Campaign Period',
      date: '14 Days',
      description: 'Intense campaigning by all political parties across the diverse landscape of India.',
      category: 'General',
      icon: 'Mic2',
    },
    {
      id: 'phases-voting-in',
      title: 'Multi-Phase Voting',
      date: 'Apr - May',
      description: 'Voting held across multiple phases to ensure security and logistical feasibility.',
      category: 'General',
      icon: 'Vote',
    },
    {
      id: 'counting-day-in',
      title: 'Counting of Votes',
      date: 'Single Day',
      description: 'EVMs are opened and votes are counted simultaneously across the country.',
      category: 'Post-Election',
      icon: 'Activity',
    },
    {
      id: 'government-formation-in',
      title: 'Government Formation',
      date: 'Post-Results',
      description: 'The President invites the leader of the majority party or coalition to form government.',
      category: 'Post-Election',
      icon: 'Landmark',
    },
  ]
};
